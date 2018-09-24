
import React, {Component} from 'react';
import './Home.css';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

class Home extends Component{

    constructor(props){
        super(props);
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
                        <div class="col-lg-4">
                            <input type="text" class="form-control" placeholder="Where do you want to go?"/>
                        </div>
                        <div class="col-lg-2">
                            <input type="text" class="form-control" placeholder="Arrive"/>
                        </div>
                        <div class="col-lg-2">

                            <input type="text" class="form-control" placeholder="Depart"/>
                        </div>
                        <div class="col-lg-2">
                            <input type="text" class="form-control" placeholder="Guests"/>
                        </div>
                        <div class="col-lg-2">
                            <button type="button" class="btn btn-primary btn-lg btn-block">Search</button>
                        </div>
                    </div>
                </div>  
            </div>
        );
    }

}
export default Home;