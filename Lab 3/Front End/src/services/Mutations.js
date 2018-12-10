import { gql } from 'apollo-boost';
const Mutations = {
    LOGIN: gql`mutation login($username: String, $password: String){
                login(username: $username, password: $password){
                    user_email, user_first_name, user_last_name, 
                    message, user_role, token, success
                }
            }`,
    SIGN_UP: gql`mutation signUp($email: String, $password: String, $firstName: String, $lastName: String, $role: String){
                signUp(email: $email, password: $password, firstName: $firstName, lastName: $lastName, role: $role){
                    message, success
                }
            }`,
    EDIT_USER_PROFILE: gql`mutation editUserProfile(
                $user_first_name: String, $user_last_name:  String, $user_aboutme: String,
                $user_gender: String, $user_phone_number: String, $user_languages: String,
                $user_city: String, $user_company: String, $user_school: String,$user_hometown: String ){
                    editUserProfile( user_first_name: $user_first_name, user_last_name: $user_last_name, user_aboutme: $user_aboutme,
                    user_gender: $user_gender, user_phone_number: $user_phone_number, user_languages: $user_languages,
                    user_city: $user_city, user_company: $user_company, user_school: $user_school, user_hometown: $user_hometown)
                    { 
                        success, message
                    }
                }`,
    BOOKING : gql`mutation booking($propertyId: String, $arrivalDate: String, $departureDate: String, $guests: String, $amount: Int){
                booking(propertyId: $propertyId, arrivalDate: $arrivalDate, departureDate: $departureDate, guests: $guests, amount: $amount){
                    message, success
                }
            }`

};

export default Mutations;