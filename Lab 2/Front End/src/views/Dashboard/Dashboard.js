import React, { Component } from 'react';
import './Dashboard.css';
import { Redirect } from 'react-router';
import Navbar from '../Navbar/Navbar';
import AppConstants from '../../constant/AppConstants';

class Dashboard extends Component {

    state = {
        bookings: [],
        properties: [],
        currentView: 'property'
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // axios.get('http://localhost:8080/bookingHistory',{withCredentials : true})
        //     .then((response) => {
        //         if(response.data.success){
        //             console.log(response.data.bookings);
        //             this.setState({bookings: response.data.bookings});
        //         }
        //     })
        //     .catch((error) =>{
        //         console.log(error);
        //         if(error.response.status == 401){
        //             this.props.history.push('/');
        //         }
        //     });
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem(AppConstants.AUTH_TOKEN)) {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div class="container owner-dashboard">
                {redirectVar}
                <Navbar theme="light"></Navbar>
                <hr />
                <div class="row">
                    <ul class="nav nav-tabs">
                        <li class="active"><a><h4>All Properties</h4></a></li>
                        <li><a><h4>Customer Bookings</h4></a></li>
                    </ul>
                </div>
                <div class="row booking-list">
                    {this.state.currentView == 'property' ? this.renderProperties() : this.renderBookings()}
                </div>
            </div>
        )
    }

    renderBookings() {
        return (
            <div></div>
        );
    }

    renderProperties() {
        let property = {
            "propertyPictures": [
                "http://localhost:8080/photos/40ef0e4f-39fa-451a-b495-a8b8e5f6bb89.jpg",
                "http://localhost:8080/photos/7a4a40c0-4cc1-4b79-91c2-92a9f485d6c8.jpg",
                "http://localhost:8080/photos/f626fda2-75ce-4d8b-9531-697366e4c768.jpg"
            ],
            "country": "India",
            "street": "Meera Nagar, Koregaon Park,",
            "unit": "323",
            "city": "Pune",
            "state": "Maharashtra",
            "zip": "41100",
            "headline": "Deluxe 2 bedrooms in Koregaon Park",
            "description": "One of the most of prime area of the city, moreover considered as heart of the city\n\nApartments located in the Lane D, Lane 5, Lane 6 of Koregaon park\n\nVery close from OSHO communication, Hospitals, major restaurant, shopping malls etc\n\nVariety of apartments like standard, deluxe, royal, 1/2/3/4 BHK Apartment are available\n\nFacilities :\n\nAir-conditioned bedrooms with attached bathrooms\n\nSatellite television\n\nWell furnished living &amp; Dining Area\n\nFully equipped kitchen with all required things provided in it\n\nDaily Housekeeping\n\nHigh speed internet access\n\n24 hrs running hot &amp; cold water\n\n24/7 Caretaker's assistance\n\nPower back up\n\n24/7 assistance &amp; security\n\nDay to day maintenance\n\nGas hub with chimney\n\nMicrowave, refrigerator\n\nTea/coffee maker\n\nPots, pans, serving dishes",
            "type": "Apartment",
            "bedrooms": 2,
            "bathroom": 2,
            "guests": 4,
            "bookingOption": "instant",
            "singleNightRate": 456,
            "minStay": 2,
        }
        return (
            <div class="dashboard-item">
                <div class="pro-photos">
                    {this.renderPhotoCrousel(property, 1)}
                </div>
                <div class="pro-details">
                    <h3>{property.headline}</h3>
                    <ul class="list-horizontal">
                        <li>{property.type}</li>
                        <li>{property.bedrooms + ' BR'}</li>
                        <li>{property.bathroom + ' BA'}</li>
                        <li>{'Sleeps ' + property.guests}</li>
                    </ul>
                    <span><i class="glyphicon glyphicon-map-marker"></i>{property.unit + ', ' + property.street + ', ' + property.city}</span>
                    <div class="rate-footer">
                        <span><i class="glyphicon glyphicon-usd"></i></span>
                        <span class="price">{property.singleNightRate}</span>
                        <span class="avg-night">avg/night</span>
                    </div>
                </div>
            </div>
        );
    }

    renderPhotoCrousel(property, index) {     
        return (
            <div id={index + '-crousel'} class="carousel slide" data-ride="carousel" onClick={(event) => { event.stopPropagation(); }}>
                <div class="carousel-inner">
                    {this.renderImageSlides(property.propertyPictures)}
                </div>
                <a class="carousel-control left" href={"#" + index + '-crousel'} data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                </a>
                <a class="carousel-control right" href={"#" + index + '-crousel'} data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                </a>
            </div>
        );
    }

    renderImageSlides(pictures) {
        let slides = [];
        pictures.map((image, inx) => {
            let classes = inx == 0 ? "item active" : "item"
            slides.push(
                <div className={classes}>
                    <img height='100%' width="100%" src={image} />
                </div>
            );
        });
        return slides;
    }
}
export default Dashboard;
        // <table>
        //     <tr>
        //         <th>Booking ID</th>
        //         <th>Property ID</th> 
        //         <th>Arrival</th>
        //         <th>Departure</th>
        //         <th>No. Of Guests</th>
        //         <th>Amount Paid</th>
        //     </tr>
        //     {
        //         this.state.bookings.length > 0 ?
        //             this.state.bookings.map((booking, index)=>{
        //                 let rows = [];
        //                 let arrival = new Date(booking.startDate);
        //                 let depart = new Date(booking.endDate)
        //                 rows.push(
        //                     <tr id={index}>
        //                         <td>{booking.bookingId}</td>
        //                         <td>{booking.propertyId}</td> 
        //                         <td>{arrival.getFullYear() + '-'+eval(arrival.getMonth()+1)+ '-' +arrival.getDate()}</td>
        //                         <td>{depart.getFullYear() + '-'+eval(depart.getMonth()+1)+ '-' +depart.getDate()}</td>
        //                         <td>{booking.guests}</td>
        //                         <td>{booking.amount}</td>
        //                 </tr>
        //                 );
        //                 return rows;
        //             })
        //         :
        //         <h3>There are no bookings made yet</h3>
        //     }
        // </table>