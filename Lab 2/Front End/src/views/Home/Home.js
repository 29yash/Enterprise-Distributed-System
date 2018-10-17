
import React, {Component} from 'react';
import './Home.css';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

class Home extends Component{

    state = {
        location: null,
        arrivalDate: null,
        departureDate:null,
        guests:null,
        showError:false,
        error:null
    }

    constructor(props){
        super(props);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value , showError:false });
    }

    render(){
        let redirectVar = null;
        if(!cookie.load('HomewayAuth')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div class="container root">
                <div class="home-background">
                    <Navbar></Navbar>
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
                {this.renderError()}
                </div>
            </div>
        );
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


    searchProperty(event){
        event.preventDefault();
        const { location, arrivalDate, departureDate, guests } = this.state;
        axios.post('http://localhost:8080/searchProperty', {location, arrivalDate, departureDate, guests}, {withCredentials: true}).then((response) => {
            console.log(response);
            if(response.data.success){
                this.props.history.push({pathname :'/searchProperty',  state: { properties: response.data.properties, searchData : {location, arrivalDate, departureDate, guests} }});
            }
            else{
                this.setState({showError:true, error:response.data.message})
            }
        })
        .catch((error) =>{
            console.log(error);
            if(error.response.status == 401){
                this.setState({showError:true, error: "Please login to view properties."})
            }
            else{
                this.setState({showError:true, error: error.message});
            }
        });
    }
}
export default Home;