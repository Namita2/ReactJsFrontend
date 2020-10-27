import React, {Component} from 'react';
import Header from '../../common/header/Header';
import './Details.css';
import Category from './Category';
import Cart from './Cart';
import RestaurantDetails from './RestaurantDetails';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

class Details extends Component{

    constructor(){
        super();
        this.state={
            restaurantName : "",
            restaurantLocality : "",
            photoUrl : "",
            categories: [],
            rating : "",
            numberOfCustomers : "",
            averagePrice : "" ,
            snackBarOpen : false,
            snackbarMessage : "",
            cartItemCount : 0,
            cartItemList : [],
            cartTotalPrice : 0,
            restaurantId : ""

        };
    }

    componentDidMount(){
      
      const path = this.props.history.location.pathname;
      const id = path.substring(9, path.length);
        fetch('http://localhost:8080/api/restaurant/'+id,{
          method: 'GET',
        })
        .then(res => res.json())
        .then((body) => {
          this.setState({ restaurantName: body.restaurant_name,
            restaurantLocality : body.address.locality,
            photoUrl : body.photo_URL,
            categories : body.categories,
            rating : body.customer_rating,
            numberOfCustomers : body.number_customers_rated,
            averagePrice: body.average_price,
            restaurantId : id

        })
        })
        .catch(console.log)
    }

    //Logout action from drop down menu on profile icon
    loginredirect = () => {
      sessionStorage.clear();
      this.props.history.push({
        pathname: "/"
      });
  }

    handleSnackBar = (message) => {
    this.setState({
      snackbarOpen: !this.state.snackbarOpen,
      snackbarMessage: message,
    });
  }

  addItem = (item) => {
    this.handleSnackBar("Item added to cart!");
    let cartItemList = this.state.cartItemList;
    var index = cartItemList.indexOf(item);
    cartItemList[index].quantity +=1;
    cartItemList[index].itemTotalPrice = cartItemList[index].quantity * cartItemList[index].item.price;
    this.setState({
      cartItemCount : this.state.cartItemCount + 1,
      cartItemList : cartItemList,
      cartTotalPrice : this.state.cartTotalPrice + item.item.price
    })
    
  }

  removeItem = (item) => {
    this.handleSnackBar("Item removed from cart!");
    let cartItemList = this.state.cartItemList;
    var index = cartItemList.indexOf(item);
    if(cartItemList[index].quantity>1){
      cartItemList[index].quantity -=1;
      cartItemList[index].itemTotalPrice = cartItemList[index].quantity * cartItemList[index].item.price;
    }
    else
      cartItemList.splice(index,1);
    if(cartItemList.length > 0)
    this.setState({
        cartItemCount : this.state.cartItemCount - 1,
        cartItemList : cartItemList,
        cartTotalPrice : this.state.cartTotalPrice - item.item.price
      })
    else
    this.setState({
      cartItemCount : 0,
      cartItemList : [],
      cartTotalPrice : 0
    })
      
  }
  

  addMenuItemHandler = (item) => {
    this.handleSnackBar("Item added to cart!");
    let cartItemList = this.state.cartItemList;
    var cartItem;
    var index = cartItemList.findIndex(element => element.id===item.id);
    if(index===-1)
    {
      cartItem = {
        item : item,
        itemTotalPrice : item.price * 1, 
        quantity : 1 
      };
      cartItemList.push(cartItem);
   }
   else 
   {
     cartItemList[index].quantity +=1;
     cartItemList[index].itemTotalPrice = cartItemList[index].quantity * cartItemList[index].item.price;
   }

   this.setState({
     cartItemCount : this.state.cartItemCount + 1,
     cartItemList : cartItemList,
     cartTotalPrice : this.state.cartTotalPrice + item.price
   })
  }

  logoutHandler = () => {
    sessionStorage.clear();
    this.props.history.push({
      pathname: "/"
    });
  };
    render(){
        return(
            <div>
                <Header logoutHandler={this.loginredirect} baseUrl={this.props.baseUrl} showSearch={false} history={this.props.history} />
                <div className="restaurant-section">
                <RestaurantDetails restaurantName={this.state.restaurantName} restaurantLocality={this.state.restaurantLocality} photoUrl={this.state.photoUrl} rating={this.state.rating} numberOfCustomers={this.state.numberOfCustomers} averagePrice={this.state.averagePrice} categories={this.state.categories}/>
                    
                </div>
                <div className="menu-cart-section">
                <Category categories={this.state.categories}   addMenuItemHandler={this.addMenuItemHandler.bind(this)}/>
                <Cart cartItemCount={this.state.cartItemCount} cartItemList={this.state.cartItemList} cartTotalPrice={this.state.cartTotalPrice} restaurantId={this.state.restaurantId}
                handleSnackBar={this.handleSnackBar} addItem={this.addItem.bind(this)} removeItem={this.removeItem.bind(this)} history={this.props.history} 
                restaurantName={this.state.restaurantName} restaurantLocality={this.state.restaurantLocality} />
                </div>

                <Snackbar
                    anchorOrigin={{
                       vertical: 'bottom',
                       horizontal: 'left',
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={1000}
                    onClose={(e) => this.handleSnackBar("")}
                    ContentProps={{
                     'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackbarMessage}</span>}
                    action={[
                       <IconButton
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          onClick={(e) => this.handleSnackBar("")}
                        >
                         <Close/>
                        </IconButton>,
                       ]}
                    />

            </div>
        )
    }
}
export default Details;