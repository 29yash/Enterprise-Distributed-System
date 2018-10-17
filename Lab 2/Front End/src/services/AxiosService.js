import axios from 'axios';
import URI from "../constant/uri";

class AxiosService {
    constructor() {}

    api = axios.create({
        baseURL: URI.BASE_URL,
        timeout: 10000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    async postCall(path, details, success, failure, isAuthorized = false) {
        // if (isAuthorized) {
            // sentHeaders.Authorization = 'Bearer ' + this.userDetails.token;
            let config = {withCredentials : true};
            try{
                const response = await this.api.post(path, details, config);
                success(this.handleResponse(response));
            }
            catch(err){
                console.error(err);    
                failure(this.handleError(err));            
            }
        // }
        // else{

        // }
    }

    async getCall(path, success, failure, isAuthorized = false) {
        // if (isAuthorized) {
            // sentHeaders.Authorization = 'Bearer ' + this.userDetails.token;
            let config = {withCredentials : true};
            try{
                const response = await this.api.get(path, config);
                success(this.handleResponse(response));
            }
            catch(err){
                console.error(err);    
                failure(this.handleError(err));            
            }
        // }
        // else{

        // }
    }

    handleResponse(response){
        if(response.data){
            return response.data;
        }
        return response;
    }

    handleError(error){
        if (error.status === 401) {
            // auto logout if 401 response returned from api
        }
        if(error.response){
            const errorMessage = (error.response.data && error.response.data.message) || error.message;
            return errorMessage;   
        }    

        return error.message;
    }
}
export default AxiosService;






