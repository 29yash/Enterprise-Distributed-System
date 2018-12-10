import React, {Component} from 'react';
import './OwnerLogin.css';
import logo from '../../images/loginHeader.svg';
import home from '../../images/home_icon.svg';
import ownerLogin from '../../images/owner-login.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {userLogin} from '../../actions/actions_login';
import { connect } from "react-redux";
import AppConstants from "../../constant/AppConstants";

class OwnerLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            password: '',
            username: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    renderFailedLogin(){
        if(this.props.loginFailed){
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
                <div className="row main">
                    <div className="col-lg-6">
                        <img src={ownerLogin} height="300" />
                    </div>
                    <div className="col-lg-4 loginContainer">
                        {this.renderFailedLogin()}
                        <div className="formContainer">
                            <div class="formHeader">
                                <span className="formHeading">Owner Login</span>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-lg" onChange={this.onChange} name="username" placeholder="Email Address" required/>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg" onChange={this.onChange} name="password" placeholder="Password"  minLength="5" required/>
                                </div>
                                <div class="form-group"><a href="#">Forget Password ?</a></div>
                                <div class="form-check form-check-inli1ne">
                                    <input class="form-check-input" type="checkbox" id="keepSignIn" value=""/>   Keep me signed in
                                </div>
                                <br/>
                                <button type="submit" class="btn btn-success btn-lg btn-block">Login</button>
                            </form>
                            <hr/>
                            <h6 style={{'text-align' : 'center'}}>Want to list your property? <Link to="/ownerSignUp"><span class="glyphicon"></span>Learn More</Link></h6>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const { username, password } = this.state;
        let role = AppConstants.USER_ROLE_OWNER;
        this.props.userLogin({username, password, role});
    }
}

function mapStateToProps(state) {
    const { loginFailed, errorMessage, loggingIn  } = state.login;
    return { loginFailed, errorMessage, loggingIn };
}

export default connect(mapStateToProps, {userLogin})(OwnerLogin);