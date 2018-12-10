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
import AppConstants from '../../constant/AppConstants';
import { userLogout } from '../../actions/actions_logout';

class Navbar extends Component{

    userData = null;

    constructor(props){
        super(props);
    }

    componentWillMount(){
        if(localStorage.getItem(AppConstants.USER_DETAILS)){
            this.userData = JSON.parse(localStorage.getItem(AppConstants.USER_DETAILS));
        }
    }

    logout(){
        userLogout();
    }

    renderUser(){
        if(localStorage.getItem(AppConstants.AUTH_TOKEN)){
            let profilePicture = this.userData.user_pic_url ? this.userData.user_pic_url : profile;
            return(
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" className={this.props.theme === 'light' ? 'blue-link-text' : 'white-link-text'} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        <img class="rounded-circle" height="30" width="30" src={profilePicture}/>
                        {"    "+ this.userData.user_first_name}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"> 
                            <Link to="/dashboard">
                                <span class="dropdown-item">
                                    {this.userData.user_role === 'Owner' ?  'Dashboard' : 'My Trips'}
                                </span>
                            </Link>
                        <br/><br/><Link to="/viewProfile"><span class="dropdown-item">My Profile</span></Link><br/>
                        <br/><Link to="/inbox"><span class="dropdown-item">Inbox</span></Link><br/><br/>
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
        let user_role  = this. userData ? this.userData.user_role : null;
        console.log(user_role);
        
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
                        {
                            user_role === 'Owner' ? 
                                <Link to="/postProperty"><a>List Your Property</a></Link>
                            :
                                <a>List Your Property</a>
                        }
                    </div>
                    <a class="bird-house"><img src={this.props.theme === 'light' ? birdhouse : birdHouseWhite} height="50" width="50"/></a>
                </div>
            </nav>
        );
    }
}
export default withRouter(Navbar);