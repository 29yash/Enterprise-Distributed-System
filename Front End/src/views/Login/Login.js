import React, {Component} from 'react';
import './Login.css';
import logo from '../../images/loginHeader.svg';
import home from '../../images/home_icon.svg';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class Login extends Component{
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
                        <h1>Log in to HomeAway</h1>
                        <h4>Need a account? <Link to="/signUp"><span class="glyphicon"></span>SignUp</Link></h4>
                        <div className="formContainer">
                            <div class="formHeader">
                                <span class="formHeading">Account Login</span>
                            </div>
                            <form>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="email" placeholder="Email Address"/>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="password" placeholder="Password"/>
                                </div>
                                <div class="form-group"><a href="#">Forget Password ?</a></div>
                                <button type="button" class="btn btn-success btn-lg btn-block">Login</button>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="keepSignIn" value=""/>   Keep me signed in
                                </div>
                            </form> 
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;