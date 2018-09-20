import React, {Component} from 'react';
import './Home.css';
import logo from '../../images/logo-header-white.svg';
import birdHouse from '../../images/birdhouse-bceheader-white.svg';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';

class Home extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div class="container root">
                <div class="home-background">
                    <nav class="navbar navbar-light bg-light">
                        <a class="navbar-brand" href="#">
                            <img src={logo} width="200" height="50" class="d-inline-block align-top"/>
                        </a>
                        <div class="navbar-fixed-right">
                          <div class="nav-item">
                            <a>Trip Boards</a>
                          </div>
                          <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Login
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item"><Link to="/login">Traveler Login</Link></a><br/><br/>
                                <a class="dropdown-item" href="#">Owner Login</a>
                            </div>
                          </div>
                          <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Help
                            </a>
                          </div>
                          <div class="list-your-property">
                            <a>List Your Property</a>
                          </div>
                            <a class="bird-house"><img src={birdHouse} height="50" width="50"/></a>
                        </div>
                    </nav>
                    <div class="hero-text">
                        <h1 class="headline">Book beach houses, cabins,</h1>
                        <h1 class="headline">candos and more, worldwide</h1>
                    </div>
                </div>  
            </div>
        );
    }

}
export default Home;