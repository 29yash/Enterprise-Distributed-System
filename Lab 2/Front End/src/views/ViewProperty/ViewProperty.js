import React, {Component} from 'react';
import './ViewProperty.css';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import AppConstants from '../../constant/AppConstants';
import { bookProperty } from '../../actions/actions_property_detail_booking';
import { connect } from "react-redux";

class ViewProperty extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
    }

    renderAcknowledgement(){
        if(this.props.bookConfirmation){
            return(
                <div class="alert" className={this.props.isAckPositive ? 'alert-success' : 'alert-danger'} role="alert">
                    {this.props.bookConfirmation}
                </div>
            );
        }
    }

    render(){        
        let redirectVar = null;
        let totalPrice = parseInt(Math.round(Math.abs((new Date(this.props.departureDate).getTime() - new Date(this.props.arrivalDate).getTime())/(24*60*60*1000)))) * parseInt(this.props.property.singleNightRate);
        if(!localStorage.getItem(AppConstants.AUTH_TOKEN)){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div class="container view-property">
                {redirectVar}
                <Navbar theme="light"></Navbar>
                <hr/>
                <div class="row">
                    {this.renderAcknowledgement()}
                </div>
                <div class="row">
                    <div class="col-lg-8">
                        {this.renderCrousel()}
                        <hr/>
                        <div class="property-headline">
                            <h3>{this.props.property.headline}</h3>
                        </div>
                        <hr/>
                        <div class="property-detail">                            
                            <div class="key"><h4>Details</h4></div>
                            <div class="detail-item">
                                <h4>Property</h4>
                                <h3>{this.props.property.type}</h3>
                            </div>
                            <div class="detail-item">
                                <h4>Sleeps</h4>
                                <h3>{this.props.property.guests}</h3>
                            </div>
                            <div class="detail-item">
                                <h4>Bedrooms</h4>
                                <h3>{this.props.property.bedrooms}</h3>
                            </div>
                            <div class="detail-item">
                                <h4>Bathrooms</h4>
                                <h3>{this.props.property.bathroom}</h3>
                            </div>
                            <div class="detail-item">
                                <h4>Minimum Stay</h4>
                                <h3>{this.props.property.minStay}</h3>
                            </div>
                        </div>
                        <hr/>
                        <div class="property-description">
                            <div class="key">
                                <h4>About the property</h4>
                            </div>
                            <div class="detail-item">
                                <p>{this.props.property.description}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="booking-info">
                            <div class="price">
                                <h2><i class="glyphicon glyphicon-usd"></i>{this.props.property.singleNightRate}</h2>
                                <span>per Night</span>
                            </div>
                            <div class="dates">
                                <span>{this.props.arrivalDate}</span>
                                <span>{this.props.departureDate}</span>
                            </div>
                            <div class="guests">
                                <span>{this.props.guests + ' guests'}</span>
                            </div>
                            <div class="total">
                                <h3>Total</h3>
                                <h3><i class="glyphicon glyphicon-usd"></i>{this.props.amount}</h3>
                            </div>
                            <div class="book-now">
                                <span>{this.props.property.bookingOption == "24hour" ? "24-hour review" : "Instant Booking"}</span>
                                <button class="btn btn-primary btn-lg btn-block" onClick={this.bookNow.bind(this)}>Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCrousel(){    
        return(
            <div id='property-crousel' class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    {this.renderImageSlides(this.props.property.propertyPictures)}
                </div>
                <a class="carousel-control left" href="#property-crousel" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                </a>
                <a class="carousel-control right" href="#property-crousel" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                </a>
            </div>
        );
    }

    renderImageSlides(pictures){
        let slides = [];
        pictures.map((image, inx)=>{
            let classes = inx == 0 ? "item active" :  "item"
            slides.push(
                <div className={classes}>
                    <img height='100%' width="100%" src={image}/>
                </div>
            );
        });
        return slides;
    }

    bookNow(){
        const { location, arrivalDate, departureDate, guests, amount } = this.props;
        this.props.bookProperty({propertyId:this.props.property._id, arrivalDate, departureDate, guests, amount });

        // axios.post('http://localhost:8080/bookProperty', { propertyId:this.state.property.propertyId, location, arrivalDate, departureDate, guests, amount }, {withCredentials: true}).then((response) => {
        //     console.log(response);
        //     if(response.data.success){
        //         this.setState({isAckPositive:true, ackMessage : response.data.message});
        //     }
        //     else{
        //         this.setState({isAckPositive:false, ackMessage : response.data.message})
        //     }
        // })
        // .catch((error) =>{
        //     console.log(error); 
        // });
    }
}
function mapStateToProps(reduxState) {
    const { location, arrivalDate, departureDate, guests, property, amount, isAckPositive, bookConfirmation } = reduxState.propertyDetailAndBooking;
    return { location, arrivalDate, departureDate, guests, property, amount, isAckPositive, bookConfirmation};
}
export default connect(mapStateToProps, { bookProperty })(ViewProperty);