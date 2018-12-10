import React, { Component } from 'react';
import './Dashboard.css';
import { Redirect } from 'react-router';
import Navbar from '../Navbar/Navbar';
import AppConstants from '../../constant/AppConstants';
import { getBookingHistory } from '../../actions/actions_booking_history';
import { connect } from "react-redux";
class Dashboard extends Component {

    state = {
        bookings: [],
        properties: [],
        currentView: 'booking',
        currentPage: 1,
        propertyPage: 1,
        bookingPage: 1,
        currentBookings: [],
        currentProperties: [],
        filteredBooking:[],
        filteredProperty:[],
        noOfPages: 0
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getBookingHistory();
    }

    componentDidMount() {
        this.state.currentView == 'properties' ? this.getCurrentPagesProperties(1) : this.getCurrentPagesBooking(1);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.properties !== this.props.properties || nextProps.bookings !== this.props.bookings) {
            setTimeout(() => {
                console.log('Next Props ---', this.props.properties);
                this.setState({filteredBooking : nextProps.bookings, filteredProperty: nextProps.properties});
                setTimeout(()=>{
                    this.state.currentView == 'properties' ? this.getCurrentPagesProperties(1) : this.getCurrentPagesBooking(1);
                },100);
            }, 100)
        }
    }

    renderPagerProperty() {
        let pages = [];
        let counter = 1;
        if (this.state.filteredProperty.length > 5) {
            this.state.filteredProperty.map((property, index) => {
                if (index % 5 == 0) {
                    let number = counter++;
                    pages.push(<li class="page-item" key={index}><a class="page-link" onClick={() => { this.getCurrentPagesProperties(number) }}>{number}</a></li>);
                }
            })
            return (
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" onClick={() => { this.getCurrentPagesProperties(this.state.propertyPage - 1) }} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        {pages}
                        <li class="page-item">
                            <a class="page-link" onClick={() => { this.getCurrentPagesProperties(this.state.propertyPage + 1) }} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            )
        }
    }

    renderPagerBooking() {
        let pages = [];
        let counter = 1;
        if (this.state.currentBookings.length > 5) {
            this.state.currentBookings.map((property, index) => {
                if (index % 5 == 0) {
                    let number = counter++;
                    pages.push(<li class="page-item" key={index}><a class="page-link" onClick={() => { this.getCurrentPagesBooking(number) }}>{number}</a></li>);
                }
            })
            return (
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" onClick={() => { this.getCurrentPagesBooking(this.state.bookingPage - 1) }} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        {pages}
                        <li class="page-item">
                            <a class="page-link" onClick={() => { this.getCurrentPagesBooking(this.state.bookingPage + 1) }} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            )
        }
    }


    getCurrentPagesProperties(page) {
        if (page > 0 && page <= Math.ceil(this.state.filteredProperty.length / 5)) {
            console.log(this.state.filteredProperty);
            console.log(((page - 1) * 5), (page * 5));
            let currentProperties = this.state.filteredProperty.slice(((page - 1) * 5), (page * 5));
            this.setState({ currentProperties, propertyPage: page })
            console.log(currentProperties);
        }
    }

    getCurrentPagesBooking(page) {
        if (page > 0 && page <= Math.ceil(this.state.filteredBooking.length / 5)) {
            console.log(this.state.filteredBooking);
            console.log(((page - 1) * 5), (page * 5));
            let currentBookings = this.state.filteredBooking.slice(((page - 1) * 5), (page * 5));
            this.setState({ currentBookings, bookingPage: page })
            console.log(currentBookings);
        }
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
                {
                    JSON.parse(localStorage.getItem(AppConstants.USER_DETAILS)).user_role == AppConstants.USER_ROLE_OWNER ?
                        <div class="row">
                            <ul class="nav nav-tabs">
                                <li className={this.state.currentView == "properties" ? "active" : ""} onClick={this.changeTab.bind(this, 'properties')}><a><h4>All Properties</h4></a></li>
                                <li className={this.state.currentView == "booking" ? "active" : ""} onClick={this.changeTab.bind(this, 'booking')} ><a><h4>Customer Bookings</h4></a></li>
                            </ul>
                        </div>
                        : null
                }
                <div class="search-filter">
                    <input type="text" class="form-control" name="location" onChange={this.onSearch.bind(this)}  placeholder="Enter Property Headline or City" required />
                    <button type="submit" class="btn btn-primary btn-lg">Search</button>
                </div>
                <div class="row booking-list">
                    {this.state.currentView == 'properties' ? this.renderProperties() : this.renderBookings()}
                    {this.state.currentView == 'properties' ? this.renderPagerProperty() : this.renderPagerBooking()}
                </div>
            </div>
        )
    }
    
    onSearch(event){
        console.log(event.target.value);
        if(this.state.currentView == 'properties'){
            let filtered = this.props.properties.filter((el)=>{
                return el.headline.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1 || el.city.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
            });
            this.setState({filteredProperty:filtered});
            setTimeout(()=>{
                this.getCurrentPagesProperties(1);
            }, 100);
        }
        else{
            let filtered = this.props.bookings.filter((el)=>{
                return el.headline.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1 || el.city.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
            });
            this.setState({filteredBooking:filtered});
            setTimeout(()=>{
                this.getCurrentPagesBooking(1);
            }, 100);
        }
        
    }

    changeTab(tab) {
        if (tab == 'properties') {
            this.setState({ currentView: 'properties', propertyPage: 1 });
            setTimeout(() => { this.getCurrentPagesProperties(1) }, 100);
        }
        else {
            this.setState({ currentView: 'booking', bookingPage: 1 });
        }
    }

    renderBookings() {
        let propertyList = [];
        console.log(this.state.currentPageProperties);

        if (this.state.currentBookings.length > 0) {
            this.state.currentBookings.map((booking, index) => {
                propertyList.push(
                    <div class="dashboard-item" key={index}>
                        <div class="pro-photos">
                            {this.renderPhotoCrousel(booking.property, index)}
                        </div>
                        <div class="pro-details">
                            <h3>{booking.property.headline}</h3>
                            <ul class="list-horizontal">
                                <li>{booking.property.type}</li>
                                <li>{booking.property.bedrooms + ' BR'}</li>
                                <li>{booking.property.bathroom + ' BA'}</li>
                                <li>{booking.noOfGuests + ' Guests'}</li>
                            </ul>
                            <ul class="list-horizontal">
                                <li>{'From ' + this.parseDate(booking.arrivalDate) + ' to ' + this.parseDate(booking.departureDate)}</li>
                            </ul>
                            <span><i class="glyphicon glyphicon-map-marker"></i>{" " + booking.property.unit + ', ' + booking.property.street + ', ' + booking.property.city}</span>
                            <div class="rate-footer">
                                <span class="amount-paid">Amount Paid</span>
                                <span><i class="glyphicon glyphicon-usd"></i></span>
                                <span class="price">{booking.amount}</span>
                            </div>
                        </div>
                    </div>
                );
            });
            return propertyList;
        }
        else {
            return (
                <h4>No Bookings Made Yet !</h4>
            );
        }
    }

    renderProperties() {
        let propertyList = [];
        if (this.state.currentProperties.length > 0) {
            this.state.currentProperties.map((property, index) => {
                propertyList.push(
                    <div class="dashboard-item">
                        <div class="pro-photos">
                            {this.renderPhotoCrousel(property, index)}
                        </div>
                        <div class="pro-details">
                            <h3>{property.headline}</h3>
                            <ul class="list-horizontal">
                                <li>{property.type}</li>
                                <li>{property.bedrooms + ' BR'}</li>
                                <li>{property.bathroom + ' BA'}</li>
                                <li>{'Sleeps ' + property.guests}</li>
                            </ul>
                            <span><i class="glyphicon glyphicon-map-marker"></i>{" " + property.unit + ', ' + property.street + ', ' + property.city}</span>
                            <div class="rate-footer">
                                <span><i class="glyphicon glyphicon-usd"></i></span>
                                <span class="price">{property.singleNightRate}</span>
                                <span class="avg-night">avg/night</span>
                            </div>
                        </div>
                    </div>
                );
            });
            return propertyList;
        }
        else {
            return (
                <h4>No Properties Posted Yet !</h4>
            );
        }
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

    parseDate(dateString) {
        let date = new Date(dateString);
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (date.getDate() + 1);
    }
}

function mapStateToProps(reduxState) {
    const { bookings, properties, errorMessage } = reduxState.bookingHistory;
    return { bookings, properties, errorMessage };
}

export default connect(mapStateToProps, { getBookingHistory })(Dashboard);