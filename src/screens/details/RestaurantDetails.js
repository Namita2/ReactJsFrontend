import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
class RestaurantDetails extends Component {
    render(){
        return(
        <div className="restaurant-section">
           <div className = "image">
              <img alt="Restaurant" src={this.props.photoUrl} width="100%" />
            </div>
          <div className="restaurant-details">
          <div>
            <Typography variant="h3" gutterBottom> {this.props.restaurantName} </Typography> <br />
            <Typography variant="h5" gutterBottom> {this.props.restaurantLocality} </Typography> <br />
            <Typography variant="body1" gutterBottom> {this.props.categories.map((category) => category.category_name).join(", ")} </Typography>
          </div>
          <div style={{float:'left', display:"flex", flexDirection:"row", width:"100%", paddingTop:"5%"}}>
            <div style={{width:"100%"}}>
            <i className="fa fa-star" aria-hidden="true"> {this.props.rating} </i> <br/>
            <Typography variant="caption" gutterBottom> AVERAGE RATING BY <br /> <span style={{fontWeight: 'bold'}}> {this.props.numberOfCustomers} </span> USERS </Typography>
            </div>
            <div style={{width:"100%"}}>
            <i className="fa fa-rupee-sign" aria-hidden="true"> {this.props.averagePrice} </i> <br/>
            <Typography variant="caption" gutterBottom> AVERAGE COST FOR <br /> TWO PEOPLE </Typography>
            </div>
          </div>
        </div>
        </div>
        )
    }
}
export default RestaurantDetails;