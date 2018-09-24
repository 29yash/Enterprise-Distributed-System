import React, {Component} from 'react';
import './EditProfile.css';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import profile from '../../images/default-profile-pic.png';

class ViewProfile extends Component{

    userDetails = null;
    state = {
        ackMessage : null,
        isAckPositive: null,
        user_aboutme: '',
        user_city: '',
        user_company: '',
        user_first_name: "",
        user_hometown: '',
        user_languages: '',
        user_last_name: "",
        user_school: '',
        user_gender: "Male",
        user_phone_number: "",
        isFormDirty:false
    };

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.userDetails = this.props.location.state.userDetails;
        this.setState({
            user_aboutme: this.userDetails.user_aboutme,
            user_city: this.userDetails.user_city,
            user_company: this.userDetails.user_company,
            user_first_name: this.userDetails.user_first_name,
            user_hometown: this.userDetails.user_hometown,
            user_languages: this.userDetails.user_languages,
            user_last_name: this.userDetails.user_last_name,
            user_school: this.userDetails.user_school,
            user_gender: this.userDetails.user_gender,
            user_phone_number: this.userDetails.user_phone_number
        });
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, isFormDirty: true });
    }

    handleSubmit(event){
        event.preventDefault();
        const { user_aboutme, user_city, user_company, user_first_name, user_hometown, 
            user_languages, user_last_name, user_school, user_gender, user_phone_number } = this.state;
        axios.post('http://localhost:8080/userProfile/editProfile', {
            user_aboutme, user_city, user_company, user_first_name, user_hometown, 
            user_languages, user_last_name, user_school, user_gender, user_phone_number }, {withCredentials: true}).then((response) => {
            console.log(response);
            if(response.data.success){
                this.setState({isAckPositive:true, ackMessage : response.data.message});
            }
            else{
                this.setState({isAckPositive:false, ackMessage : response.data.message})
            }
            window.scrollTo(0, 0);
        })
        .catch((error) =>{
            console.log(error); 
        });
    }

    renderAcknowledgement(){
        if(this.state.ackMessage){
            return(
                <div class="alert" className={this.state.isAckPositive ? 'alert-success' : 'alert-danger'} role="alert">
                    {this.state.ackMessage}
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
            <div class="container edit-profile">
                {redirectVar}
                <Navbar theme="light"></Navbar>
                <div class="profile-container">
                    {this.renderAcknowledgement()}
                    <div class="row profile-pic">
                        <img class="rounded-circle" height="100" width="100" src={profile}/>
                        <h1>{this.state.user_first_name +" "+ this.state.user_last_name}</h1>
                    </div>
                    <div class="row profile-information">
                        <div class="col-9-lg">
                            <h2>Profile Information</h2><br/>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" onChange={this.onChange} name="user_first_name" value={this.state.user_first_name} placeholder="First Name" required/>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" onChange={this.onChange} name="user_last_name" value={this.state.user_last_name} placeholder="Last Name" required/>
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control form-control-lg" rows="4" onChange={this.onChange} name="user_aboutme" value={this.state.user_aboutme} placeholder="About me"></textarea>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" onChange={this.onChange} name="user_city" value={this.state.user_city} placeholder="City" />
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" onChange={this.onChange} name="user_company" value={this.state.user_company} placeholder="Company" />
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" onChange={this.onChange} name="user_school" value={this.state.user_school} placeholder="School"/>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" onChange={this.onChange} name="user_hometown" value={this.state.user_hometown} placeholder="Hometown"/>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" name="user_gender" value={this.state.user_gender} onChange={this.onChange}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" onChange={this.onChange} name="user_languages" value={this.state.user_languages} placeholder="Languages"/>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" pattern="^\d{3}-\d{3}-\d{4}$" onChange={this.onChange} name="user_phone_number" value={this.state.user_phone_number} placeholder="Phone Number (xxx-xxx-xxx)"/>
                                </div>
                                <div class="form-group save-button">
                                    <button type="submit" class="btn btn-primary btn-lg" disabled={!this.state.isFormDirty}>Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ViewProfile;