import React, {Component} from 'react';
import './SignUp.css';
import logo from '../../images/loginHeader.svg';
import home from '../../images/home_icon.svg';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class SignUp extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container login">
                <div className="row header">
                  <span className="logo"><img src={logo} width="200" height="50" /></span>
                  <span className="home"><img src={home} width="50" height="50" /></span>
                </div>
                <div className="row main">
                    <div className="loginContainer">
                        <h1>Sign up for HomeAway</h1>
                        <h4>Already have an account? <Link to="/login"><span class="glyphicon"></span>Login</Link></h4>
                        <div className="formContainer">
                            <form>
                                <div class="form-group form-inline row">
                                    <div class="form-group">
                                        <input type="text" class="form-control form-control-lg" id="firstName" placeholder="First Name"/>
                                    </div>
                                    <div class="form-group margin-left">
                                        <input type="text" class="form-control form-control-lg"  id="lastName" placeholder="Last name"/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <input type="text" class="form-control form-control-lg" id="email" placeholder="Email address"/>
                                </div>
                                <div class="form-group row">
                                    <input type="text" class="form-control form-control-lg" id="password" placeholder="Password"/>
                                </div>
                                <button type="button" class="btn btn-success btn-lg btn-block">Sign Me Up</button>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SignUp;