import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from '../views/Login/Login';
import SignUp from '../views/SignUp/SignUp';
import Home from '../views/Home/Home';
import ViewProfile from '../views/ViewProfile/ViewProfile';
import EditProfile from '../views/EditProfile/EditProfile';
import OwnerLogin from '../views/OwnerLogin/OwnerLogin';
import OwnerSignUp from '../views/OwnerSignUp/OwnerSignUp';
import OwnerDashboard from '../views/OwnerDashboard/OwnerDashboard';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/ownerLogin" component={OwnerLogin}/>
                <Route path="/signUp" component={SignUp}/>
                <Route path="/ownerSignUp" component={OwnerSignUp}/>
                <Route path="/viewProfile" component={ViewProfile}/>
                <Route path="/editProfile" component={EditProfile}/>
                <Route path="/ownerDashboard" component={OwnerDashboard}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;