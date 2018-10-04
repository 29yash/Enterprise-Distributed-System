import React, {Component} from 'react';
import './OwnerDashboard.css';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

class OwnerDashboard extends Component{

    constructor(props){
        super(props);
    }

    render(){        
        let redirectVar = null;
        if(!cookie.load('HomeawayAuth')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div class="container owner-dashboard">
                {redirectVar}
                <Navbar theme="light"></Navbar>
                <hr/>
                <div class="row">
                    <h3>Booking History</h3>
                </div>
                <div class="row">
                <table >
                    <tr>
                        <th>Booking ID</th>
                        <th>Traveller</th> 
                        <th>Arrival</th>
                        <th>Departure</th>
                        <th>No. Of Guests</th>
                        <th>Amount Paid</th>
                    </tr>
                    <tr>
                        <td>Jill</td>
                        <td>Smith</td> 
                        <td>50</td>
                        <td>Smith</td> 
                        <td>50</td>
                        <td>Smith</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                </table>
                </div>
            </div>
        )
    }
}
export default OwnerDashboard;