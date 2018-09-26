import React, {Component} from 'react';
import './Navbar.css';
import {withRouter} from 'react-router-dom'
import logoWhite from '../../images/logo-header-white.svg';
import birdHouseWhite from '../../images/birdhouse-bceheader-white.svg';
import logo from '../../images/loginHeader.svg';
import birdhouse from '../../images/home_icon.svg';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import profile from '../../images/default-profile-pic.png';
import axios from 'axios';

class Navbar extends Component{

    constructor(props){
        super(props);
    }

    logout(){
        axios.post('http://localhost:8080/logout', {}, {withCredentials: true}).then((response) => {
            console.log(response);
            if(response.data.success){
                this.props.history.push('/');
            }
        })
        .catch((error) =>{
            this.setState({loginFailed:true});
            console.log(error); 
        });
    }

    renderUser(){
        if(cookie.load('HomeawayAuth')){
            console.log(cookie.load('HomeawayAuth'));
            return(
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" className={this.props.theme === 'light' ? 'blue-link-text' : 'white-link-text'} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        <img class="rounded-circle" height="30" width="30" src={profile}/>  Yash M.
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link to="/viewProfile"><span class="dropdown-item">My Profile</span></Link><br/><br/>
                        <span class="dropdown-item" onClick={this.logout.bind(this)}>Logout</span>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" className={this.props.theme === 'light' ? 'blue-link-text' : 'white-link-text'} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Login
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link to="/login"><span class="dropdown-item">Traveller Login</span></Link><br/><br/>
                        <Link to="/ownerLogin"><span class="dropdown-item" href="#">Owner Login</span></Link>
                    </div>
                </div>
            );            
        }
    }

    render(){
        return(
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="#">
                    <Link to="/"><img src={this.props.theme === 'light' ? logo: logoWhite} width="200" height="50" class="d-inline-block align-top"/></Link>
                </a>
                <div class="navbar-fixed-right">
                    <div class="nav-item">
                    <a className={this.props.theme === 'light' ? 'blue-link-text' : 'white-link-text'}>Trip Boards</a>
                    </div>
                    {this.renderUser()}
                    <div class="nav-item dropdown" >
                    <a class="nav-link dropdown-toggle" href="#" className={this.props.theme === 'light' ? 'blue-link-text' : 'white-link-text'} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Help
                    </a>
                    </div>
                    <div class="list-your-property">
                    <a>List Your Property</a>
                    </div>
                    <a class="bird-house"><img src={this.props.theme === 'light' ? birdhouse : birdHouseWhite} height="50" width="50"/></a>
                </div>
            </nav>
        );
    }
}
export default withRouter(Navbar);