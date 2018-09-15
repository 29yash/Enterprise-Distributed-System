import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from '../views/Login/Login';
import SignUp from '../views/SignUp/SignUp';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/* <Route path="/" component={SignUp}/> */}
                <Route path="/login" component={Login}/>
                <Route path="/signUp" component={SignUp}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;