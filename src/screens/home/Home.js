import React from 'react';
import Header from '../../common/header/Header';
import {Card, CardContent, CardMedia} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import './Home.css';
import * as Utils from "../../common/Utils";
import * as Constants from "../../common/Constants";

function styles() {
    return {
        media: {
            height: 140
        }
    };
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: []
        }; 
    }

    componentDidMount() {
        this.getAllRestaurantData();
    }

    getAllRestaurantData(){
        let getAllRestaurantsUrl = `http://localhost:8080/api/restaurant`;
        fetch(getAllRestaurantsUrl)
            .then(result => result.json())
            .then(response => this.setState({restaurants: response.restaurants}));
    }

    redirectToDetailsPage = id => window.location = `/details/${id}`;

    render() {
        const {classes} = this.props;
        const {restaurants} = this.state;
        //const {searchResByName} = this.searchResByName;
        return <>
            <Header logoutHandler={this.loginredirect} baseUrl={this.props.baseUrl} searchRestaurantsByName={this.searchRestaurantsByName} showSearch={true} history={this.props.history} />
            <div className='cardContainer'>
            {!(restaurants && 0 < restaurants.length) ? null : restaurants.map(this.restaurantList(classes))}
            </div>
        </>;
    }

    restaurantList(classes) {
        return restaurant => {
            return <Card className='restaurantCard' key={restaurant.id}
                         onClick={() => this.redirectToDetailsPage(restaurant.id)}>
                <CardMedia className={classes.media} title='restaurantImage' image={restaurant.photo_URL}/>
                <CardContent className='cardContent'>
                    <h3>{restaurant.restaurant_name}</h3>
                    <p>{restaurant.categories}</p>
                    <div className='footer'>
                        <div className='ratingContainer'>
                            <p>
                                <i className='fa fa-star' aria-hidden='true'/>
                                <span>&nbsp;{restaurant.customer_rating}&nbsp;({restaurant.number_customers_rated})</span>
                            </p>
                        </div>
                        <div className='costContainer'>
                            <p>
                                <i className='fa fa-inr' aria-hidden='true'/>
                                <span>&nbsp;{restaurant.average_price} for two</span>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>;
        };
    }

    searchRestaurantsByName = event => {
        const searchValue = event.target.value;
        const requestUrl = "http://localhost:8080/api/" + "restaurant/name/" + searchValue;
        const that = this;
        console.log(requestUrl);
        if (!Utils.isEmpty(searchValue)) {
            Utils.makeApiCall(
                requestUrl,
                null,
                null,
                Constants.ApiRequestTypeEnum.GET,
                null,
                responseText => {
                    that.setState(
                        {
                            restaurants:JSON.parse(responseText).restaurants
                        }
                    );
                },
                () => { }
            );
        } else {
            this.getAllRestaurantData();
        }
    };

    loginredirect = () => {
        sessionStorage.clear();
        this.props.history.push({
            pathname: "/"
        });
        window.location.reload();
    }
}

export default withStyles(styles)(Home);
