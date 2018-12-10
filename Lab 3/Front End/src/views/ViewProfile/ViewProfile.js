import React, {Component} from 'react';
import './ViewProfile.css';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { connect } from "react-redux";
import {fetchUserProfile} from '../../actions/actions_user';
import profile from '../../images/default-profile-pic.png';
import AppConstants from '../../constant/AppConstants';
var Loader = require('react-loader');

class ViewProfile extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.fetchUserProfile();
    }

    render(){
        let redirectVar = null;
        if(!localStorage.getItem(AppConstants.AUTH_TOKEN)){
            redirectVar = <Redirect to= "/"/>
        }
        if(this.props.userProfile == null){
            return(
                <div class="container root">
                    <Navbar theme="light"></Navbar>
                    <Loader loaded={true} lines={13} length={20} width={10} radius={30}
                        corners={1} rotate={0} direction={1} color="#000" speed={1}
                        trail={60} shadow={false} hwaccel={false} className="spinner"
                        zIndex={2e9} top="50%" left="50%" scale={1.00}
                        loadedClassName="loadedContent">
                    </Loader>
                </div>
            );
        }
        else{
            console.log(this.props.userProfile);
            let profilePicture = this.props.userProfile.user_pic_url ? this.props.userProfile.user_pic_url : profile;
            return(
                <div class="container root">
                    {redirectVar}
                   <Navbar theme="light"></Navbar>
                    <div class="profile-info">
                            <div class="col-lg-5 picture-div h-100">
                            <img class="rounded-circle" height="225" width="225" src={profilePicture}/>
                            </div>
                            <div class="col-lg-5">
                                <div class="heading">
                                    <h1>{"Hi, I'm " + this.props.userProfile.user_first_name+' '+this.props.userProfile.user_last_name}</h1>
                                    <h4>{this.props.userProfile.user_city}</h4>
                                </div>
                                    <h3 class="about_me">About me</h3>
                                <div class="details">
                                    <h4 class="label-mark">{this.props.userProfile.user_aboutme}</h4>
                                    <div class="field">
                                        <h4 class="label-mark">Hometown :</h4>
                                        <h4>{this.props.userProfile.user_hometown}</h4>
                                    </div>
                                    <div class="field">
                                        <h4 class="label-mark">Company :</h4>
                                        <h4>{this.props.userProfile.user_company}</h4>
                                    </div>
                                    <div class="field">
                                        <h4 class="label-mark">School :</h4>
                                        <h4>{this.props.userProfile.user_school}</h4>
                                    </div>
                                    <div class="field">
                                        <h4 class="label-mark">Languages :</h4>
                                        <h4>{this.props.userProfile.user_languages}</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 edit-profile">
                                <a href="#" class="btn btn-outline-primary btn-lg">
                                    <Link to={{ pathname: '/editProfile' }} ><span class="glyphicon glyphicon-pencil"></span>Edit Profile</Link> 
                                </a>
                            </div>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    const { userProfile, message, loading  } = state.userProfile;
    return { userProfile, message, loading };
}

export default connect(mapStateToProps, {fetchUserProfile})(ViewProfile);
