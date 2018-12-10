import { gql } from 'apollo-boost';
const Mutations = {
    LOGIN: gql`mutation login($username: String, $password: String){
                login(username: $username, password: $password){
                    user_email, user_first_name, user_last_name, user_aboutme, 
                    user_gender, user_phone_number, user_languages, message              
                    user_city, user_company, user_school, user_hometown,user_role, token, success
                }
            }`,
    SIGN_UP: gql`mutation signUp($email: String, $password: String, $firstName: String, $lastName: String, $role: String){
                signUp(email: $email, password: $password, firstName: $firstName, lastName: $lastName, role: $role){
                    message, success
                }
            }`

};

export default Mutations;