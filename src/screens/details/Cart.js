import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CartItem from './CartItem';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
class Cart extends Component {

    checkoutHandler = (event) => {
       if(this.props.cartItemCount===0){
         this.props.handleSnackBar("Cart is empty");
         return;
       }
       if(sessionStorage.getItem("access-token")==null) {
         this.props.handleSnackBar("Please login first!")
         return;
       }
         let cart = {
           cartItemList : this.props.cartItemList,
           cartItemCount : this.props.cartItemCount,
           cartTotalPrice : this.props.cartTotalPrice,
           restaurantId : this.props.restaurantId,
           restaurantName : this.props.restaurantName,
           restaurantLocality : this.props.restaurantLocality
         }
        
         sessionStorage.setItem("cart", JSON.stringify(cart));
         this.props.history.push('/checkout');  
    }

    addItem = (item) => {
      this.props.addItem(item);
    }
  
    removeItem = (item) => {
      this.props.removeItem(item);
    }

    render(){
        return(
            <div className="cart">
            <div style={{padding:'3%'}}>
              <Card className="card">
                <CardContent>
                  <div style={{display:"inline-block", width:"100%"}}>
                    <div style={{float:"left", width:"10%"}}><Badge badgeContent={this.props.cartItemCount} color="primary"><ShoppingCart /></Badge></div>
                    <div style={{float:"right", width:"90%"}}><Typography variant="h5" gutterBottom style={{fontWeight:'bold'}}> My Cart </Typography></div>
                  </div>
  
                  {/* items in cart */}
                  {this.props.cartItemList.map(cartItem =>
                    <div key={cartItem.item.id} style={{width:"inherit"}}>
                      <CartItem cartItem={cartItem} addItem={this.addItem.bind(this)} removeItem={this.removeItem.bind(this)} />
                    </div>
                  )}
  
                  <div style={{display:"inline-block", width:"100%", paddingTop:"3%"}}>
                    <div style={{float:"left"}}><Typography variant="body1" gutterBottom style={{fontWeight:'bold'}}> TOTAL AMOUNT </Typography></div>
                    <div style={{float:"right", width: "20%"}}><i className="fa fa-rupee-sign" aria-hidden="true"> {this.props.cartTotalPrice.toFixed(2)} </i></div>
                  </div>
                </CardContent>
                <CardActions>
                  <div style={{width:"100%"}}>
                    <Button style={{width:"100%"}} variant="contained" color="primary" onClick={this.checkoutHandler}> CHECKOUT </Button>
                  </div>
                </CardActions>
              </Card>
            </div>
          </div>
        )
    }
}
export default Cart;