import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import GridListTile from '@material-ui/core/GridListTile';
import { green, grey, pink } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import clsx from 'clsx';
import './Checkout.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>  {children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {

  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    paddingBottom: 10,
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },

  checkCircle: {
    marginLeft: theme.spacing(12),
    marginTop: theme.spacing(2),
    color: '#000000',
  },
  addressGridTitle: {
    height: '100% !important',
    paddingBottom: 5,   
    wordWrap: "break-word",
    fontSize:'smaller',  
   maxWidth:'300px',
   minWidth:'200px',
 
  },
  addressButton: {
    padding: 0,
    width: "100% !important",
  },
  addressCard: {
    textAlign: "left",
    width: "100%",    
    borderRadius: 5,
    boxShadow: "none",
    border: `1px solid white`,
    borderRight: `3px solid white`,
    borderBottom: `3px solid white`,
    "&:hover": {
      backgroundColor: "transparent"
    },

  },
  addressCardSelected: {
    textAlign: "left",
    width: "100%",
    border: `1px solid ${pink[500]}`,
    borderRight: `3px solid ${pink[500]}`,
    borderBottom: `3px solid ${pink[500]}`,
  },
  addressStateIcon: {
    float: "right",
  },
  addressStateIconSelected: {
    backgroundColor: "green",
  },
  formControl: {
    minWidth: 190,
  }
})

class SimpleTabs extends Component {
  constructor () {
    super();
    this.state = {
      value: 0,
      color: '',
      selectedIndex: -1,
      addresses: [],
      flat: '',
      locality: '',
      city: '',
      state: '',
      pincode: '',
      stateName: '',
      reqFlat: "dispNone",
      reqLocality: "dispNone",
      reqCity: "dispNone",
      reqState: "dispNone",
      reqPincode: "dispNone",
      addressId: '',
      verifyPinCode: "dispNone",
    }
    this.selectAddress.bind(this);
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
    xhrAddress.setRequestHeader('authorization', "Bearer "+this.props.accessToken);
    xhrAddress.send(addressesData);
  }
  selectAddress = (index) => {

    this.setState({
      selectedIndex: index
    });

  }
  tabChangehandler = (event, newValue) => {

    this.setState({
      value: newValue
    })

  };
  stateChangeHandler = event => {
    this.setState({
      state: event.target.value
    })
  }
  flatChangeHandler = event => {
    this.setState({
      flat: event.target.value
    })
  }
  localityChangeHandler = event => {
    this.setState({
      locality: event.target.value
    })
  }
  cityChangeHandler = event => {
    this.setState({
      city: event.target.value
    })
  }
  pincodeChangeHandler = event => {
    this.setState({ verifyPinCode: "dispNone" })
    this.setState({
      pincode: event.target.value
    })
  }

  callApi = () => {
    let data = JSON.stringify({
      "flat_building_name": this.state.flat,
      "locality": this.state.locality,
      "city": this.state.city,
      "pincode": this.state.pincode,
      "state_uuid": this.state.state
    });
    let that = this;
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({ addressId: JSON.parse(this.responseText).id });
        that.setAddress();
      }
    });

    xhr.open("POST", this.props.baseUrl + "address");
    xhr.setRequestHeader("Authorization", "Bearer "+ this.props.accessToken);
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    this.setState({ open: true });

  }
  setAddress = () => {
       
    let stateName;
    this.props.states.states.forEach((state) => {
      if (state.id === this.state.state) {
        stateName = state.state_name;
      }
    })
    let state = JSON.stringify({
      "id": this.state.state,
      "state_name": stateName
    })
    let newAddress = {
      "id": this.state.addressId,
      "flat_building_name": this.state.flat,
      "locality": this.state.locality,
      "city": this.state.city,
      "pincode": this.state.pincode,
      "state": state
    }
    let addresses = this.state.addresses
    addresses =addresses || [];
    addresses.push(newAddress);
    this.setState({
      addresses: addresses
    })
  }
  onSubmitHandler = () => {
    this.state.flat === "" ? this.setState({ reqFlat: "dispBlock" }) : this.setState({ reqFlat: "dispNone" });
    this.state.locality === "" ? this.setState({ reqLocality: "dispBlock" }) : this.setState({ reqLocality: "dispNone" });
    this.state.city === "" ? this.setState({ reqCity: "dispBlock" }) : this.setState({ reqCity: "dispNone" });
    this.state.state === "" ? this.setState({ reqState: "dispBlock" }) : this.setState({ reqState: "dispNone" });
    this.state.pincode === "" ? this.setState({ reqPincode: "dispBlock" }) : this.setState({ reqPincode: "dispNone" });

    if ((this.state.flat === "") || (this.state.locality === "") || (this.state.city === "") || (this.state.state === "") || (this.state.pincode === "")) { return; }

    if (!Number(this.state.pincode)) {
      this.setState({ verifyPinCode: "dispBlock" })
      return;
    }
    if (this.state.pincode.length > 6 || this.state.pincode.length < 6) {
      this.setState({ verifyPinCode: "dispBlock" })
      return;
    }
    this.callApi();

  }

  render() {
    const { selectedIndex } = this.state;
    const { classes } = this.props;
   
    return (
      <React.Fragment>
        <AppBar position="relative">
          <Tabs value={this.state.value} onChange={this.tabChangehandler} aria-label="simple tabs example">
            <Tab label="Existing Address" {...a11yProps(0)} />
            <Tab label="New Address" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>

          <div className={classes.root}>
          {this.state.addresses===null && 
              <div>
                <Typography>
                There are no saved addresses! You can save an address using the 'New Address' tab or using your ‘Profile’ menu option.
                </Typography>
              </div>}
              {this.state.addresses!==null &&
            <GridList spacing={1} className={classes.gridList} cols={3}>              
              {this.state.addresses && this.state.addresses.map((address) => (
                <GridListTile key={address.id} className={classes.addressGridTitle}>
                  <Button className={classes.addressButton}>
                    <Card onClick={() => { this.props.handleAddressSelect(address.id); this.selectAddress(address.id) }} className={
                      clsx(classes.addressCard, {
                        [classes.addressCardSelected]: (selectedIndex === address.id),
                      })
                    }
                    >
                      <CardContent >
                        <Typography  component="p" gutterBottom>{address.flat_building_name}</Typography>
                        <Typography component="p">{address.locality}</Typography>
                        <Typography  component="p">{address.city}</Typography>
                        <Typography  component="p">{address.state.state_name}</Typography>
                        <Typography  component="p">{address.pincode}</Typography>
                        <Typography className={classes.addressStateIcon} aria-label="add to favorites">
                          <CheckCircleIcon style={{ color: (selectedIndex === address.id) ? green[500] : grey[900] }} />
                        </Typography>
                      </CardContent>
                    </Card>
                  </Button>
                </GridListTile>
              ))}
            </GridList>}
          </div>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <div>
            <div>
              <FormControl>
                <InputLabel htmlFor="flat">Flat / Building No. *</InputLabel>
                <Input id="flat" aria-describedby="my-helper-text" flat={this.state.flat} onChange={this.flatChangeHandler} />
                <FormHelperText className={this.state.reqFlat}>
                  <span className="red">Required</span>
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <InputLabel htmlFor="locality">Locality *</InputLabel>
                <Input id="locality" aria-describedby="my-helper-text" locality={this.state.locality} onChange={this.localityChangeHandler} />
                <FormHelperText className={this.state.reqLocality}>
                  <span className="red">Required</span>
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <InputLabel htmlFor="city">City *</InputLabel>
                <Input id="city" aria-describedby="my-helper-text" city={this.state.city} onChange={this.cityChangeHandler} />
                <FormHelperText className={this.state.reqCity}>
                  <span className="red">Required</span>
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="state">State *</InputLabel>
                <Select value={this.state.state} onChange={this.stateChangeHandler}>
                  {this.props.states.states && this.props.states.states.map((state, index) => (
                    <MenuItem key={index} value={state.id}>{state.state_name}</MenuItem>
                  ))}

                </Select>
                <FormHelperText className={this.state.reqState}>
                  <span className="red">Required</span>
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <InputLabel htmlFor="pincode">Pincode *</InputLabel>
                <Input id="pincode" aria-describedby="my-helper-text" value={this.state.pincode} pattern="[0-9]*" onChange={this.pincodeChangeHandler} />
                <FormHelperText className={this.state.reqPincode}>
                  <span className="red">Required</span>
                </FormHelperText>
                <FormHelperText className={this.state.verifyPinCode}>
                  <span className="red">Pincode must contain only numbers and must be 6 digit long</span>
                </FormHelperText>
              </FormControl>
            </div>
            <br />  <br />
            <div>
              <Button variant="contained" color="secondary" onClick={this.onSubmitHandler}>Save Address</Button>
            </div>
          </div>
        </TabPanel>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(SimpleTabs);