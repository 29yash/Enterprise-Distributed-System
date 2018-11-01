
import React, {Component} from 'react';
import './Home.css';
import {Redirect} from 'react-router';
import AppConstants from '../../constant/AppConstants';
import {inputChange, searchProperty} from '../../actions/actions_search_property';
import { connect } from "react-redux";
import Navbar from '../Navbar/Navbar';


class Home extends Component{

    constructor(props){
        super(props);
    }

    onChange = (event) => {
        this.props.inputChange({[event.target.name]: event.target.value});
    }

    render(){
        return(
            <div class="container root">
                <div class="home-background">
                    <Navbar></Navbar>
                    {this.renderError()}
                    <div class="hero-text">
                        <h1 class="headline">Book beach houses, cabins,</h1>
                        <h1 class="headline">candos and more, worldwide</h1>
                    </div>
                    <div class="inputs row">
                        <form onSubmit={this.searchProperty.bind(this)}>
                        <div class="col-lg-4">
                                <input type="text" name="location" class="form-control" onChange={this.onChange} placeholder="Where do you want to go?" required/>
                            </div>
                            <div class="col-lg-2">
                                <input type="date" name="arrivalDate" class="form-control" onChange={this.onChange} placeholder="Arrive" required/>
                            </div>
                            <div class="col-lg-2">
                                <input type="date" name="departureDate" class="form-control" onChange={this.onChange} placeholder="Depart" required/>
                            </div>
                            <div class="col-lg-2">
                                <input type="number" name="guests" min="1" class="form-control" onChange={this.onChange} placeholder="Guests" required/>
                            </div>
                            <div class="col-lg-2">
                                <button type="submit" class="btn btn-primary btn-lg btn-block">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    renderError(){
        if(this.props.showError){
            return(
                <div class="alert alert-danger" role="alert">
                    {this.props.error}
                </div>
            );
        }
    }


    searchProperty(event){
        event.preventDefault();
        if(!localStorage.getItem(AppConstants.AUTH_TOKEN)){
            this.props.history.push('/login')
        }
        else{
            const { location, arrivalDate, departureDate, guests } = this.props;
            this.props.searchProperty({ location, arrivalDate, departureDate, guests }, true);
        }
    }
}

function mapStateToProps(reduxState) {
    const {location, arrivalDate, departureDate, guests} = reduxState.searchProperty;
    return {location, arrivalDate, departureDate, guests};
}

export default connect(mapStateToProps, {inputChange, searchProperty})(Home);