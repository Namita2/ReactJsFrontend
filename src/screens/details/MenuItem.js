import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Add from '@material-ui/icons/Add';
class MenuItem extends Component {
   

addMenuItemHandler = (item) => {
  this.props.addMenuItemHandler(item);
}

    render(){
       const color = this.props.item.item_type === "NON_VEG" ? "red" : "green";
       return(
        <div className="menu-item">
        <div className="menu-item-type"><Icon style={{color:color}} fontSize="small">circle</Icon></div>
        <div className="menu-item-name"> {this.props.item.item_name} </div>
        <div className="menu-item-price"><i className="fa fa-rupee-sign" aria-hidden="true"> {this.props.item.price.toFixed(2)} </i></div>
        <div className="menu-item-add-button">
        <IconButton onClick={(e) => this.addMenuItemHandler(this.props.item)}><Add style={{height:"100%"}} /></IconButton>
        </div>
      </div>
       )
   }

}

export default MenuItem;