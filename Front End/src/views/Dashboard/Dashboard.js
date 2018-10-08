import React, {Component} from 'react';
import './Dashboard.css';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

class Dashboard extends Component{

    state= {
        bookings : []
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        axios.get('http://localhost:8080/bookingHistory',{withCredentials : true})
            .then((response) => {
                if(response.data.success){
                    console.log(response.data.bookings);
                    this.setState({bookings: response.data.bookings});
                }
                else{

                }
            })
            .catch((error) =>{
                console.log(error);
                if(error.response.status == 401){
                    this.props.history.push('/');
                }
            });
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
                <table>
                    <tr>
                        <th>Booking ID</th>
                        <th>Property ID</th> 
                        <th>Arrival</th>
                        <th>Departure</th>
                        <th>No. Of Guests</th>
                        <th>Amount Paid</th>
                    </tr>
                    {
                        this.state.bookings.length > 0 ?
                            this.state.bookings.map((booking, index)=>{
                                let rows = [];
                                let arrival = new Date(booking.startDate);
                                let depart = new Date(booking.endDate)
                                rows.push(
                                    <tr id={index}>
                                        <td>{booking.bookingId}</td>
                                        <td>{booking.propertyId}</td> 
                                        <td>{arrival.getFullYear() + '-'+eval(arrival.getMonth()+1)+ '-' +arrival.getDate()}</td>
                                        <td>{depart.getFullYear() + '-'+eval(depart.getMonth()+1)+ '-' +depart.getDate()}</td>
                                        <td>{booking.guests}</td>
                                        <td>{booking.amount}</td>
                                </tr>
                                );
                                return rows;
                            })
                        :
                        <h3>There are no bookings made yet</h3>
                    }
                </table>
                </div>
            </div>
        )
    }
}
export default Dashboard;