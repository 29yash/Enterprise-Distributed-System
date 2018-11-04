import React, { Component } from 'react';
import './Conversation.css';
import { Redirect } from 'react-router';
import Navbar from '../Navbar/Navbar';
import AppConstants from '../../constant/AppConstants';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {postMessage} from '../../actions/actions_conversations';
class Conversation extends Component {

    state = {
        message : ''
    }

    constructor(props) {
        super(props);
    }

    renderAcknowledgement() {
        if (this.props.confirmation) {
            return (
                <div class="alert" className={this.props.isAckPositive ? 'alert-success' : 'alert-danger'} role="alert">
                    {this.props.confirmation}
                </div>
            );
        }
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem(AppConstants.AUTH_TOKEN)) {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div class="container conversation">
                {redirectVar}
                <Navbar theme="light"></Navbar>
                <hr/>
                <div class="row title">
                    <h2>{this.props.selectedConversation.propertyHeadline ? this.props.selectedConversation.propertyHeadline  : "" }</h2>
                </div>
                <hr/>
                {this.renderAcknowledgement()}
                <div class= "row input-message">
                    <h3>Send a message to the property owner</h3>
                    <p>Have a question about your upcoming stay? You can message the Property Owner at any time.</p>
                    <textarea rows="6" cols="50" required maxlength="10000" class="form-control" onChange={(event)=>{this.setState({message: event.target.value})}}  
                                name="message"  placeholder="Enter Message"></textarea>
                    <button className='btn btn-primary btn-lg' onClick={this.sendMessage.bind(this)}>Send</button>
                </div>
                <div class="row conversation-list">
                    <h3>Messages</h3>
                    {this.renderMessage()}
                </div>
            </div>
        );
    }

    renderMessage(){
        let conversations = [];
        let user = JSON.parse(localStorage.getItem(AppConstants.USER_DETAILS));
        let fromString = user.user_role == AppConstants.USER_ROLE_TRAVELLER  ? 'From Owner' : 'From Traveller';
        if(this.props.selectedConversation){
            this.props.selectedConversation.messages.slice(0).reverse().map((message, index)=>{
                conversations.push(
                    <div class="message" key={index}>
                    { user.user_email == message.from ?
                        <div class="message-title">
                             <h5>{message.from}</h5>
                             <h4>You</h4>
                        </div>
                        :
                        <div class="message-title">
                            <h4>{fromString}</h4>
                            <h5>{message.from}</h5>
                        </div>
                    }
                        <br/> 
                        <div class="message-body">
                            <p>{message.message}</p>
                        </div>
                    </div>
                );
            });
            return conversations;
        }
    }

    sendMessage(){
        if(!this.state.message.length > 0){
            alert('Message cannot be empty');
        }
        else {
            let user = JSON.parse(localStorage.getItem(AppConstants.USER_DETAILS));
            this.props.postMessage({
                owner: this.props.selectedConversation.owner,
                traveller: this.props.selectedConversation.traveller,
                message: this.state.message,
                from: user.user_email,
                to: user.user_role == AppConstants.USER_ROLE_TRAVELLER  ? this.props.selectedConversation.owner : this.props.selectedConversation.traveller,
                propertyId: this.props.selectedConversation.propertyId,
                propertyHeadline:this.props.selectedConversation.propertyHeadline
            });
            this.setState({modalIsOpen:false});
        }
    }
}

function mapStateToProps(reduxState) {
    const { selectedConversation, confirmation, isAckPositive } = reduxState.conversations;
    return { selectedConversation, confirmation, isAckPositive };
}

export default connect(mapStateToProps, {postMessage})(Conversation);