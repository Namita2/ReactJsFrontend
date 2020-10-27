import React, {Component} from 'react';
import CategoryItem from './CategoryItem';
class Category extends Component {

  addMenuItemHandler = (item) => {
    this.props.addMenuItemHandler(item);
   }


    render(){
        return(
        <div className='menu'>
          <div style={{padding:'3%'}}>
            {this.props.categories.map(categoryItem =>
              <div key={categoryItem.id}>
                <CategoryItem item={categoryItem} cartItemCount={this.props.cartItemCount} cartItemList={this.props.cartItemList} cartTotalPrice={this.props.cartTotalPrice} 
                snackbarMessage={this.props.snackbarMessage} snackbarOpen={this.props.snackbarOpen} addMenuItemHandler={this.addMenuItemHandler.bind(this)}/>
              </div>
            )}
          </div>
        </div>

        );
    }
}

export default Category;