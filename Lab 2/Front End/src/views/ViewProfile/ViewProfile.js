import React, {Component} from 'react';
import './ViewProfile.css';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import profile from '../../images/default-profile-pic.png';

class ViewProfile extends Component{

    state = {
        user: null,
        user_aboutme: '',
        user_city: '',
        user_company: '',
        user_first_name: "",
        user_hometown: '',
        user_languages: '',
        user_last_name: "",
        user_school: '',
        pic_url: null
    };
    constructor(props){
        super(props);
    }

    componentDidMount(){
        axios.get('http://localhost:8080/userProfile/getProfile',{withCredentials : true})
                .then((response) => {
                //update the state with the response data
                console.log(response);
                if(response.data.success){
                    this.setState({
                        user: response.data.user,
                        user_aboutme :  response.data.user.user_aboutme ? response.data.user.user_aboutme :'' ,
                        user_city: response.data.user.user_city ? response.data.user.user_city : '',
                        user_company: response.data.user.user_company ? response.data.user.user_company : '',
                        user_first_name: response.data.user.user_first_name ? response.data.user.user_first_name :"",
                        user_hometown: response.data.user.user_hometown ? response.data.user.user_hometown : '',
                        user_languages: response.data.user.user_languages ? response.data.user.user_languages : '',
                        user_last_name: response.data.user.user_last_name ? response.data.user.user_last_name : "",
                        user_school: response.data.user.user_school ? response.data.user.user_school : '',
                        pic_url : response.data.user.pic_url ? response.data.user.pic_url : null
                    });
                }
            });
    }

    render(){
        let redirectVar = null;
        let profilePicture = this.state.pic_url ? this.state.pic_url : profile;
        if(!cookie.load('HomeawayAuth')){
            redirectVar = <Redirect to= "/"/>
        }
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
                            <h1>{"Hi, I'm " + this.state.user_first_name+' '+this.state.user_last_name}</h1>
                            <h4>{this.state.user_city}</h4>
                        </div>
                            <h3 class="about_me">About me</h3>
                        <div class="details">
                            <h4 class="label-mark">{this.state.user_aboutme}</h4>
                            <div class="field">
                                <h4 class="label-mark">Hometown :</h4>
                                <h4>{this.state.user_hometown}</h4>
                            </div>
                            <div class="field">
                                <h4 class="label-mark">Company :</h4>
                                <h4>{this.state.user_company}</h4>
                            </div>
                            <div class="field">
                                <h4 class="label-mark">School :</h4>
                                <h4>{this.state.user_school}</h4>
                            </div>
                            <div class="field">
                                <h4 class="label-mark">Languages :</h4>
                                <h4>{this.state.user_languages}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 edit-profile">
                        <a href="#" class="btn btn-outline-primary btn-lg">
                            <Link to={{ pathname: '/editProfile', state: { userDetails: this.state.user} }} ><span class="glyphicon glyphicon-pencil"></span>Edit Profile</Link> 
                        </a>
                    </div>
               </div>
            </div>
        );
    }
}
export default ViewProfile;