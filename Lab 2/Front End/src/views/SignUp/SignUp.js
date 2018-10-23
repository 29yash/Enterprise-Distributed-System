import React, {Component} from 'react';
import './SignUp.css';
import logo from '../../images/loginHeader.svg';
import home from '../../images/home_icon.svg';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {userSignup} from '../../actions/actions_signup';
import { connect } from "react-redux";
import AppConstants from "../../constant/AppConstants";

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            password: '',
            firstName: '',
            lastName:'',
            email:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    renderFailedSignUp(){
        if(this.props.failedSignUp){
            return(
                <div class="alert alert-danger" role="alert">
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    render(){
        return(
            <div className="container login">
                <div className="row header">
                  <span className="logo"><Link to="/"><img src={logo} width="200" height="50" /></Link></span>
                  <span className="home"><img src={home} width="50" height="50" /></span>
                </div>
                <div className="row signup-main">
                    {this.renderFailedSignUp()}
                    <div className="loginContainer">
                        <h1>Sign up for HomeAway</h1>
                        <h4>Already have an account? <Link to="/login"><span class="glyphicon"></span>Login</Link></h4>
                        <div className="formContainer">
                            <form onSubmit={this.handleSubmit}>
                                <div class="form-group form-inline row">
                                    <div class="form-group">
                                        <input type="text" class="form-control form-control-lg" onChange={this.onChange} name="firstName" placeholder="First Name" required/>
                                    </div>
                                    <div class="form-group margin-left">
                                        <input type="text" class="form-control form-control-lg" onChange={this.onChange}  name="lastName" placeholder="Last name" required/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <input type="email" class="form-control form-control-lg" onChange={this.onChange} name="email" placeholder="Email address" required/>
                                </div>
                                <div class="form-group row">
                                    <input type="password" class="form-control form-control-lg" onChange={this.onChange} name="password" placeholder="Password" required minLength="6"/>
                                </div>
                                <button type="submit" class="btn btn-success btn-lg btn-block">Sign Me Up</button>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const { firstName, lastName, email, password } = this.state;
        let role = AppConstants.USER_ROLE_TRAVELLER;
        this.props.userSignup({ firstName, lastName, email, password, role });
    }
}

function mapStateToProps(state) {
    const { failedSignUp, errorMessage  } = state.signup;
    return { failedSignUp, errorMessage };
}

export default connect(mapStateToProps, {userSignup})(SignUp);