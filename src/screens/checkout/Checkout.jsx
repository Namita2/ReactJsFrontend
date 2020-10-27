import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import VerticalStepper from './VerticalStepper';
import CartItem from '../details/CartItem';
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider, Typography } from "@material-ui/core";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Header from '../../common/header/Header';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    card: {
        minWidth: 275,
        margin: 40,

    },
    pos: {
        marginBottom: 12,
    },
    margin: {
        margin: theme.spacing(2),
        width: '80% !important',
        paddingLeft: theme.spacing(4)
    },
})
class Checkout extends Component {
    constructor () {
        super();
        this.state = {
            steps: ["Delivery", "Payment"],
            activeStep: '',
            addresses: [],
            paymentMethods: [],
            selectedPayment: '',
            selectedAddress: '',
            states: '',
            address: [
                {
                    flat: '',
                    locality: '',
                    city: '',
                    state: '',
                    pincode: ''
                }

            ],
            order: '',
            snackBar: false,
            message: '',
            messageInfo: false,
            open: false,
            cartItemList: JSON.parse(sessionStorage.getItem("cart")),
            Item: {
                item_id: '',
                quantity: '',
                price: ''
            },
            ItemList: []
        }
        this.handleAddressSelect.bind(this);
    }

    componentWillMount() {
        let that = this;
        let addressesData = null;
        let xhrAddress = new XMLHttpRequest();
        xhrAddress.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    addresses: JSON.parse(this.responseText).addresses
                });
            }
        });

        xhrAddress.open("GET", this.props.baseUrl + "address/customer");
        xhrAddress.setRequestHeader("Cache-Control", "no-cache");
        xhrAddress.setRequestHeader('Content-Type', 'application/json');
        xhrAddress.setRequestHeader('authorization', "Bearer " + this.props.accessToken);
        xhrAddress.send(addressesData);

        let paymentData = null;
        let xhrPayment = new XMLHttpRequest();
        xhrPayment.addEventListener("readystatechange", function () {

            if (this.readyState === 4) {
                that.setState({
                    paymentMethods: JSON.parse(this.responseText).paymentMethods
                });
            }
        });

        xhrPayment.open("GET", this.props.baseUrl + "payment");
        xhrPayment.setRequestHeader("Cache-Control", "no-cache");
        xhrPayment.setRequestHeader('Content-Type', 'application/json');
        xhrPayment.setRequestHeader('authorization', "Bearer " + this.props.accessToken);
        xhrPayment.send(paymentData);

        let states = null;
        let xhrStates = new XMLHttpRequest();
        xhrStates.addEventListener("readystatechange", function () {

            if (this.readyState === 4) {
                that.setState({
                    states: JSON.parse(this.responseText)
                });
            }
        });

        xhrStates.open("GET", this.props.baseUrl + "states");
        xhrStates.setRequestHeader("Cache-Control", "no-cache");
        xhrStates.setRequestHeader('Content-Type', 'application/json');
        xhrStates.setRequestHeader('authorization', "Bearer " + this.props.accessToken);
        xhrStates.send(states);

    }
    handleChange = (event) => {

        this.setState({
            selectedPayment: event.target.value
        })
    }
    handleAddressSelect = (index) => {

        this.setState({
            selectedAddress: index
        });
    }

    formItem = () => {

        let ItemList = this.state.ItemList
        this.state.cartItemList.cartItemList.forEach(element => {

            let Item = {
                item_id: element.item.id,
                quantity: element.quantity,
                price: element.item.price
            }
            ItemList.push(Item)

        });

        this.setState({
            ItemList: ItemList
        })
    }
    onSubmitOrderHandler = () => {
        this.formItem();
        if ((this.state.selectedAddress === "") || (this.state.selectedPayment === "") || (this.state.cartItemList.cartTotalPrice === "") || (this.state.cartItemList.restaurantId === "") || (this.state.ItemList.length === 0)) { return; }
        let data = JSON.stringify({
            "address_id": this.state.selectedAddress,
            "payment_id": this.state.selectedPayment,
            "bill": this.state.cartItemList.cartTotalPrice,
            "discount": 0,
            "restaurant_id": this.state.cartItemList.restaurantId,
            "item_quantities": this.state.ItemList

        });
        let that = this;
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ order: JSON.parse(this.responseText) });
                that.showSnanckBar();
            }
        });

        xhr.open("POST", this.props.baseUrl + "order");
        xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
        this.setState({ open: true });

    }
    showSnanckBar = () => {
        if (this.state.order.id) {
            this.setState({
                message: "Order placed successfully! Your order ID is " + this.state.order.id + ".",
                snackBar: true,
                messageInfo: true,
                open: true
            })
        } else {
            this.setState({
                message: "Unable to place your order!Please try again!",
                snackBar: true,
                messageInfo: true,
                open: true
            })
        }
    }
    handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            open: false,
            snackBar: false
        })
    };
    loginredirect = () => {
        sessionStorage.clear();
        this.props.history.push({
            pathname: "/"
        });
        window.location.reload();
    }
    render() {
        const { classes } = this.props;


        return (
            <React.Fragment>
                <Header logoutHandler={this.loginredirect} />
                <MuiThemeProvider theme={theme}>
                    <Grid container>
                        <Grid item xs={12} sm={8}>
                            <VerticalStepper
                                baseUrl={this.props.baseUrl}
                                accessToken={this.props.accessToken}
                                paymentMethods={this.state.paymentMethods}
                                handleChange={() => this.handleChange}
                                handleAddressSelect={this.handleAddressSelect}
                                selectedAddress={this.state.selectedAddress}
                                states={this.state.states}
                                onNewAddress={this.handleNewAddress} />
                        </Grid>
                        <Grid item xs={10} sm={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <div>
                                        <div>
                                            <Typography variant="h5" gutterBottom> Summary </Typography>
                                            <Typography gutterBottom> {this.state.cartItemList.restaurantName} </Typography>
                                        </div>
                                    </div>
                                    <Typography variant="body2" component="span">
                                        {this.state.cartItemList && this.state.cartItemList.cartItemList && this.state.cartItemList.cartItemList.map((cartItemList, index) => (
                                            <Box display="flex" flexDirection="row" key={index}>
                                                <Box p={2}>
                                                    <CartItem cartItem={cartItemList} checkout={true} />
                                                </Box>

                                            </Box>
                                        ))}
                                    </Typography>
                                    <Divider light />
                                    <div>
                                        <br />
                                        <div style={{ float: "left" }}><Typography gutterBottom > NET AMOUNT </Typography></div>
                                        <div style={{ float: "right", width: "20%" }}><i className="fa fa-rupee-sign" aria-hidden="true"> {this.state.cartItemList.cartTotalPrice.toFixed(2)} </i></div>

                                    </div>

                                </CardContent>
                                <CardActions className={classes.margin}>
                                    <Button variant="contained" className={classes.margin} color="primary"  size="large" onClick={this.onSubmitOrderHandler}>Place Order </Button>

                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>

                </MuiThemeProvider>
                {this.state.snackBar &&
                    <SnackbarContent
                        open={this.state.open}
                        onClose={this.handleClose}
                        message={<span id="message-id">{this.state.messageInfo ? this.state.message : undefined}</span>}
                        action={[
                            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                                X
                      </Button>
                        ]}
                    />}
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(Checkout);
