import React, { Component } from 'react';
import './PropertyListing.css';
import { Redirect } from 'react-router';
import Navbar from '../Navbar/Navbar';
import AppConstants from '../../constant/AppConstants';
import { inputChange, searchProperty } from '../../actions/actions_search_property';
import { viewProperty } from '../../actions/actions_property_detail_booking';
import { connect } from "react-redux";

class PropertyListing extends Component {

    state = {
        currentPageProperties : [],
        currentPage: 1,
        noOfPages:0
    }

    constructor(props) {
        super(props);
    }

    onChange = (event) => {
        this.props.inputChange({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        this.getCurrentPagesProperties(1);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.properties!==this.props.properties){
            setTimeout(()=>{
                console.log('Next Props ---', this.props.properties);
                this.getCurrentPagesProperties(1);
            }, 200)
        }
    }

    renderError() {
        if (this.props.showError) {
            return (
                <div class="alert alert-danger" role="alert">
                    {this.props.error}
                </div>
            );
        }
    }


    render() {
        let redirectVar = null;
        if (!localStorage.getItem(AppConstants.AUTH_TOKEN)) {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div class="container-fluid list-property">
                {redirectVar}
                <Navbar theme="light"></Navbar>
                <div class="row">
                    <form class="form-inline" onSubmit={this.searchProperty.bind(this)}>
                        <div class="form-group">
                            <label>Where</label>
                            <input type="text" class="form-control" name="location" onChange={this.onChange} value={this.props.location} placeholder="Where" required />
                        </div>
                        <div class="form-group">
                            <label>Arrival</label>
                            <input type="date" class="form-control" name="arrivalDate" onChange={this.onChange} value={this.props.arrivalDate} max={this.props.departureDate} placeholder="Arrival" required />
                        </div>
                        <div class="form-group">
                            <label>Depart</label>
                            <input type="date" class="form-control" name="departureDate" onChange={this.onChange} value={this.props.departureDate} min={this.props.arrivalDate} placeholder="Depart" required />
                        </div>
                        <div class="form-group">
                            <label>Guests</label>
                            <input type="number" min="1" class="form-control" name="guests" onChange={this.onChange} value={this.props.guests} placeholder="Guests" required />
                        </div>
                        <br />
                        <br />
                        <div class="form-group">
                            <label>Min Price</label>
                            <input type="number" min="1" class="form-control" name="minPrice" onChange={this.onChange} value={this.props.minPrice} placeholder="Min Price" />
                        </div>
                        <div class="form-group">
                            <label>Max Price</label>
                            <input type="number" min="1" class="form-control" name="maxPrice" onChange={this.onChange} value={this.props.maxPrice} placeholder="Max Price" />
                        </div>
                        <div class="form-group">
                            <label>No. Of Bedrooms</label>
                            <input type="number" min="1" class="form-control" name="noOfBedrooms" onChange={this.onChange} value={this.props.noOfBedrooms} placeholder="No. Of Bedrooms" />
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg">Search</button>
                    </form>
                    <hr />
                    <div class="properties">
                        {this.renderError()}
                        {this.renderProperties()}
                        {this.renderPager()}
                    </div>
                </div>
            </div>
        );
    }

    renderPager() {
        let pages = [];
        let counter = 1;
        if(this.props.properties.length > 10){
            this.props.properties.map((property, index)=>{
                if(index%10 == 0){
                    let number = counter++;
                    pages.push(<li class="page-item" key={index}><a class="page-link" onClick={()=>{this.getCurrentPagesProperties(number)}}>{number}</a></li>);
                }
            })
        return (
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" onClick={()=>{this.getCurrentPagesProperties(this.state.currentPage - 1)}} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        {pages}
                        <li class="page-item">
                            <a class="page-link" onClick={()=>{this.getCurrentPagesProperties(this.state.currentPage + 1)}} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            )
        }
    }

    getCurrentPagesProperties(page){
        if(page > 0 && page <= Math.ceil(this.props.properties.length/10)){
            console.log(this.props.properties);
            console.log(((page-1)*10),(page*10));
            let currentPageProperties = this.props.properties.slice(((page-1)*10), (page*10));
            this.setState({currentPageProperties, currentPage:page})
            console.log(currentPageProperties);
        }
    }

    renderProperties() {
        let views = [];
        if (this.props.properties.length > 0) {
            this.state.currentPageProperties.map((property, index) => {
                console.log(property, index);
                views.push(this.renderPropertyItem(property, index));
            });
            return views;
        }
        else {
            return (
                <div>
                    <h3>No Properties are available</h3>
                </div>
            );
        }
    }

    showProperty(property) {
        console.log(property);
        let { location, arrivalDate, departureDate, guests } = this.props;
        this.props.viewProperty({ property, location, arrivalDate, departureDate, guests });
    }

    renderPropertyItem(property, index) {
        return (
            <div class="property-item" onClick={this.showProperty.bind(this, property)}>
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

    searchProperty(event) {
        event.preventDefault();
        const { location, arrivalDate, departureDate, guests, maxPrice, minPrice, noOfBedrooms } = this.props;
        this.props.searchProperty({ location, arrivalDate, departureDate, guests, maxPrice, minPrice, noOfBedrooms });
    }
}

function mapStateToProps(reduxState) {
    const { location, arrivalDate, departureDate, guests, properties, maxPrice, minPrice, noOfBedrooms } = reduxState.searchProperty;
    return { location, arrivalDate, departureDate, guests, properties, maxPrice, minPrice, noOfBedrooms };
}
export default connect(mapStateToProps, { inputChange, searchProperty, viewProperty })(PropertyListing);
