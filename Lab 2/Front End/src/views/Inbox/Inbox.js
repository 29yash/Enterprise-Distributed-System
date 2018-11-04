import React, { Component } from 'react';
import './Inbox.css';
import { Redirect } from 'react-router';
import Navbar from '../Navbar/Navbar';
import AppConstants from '../../constant/AppConstants';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {fetchConversations, viewConversation} from "../../actions/actions_conversations"

class Inbox extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.fetchConversations();
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem(AppConstants.AUTH_TOKEN)) {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div class="container inbox">
                {redirectVar}
                <Navbar theme="light"></Navbar>
                <hr/>
                <div class="row message-list">
                    <h3>Inbox</h3>
                    {this.renderMessage()}
                </div>
            </div>
        );
    }

    renderMessage(){
        let conversations = [];
        let user = JSON.parse(localStorage.getItem(AppConstants.USER_DETAILS));
        let messageString = user.user_role == AppConstants.USER_ROLE_TRAVELLER  ? 'Message From Owner Of ' : 'Message From Traveller For '
        if(this.props.conversations && this.props.conversations.length > 0){
            this.props.conversations.map((conversation, index)=>{
                conversations.push(
                    <div class="message" key={index} onClick={this.viewConversation.bind(this, conversation)}>
                        <h4>{ messageString + conversation.propertyHeadline.substr(0, 40) + "\u2026"}</h4>
                        <h5>{user.user_role == AppConstants.USER_ROLE_TRAVELLER ? conversation.owner : conversation.traveller}</h5>
                    </div>
                );
            });
            return conversations;
        }
        else{
            return (
                <h4>No Messages Yet !</h4>
            );
        }
    }

    viewConversation(conversation){
        this.props.viewConversation(conversation);
    }
}

function mapStateToProps(reduxState) {
    const { conversations } = reduxState.conversations;
    return { conversations };
}
export default connect(mapStateToProps, { fetchConversations, viewConversation })(Inbox);