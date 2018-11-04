import AppActions from "../constant/AppActions";

const initialState = {
    conversations : [],
    selectedConversation :null,
    confirmation:null,
    isAckPositive:null,
    errorMessage:null
}

export default function(state = initialState, action) { 
    switch (action.type) {
        case AppActions.VIEW_CONVERSATION:
            return{...state, selectedConversation:action.payload, isAckPositive: null, confirmation : null}
        case AppActions.SEND_MESSAGE:
            return {...state, isAckPositive: true, confirmation:action.payload}
        case AppActions.FETCH_CONVERSATIONS_SUCCESS:
            return {...state, conversations: action.payload.conversations}
        case AppActions.FETCH_CONVERSATIONS_FAILURE:
            return {...state, errorMessage:action.payload}
        case AppActions.POST_MESSAGE_SUCCESS:
            return {...state, isAckPositive:true, conversations: action.payload.conversations, confirmation:action.payload.confirmation, selectedConversation:action.payload.newSelectConversation }
        case AppActions.POST_MESSAGE_FAILURE:
            return {...state, confirmation:action.payload, isAckPositive:false}
        default:
        return state;
    }
}