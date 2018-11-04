import WebService from "../services/WebService";
import AppConstants from "../constant/AppConstants";
import AppActions from "../constant/AppActions";
import { history } from "../router/history";

export function viewConversation(conversation) {
    return (dispatch) => {
        dispatch(selectConversation(conversation));
        history.push("/conversation");
    }
}

export function fetchConversations() {
    return (dispatch) => {
        WebService.getInstance().getConversations((response) => {
            console.log(response);
            if (response.success) {
                dispatch(fetchConversationSuccess(response));
            }
            else {
                dispatch(fetchConversationFailure(response.message));
            }
        }, (error) => {
            console.log(error);
            dispatch(fetchConversationFailure(error));
        })
    }
}

export function postMessage(messageDetails) {
    return (dispatch) => {
        WebService.getInstance().postQuestion(messageDetails, (response) => {
            console.log(response);
            if (response.success) {
                WebService.getInstance().getConversations((response) => {
                    console.log(response);
                    if (response.success) {
                        let newSelectConversation;
                        response.conversations.map((conv)=>{
                            let ownerCondition = conv.owner == messageDetails.owner;
                            let travellerCondition = conv.traveller == messageDetails.traveller;
                            debugger;
                            let propertyIdCondition = conv.propertyId == messageDetails.propertyId;
                            if(ownerCondition && travellerCondition && propertyIdCondition){
                                newSelectConversation = conv;
                            }
                        }) 
                        dispatch(postMessageSuccess(response, newSelectConversation));
                    }
                }, (error) => {
                    console.log(error);
                    dispatch(postMessageFailure('Error while fetching conversations' + error));
                })
            }
            else {
                dispatch(postMessageFailure(response.message));
            }
        }, (error) => {
            console.log(error);
            dispatch(postMessageFailure(error));
        })
    }
}

const selectConversation = (conversation) => ({
    type: AppActions.VIEW_CONVERSATION,
    payload: conversation
});

const fetchConversationSuccess = (response) => ({
    type: AppActions.FETCH_CONVERSATIONS_SUCCESS,
    payload: response
});

const fetchConversationFailure = (response) => ({
    type: AppActions.FETCH_CONVERSATIONS_FAILURE,
    payload: response
});

const postMessageSuccess = (response, newSelectConversation) => ({
    type: AppActions.POST_MESSAGE_SUCCESS,
    payload: { ...response, newSelectConversation, confirmation: 'Message Sent Successfully' }
});

const postMessageFailure = (response) => ({
    type: AppActions.POST_MESSAGE_FAILURE,
    payload: response
});