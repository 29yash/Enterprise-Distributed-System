import React, {Component} from 'react';
import './PropertyListing.css';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

class PropertyListing extends Component{

    state = {
        location: null,
        arrivalDate: null,
        departureDate:null,
        guests:null,
        showError:false,
        error:null,
        properties: [],
    }

    constructor(props){
        super(props);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value , showError:false });
    }

    componentDidMount(){
        let { location, arrivalDate, departureDate, guests } = this.props.location.state.searchData;
        let properties = this.props.location.state.properties;
        this.setState({
            location,
            arrivalDate,
            departureDate,
            guests,
            properties
        });
    }

    renderError(){
        if(this.state.showError){
            return(
                <div class="alert alert-danger" role="alert">
                    {this.state.error}
                </div>
            );
        }
    }


    render(){
        let redirectVar = null;
        if(!cookie.load('HomeawayAuth')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div class="container-fluid list-property">
                {redirectVar}
                <Navbar  theme="light"></Navbar>
                <div class="row">
                    <form class="form-inline" onSubmit={this.searchProperty.bind(this)}>
                        <div class="form-group">
                            <label>Where</label>
                            <input type="text" class="form-control" name="location" onChange={this.onChange} value={this.state.location} placeholder="Where" required/>
                        </div>
                        <div class="form-group">
                            <label>Arrival</label>
                            <input type="date" class="form-control" name="arrivalDate" onChange={this.onChange} value={this.state.arrivalDate} placeholder="Arrival" required/>
                        </div>
                        <div class="form-group">
                            <label>Depart</label>
                            <input type="date" class="form-control" name="departureDate" onChange={this.onChange} value={this.state.departureDate} placeholder="Depart" required/>
                        </div>
                        <div class="form-group">
                            <label>Guests</label>
                            <input type="number" min="1" class="form-control" name="guests" onChange={this.onChange} value={this.state.guests} placeholder="Guests" required/>
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg">Search</button>
                    </form>
                    <hr/>
                    <div class="properties">
                        {this.renderError()}
                        {this.renderProperties()}
                    </div>
                </div>
            </div>
        );
    }

    renderProperties(){
        let views = [];
        if(this.state.properties.length > 0){
            this.state.properties.map((property, index)=>{
                console.log(property, index);
                views.push(this.renderPropertyItem(property,index));
            });
            return views;
        }
        else{
            return(
                <div>
                    <h3>No Properties are available</h3>
                </div>
            );
        }
    }

    showProperty(property){
        console.log(property);
        let { location, arrivalDate, departureDate, guests } = this.state;
        this.props.history.push({pathname :'/viewProperty',  state: {property, location, arrivalDate, departureDate, guests} });
    }

    renderPropertyItem(property,index){
        return(
            <div class="property-item" onClick={this.showProperty.bind(this, property)}>
                <div class="pro-photos">
                    {this.renderPhotoCrousel(property, index)}
                </div>
                <div class="pro-details">
                    <h3>{property.headline}</h3>
                    <ul class="list-horizontal">
                        <li>{property.type}</li>
                        <li>{property.bedrooms+' BR'}</li>
                        <li>{property.bathroom+' BA'}</li>
                        <li>{'Sleeps ' + property.guests}</li>
                    </ul>
                    <span><i class="glyphicon glyphicon-map-marker"></i>{ property.unit +', ' + property.street +', ' + property.city}</span>
                    <div class="rate-footer">
                        <span><i class="glyphicon glyphicon-usd"></i></span>
                        <span class="price">{property.singleNightRate}</span>
                        <span class="avg-night">avg/night</span>
                    </div>
                </div>
            </div>
        );
    }

    renderPhotoCrousel(property, index){
        let pictures = JSON.parse(property.propertyPictures);        
        return(
            <div id={index + '-crousel'} class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    {this.renderImageSlides(pictures)}
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

    searchProperty(event){
        event.preventDefault();
        const { location, arrivalDate, departureDate, guests } = this.state;
        axios.post('http://localhost:8080/searchProperty', {location, arrivalDate, departureDate, guests}, {withCredentials: true}).then((response) => {
            console.log(response);
            if(response.data.success){
                this.setState({properties : response.data.properties});
            }
            else{
                this.setState({showError:true, error:response.data.message})
            }
        })
        .catch((error) =>{
            console.log(error);
            if(error.response.status == 401){
                this.props.history.push('/');
            }
            else{
                this.setState({showError:true, error: error.message});
            }
        });
    }
}
export default PropertyListing;
