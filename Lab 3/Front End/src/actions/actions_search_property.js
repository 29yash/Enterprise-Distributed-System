import GraphQLService from "../services/GraphQLService";
import AppConstants from "../constant/AppConstants";
import AppActions from "../constant/AppActions";
import { history } from "../router/history";


export function inputChange(inputValues){
    return(dispatch)=>{
        dispatch(searchInputChange(inputValues));
    }
}

export function searchProperty(searchParams, isFromHome = false){
    return(dispatch)=>{
        GraphQLService.getInstance().searchProperty(searchParams, (response)=>{
            if (response.success) {
                console.log(response);
                dispatch(searchPropertySuccess(response.properties));
                if(isFromHome){
                    history.push('/searchProperty');
                }
            }
            else{
                dispatch(searchPropertyFailure(response.message));
            }
        },(error)=>{
            console.log(error);
            dispatch(searchPropertyFailure(error));
        })
    }
}

const searchPropertySuccess = (properties) => ({
    type: AppActions.SEARCH_PROPERTY_SUCCESS,
    payload: {properties}
});

const searchPropertyFailure = (error) => ({
    type: AppActions.SEARCH_PROPERTY_FAILURE,
    payload: {error}
});

const searchInputChange = (inputValues)=>({
    type: AppActions.SEARCH_PROPERTY_INPUT_CHANGE , 
    payload : inputValues
});
