import React, {Component} from 'react';
import './PostProperty.css';
import {Redirect} from 'react-router';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import FileDrop from 'react-file-drop';
import { connect } from "react-redux";
import AppActions from '../../constant/AppActions';
import AppConstants from '../../constant/AppConstants';
import {postPropertyPicture, inputChange, postProperty} from '../../actions/actions_post_property';

class PostProperty extends Component{

    validViews = [1];
    state = {
        currentViewIndex : 1,
    }

    constructor(props){
        super(props);
    }

    render(){
        let redirectVar = null;
        if(!localStorage.getItem(AppConstants.AUTH_TOKEN)){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div class="container-fluid post-property">
                {redirectVar}
                <Navbar  theme="light"></Navbar>
                <div class="row">
                    <div class="col-lg-3 master">
                        <ul class="nav nav-pills nav-stacked">
                            <li class={this.state.currentViewIndex == 1 ? "active": ""} onClick={this.setCurrentViewIndex.bind(this, 1)}><a>Location</a></li>
                            <li class={this.state.currentViewIndex == 2 ? "active": ""} onClick={this.setCurrentViewIndex.bind(this, 2)}><a>Details</a></li>
                            <li class={this.state.currentViewIndex == 3 ? "active": ""} onClick={this.setCurrentViewIndex.bind(this, 3)}><a>Booking Options</a></li>
                            <li class={this.state.currentViewIndex == 4 ? "active": ""} onClick={this.setCurrentViewIndex.bind(this, 4)}><a>Photos</a></li>
                            <li class={this.state.currentViewIndex == 5 ? "active": ""} onClick={this.setCurrentViewIndex.bind(this, 5)}><a>Availability</a></li>
                            <li class={this.state.currentViewIndex == 6 ? "active": ""} onClick={this.setCurrentViewIndex.bind(this, 6)}><a>Pricing</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-9 detail">
                        {this.renderError()}
                        <div class="panel-container">
                            {this.getCurrentDetailView()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderError(){
        if(this.props.erroMessage){
            return(
                <div class="alert alert-danger" role="alert">
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    setCurrentViewIndex(index){
        if(this.isDetailViewValid(index)){
            this.setState({currentViewIndex : index});
        }
    }

    isDetailViewValid(index){
       return this.validViews.indexOf(index) > -1;
    }

    updateCurrentView(event, from){    
        if(event){
            event.preventDefault();
        }    
        let viewIndex = this.state.currentViewIndex;
        if(from == 'back'){
            if(viewIndex > 1)
                viewIndex = viewIndex - 1;
        }
        else{
            if(viewIndex < 6){
                viewIndex = viewIndex + 1
                if(!this.isDetailViewValid(viewIndex)){
                    this.validViews.push(viewIndex)
                }
            }
        }
        this.setState({currentViewIndex:viewIndex})
    }

    getCurrentDetailView(){
        switch (this.state.currentViewIndex) {
            case 1:
                return this.renderLocation();
            break;
            case 2:
                return this.renderDetails();
            break;
            case 3:
                return this.renderBookingOptions();
            break;
            case 4:
                return this.renderPhotos(); 
            break;
            case 5:
                return this.renderAvailability();
            break;
            case 6:
                return this.renderPricing();
            break;
        }
    }

    onChange = (event) => {
        this.props.inputChange({[event.target.name]: event.target.value});
    }

    renderPager(){
        return(
            <div class="pager">
                <button class={this.state.currentViewIndex == 1 ? "btn btn-light disabled": "btn btn-light"} onClick={this.updateCurrentView.bind(this, null, 'back')}>Previous</button>
                {
                    this.state.currentViewIndex == 6 ? 
                    <button class="btn btn-danger" onClick={this.postProperty.bind(this)}> Post Property</button>
                    :
                    <button class="btn btn-primary" type="submit">Next</button>
                }
            </div>
        );
    }

    renderLocation(){
        return(
            <div class="location">
                <h3>Location of your rental</h3>
                <hr/>
                <form onSubmit={this.updateCurrentView.bind(this)}>
                    <div class="form-group-md">
                        <label>Country<span> *</span></label>
                        <input type="text" required class="form-control" onChange={this.onChange} name="country" value={this.props.country} placeholder="Country"/>
                    </div>
                    <div class="form-group-md">
                        <label>Street Address<span> *</span></label>
                        <input type="text" required class="form-control" onChange={this.onChange} name="street" value={this.props.street} placeholder="Street Address"/>
                    </div>
                    <div class="form-group-md">
                        <label>Unit, Suite, Building, etc<span> *</span></label>
                        <input type="text" required class="form-control" onChange={this.onChange} name="unit" value={this.props.unit} placeholder="Unit, Suite, Building, etc"/>
                    </div>
                    <div class="form-group-md">
                        <label>City<span> *</span></label>
                        <input type="text" required class="form-control" onChange={this.onChange} name="city" value={this.props.city} placeholder="City"/>
                    </div>
                    <div class="horizontal-group">
                        <div class="form-group-md">
                            <label>State<span> *</span></label>
                            <input type="text" required class="form-control" onChange={this.onChange} name="state" value={this.props.state} placeholder="State"/>
                        </div>
                        <div class="form-group-md">
                            <label>Zipcode<span> *</span></label>
                            <input type="text" required pattern='^\d{5}(?:[-\s]\d{4})?$' class="form-control" onChange={this.onChange} name="zip" value={this.props.zip} placeholder="XXXXX"/>
                        </div>
                    </div>
                    <hr/>
                    {this.renderPager()}
                </form>
            </div>
        );
    }

    renderDetails(){
        return(
            <div class="details">
                <h3>Describe your property</h3>
                <hr/>
                <div class="linear">
                    Start out with a descriptive headline and a detailed summary of your property.
                </div>
                <form onSubmit={this.updateCurrentView.bind(this)}>
                    <div class="form-group-md">
                        <label>Headline <span> *</span></label>
                        <input type="text" required class="form-control" maxlength="80" onChange={this.onChange} name="headline" value={this.props.headline}  placeholder="Headline"/>
                    </div>
                    <div class="form-group-md">
                        <label>Property description <span> *</span></label>
                        <textarea rows="4" cols="50" required maxlength="10000" class="form-control" onChange={this.onChange} name="description" value={this.props.description} placeholder="Property description"></textarea>
                    </div>
                    <div class="horizontal-group">
                        <div class="form-group-md">
                            <label>Property Type <span> *</span></label>
                            <select class="form-control" name="type" value={this.props.type} onChange={this.onChange}>
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                                <option value="Resort">Resort</option>
                                <option value="Cottage">Cottage</option>
                                <option value="Castle">Castle</option>
                                <option value="Boat">Boat</option>
                            </select>
                        </div>
                        <div class="form-group-md">
                            <label>Accommodates <span> *</span></label>
                            <input type="number" required min="1" class="form-control" onChange={this.onChange} name="guests" value={this.props.guests}  placeholder="Accommodates"/>
                        </div>
                    </div>
                    <div class="horizontal-group">
                        <div class="form-group-md">
                            <label>Bedrooms <span> *</span></label>
                            <input type="number" required min="1" class="form-control" onChange={this.onChange} name="bedrooms" value={this.props.bedrooms}  placeholder="Bedrooms"/>
                        </div>
                        <div class="form-group-md">
                            <label>Bathrooms <span> *</span></label>
                            <input type="number" required min="1" class="form-control" onChange={this.onChange} name="bathroom" value={this.props.bathroom}  placeholder="Bathrooms"/>
                        </div>
                    </div>
                    <hr/>
                    {this.renderPager()}
                </form>
            </div>
        );
    }


    renderBookingOptions(){
        return(
            <div class="booking-option">
                <h3>Booking Options</h3>
                <hr/>
                <div class="linear">
                    Select a Booking Method
                </div>
                <hr/>
                <form onSubmit={this.updateCurrentView.bind(this)}>
                    <div class="form-group-md">
                        <h4><input type="radio" name="bookingOption" value="instant" onChange={this.onChange} checked={this.props.bookingOption === 'instant'}/> Instant Booking</h4>
                        <p>
                            Automatically accept booking requests from all travelers for dates you have available, 
                            and add the bookings to your calendar.
                        </p>
                    </div>
                    <div class="form-group-md">
                        <h4><input type="radio" name="bookingOption" value="24hour" onChange={this.onChange} checked={this.props.bookingOption === '24hour'}/> 24-hour review</h4>
                        <p>
                            Allow 24 hours to communicate with guests and accept booking requests.
                        </p>
                    </div>
                    <hr/>
                    {this.renderPager()}
                </form>
            </div>
        );
    }

    renderPhotos(){
        return(
            <div class="photos">
                <h3>Add upto 5 photos of your property</h3>
                <hr/>
                <div class="linear">
                    Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 2 photos minimum.
                </div>
                <hr/>
                <form onSubmit={this.checkPhotoValidation.bind(this)}>
                    <div class="file-drop-container">
                        <FileDrop onDrop={this.handleDropFile}>
                            <h3>Drop photos here</h3>
                            <h3>or</h3>
                            <div class = "selectButton">
                                <label for="propertyPicture">SELECT PHOTOS TO UPLOAD</label>
                                <input type='file' id="propertyPicture" name="propertyPicture" onChange={this.handleSelectFile} accept=".png, .jpg, .jpeg" multiple/>
                            </div>
                        </FileDrop>
                        <div class='upload-images'>
                            {this.showUploadImages()}
                        </div>
                        <hr/>
                        {this.renderPager()}
                    </div>
                </form>
            </div>
        );
    }

    handleDropFile = (files) => {
        this.uploadPropertyPicture(files);
    }

    handleSelectFile = (event) => {
        this.uploadPropertyPicture(event.target.files);
    }    

    uploadPropertyPicture(propertyPictures){ 
        if(((this.props.propertyPictures.length) + (propertyPictures.length)) < 6){
            let formData = new FormData();
            for (let index = 0; index < propertyPictures.length; index++) {
                formData.append('propertyPicture' + index, propertyPictures[index]);
            }
            this.props.postPropertyPicture(formData);
        }
        else{
            alert('You can post upto 5 Property Pictures');
        }

    }

    showUploadImages(){
        let images = []
        console.log(this.props.propertyPictures);
        
        if(this.props.propertyPictures && this.props.propertyPictures.length > 0){
            this.props.propertyPictures.map((img, i)=>{
                images.push(
                    <img index={i} src={img} height="100" width="200"/>
                );
            });
        }
        return images;
    }

    checkPhotoValidation(event){
        console.log(this.props.propertyPictures.length);
        if(2 <= this.props.propertyPictures.length){
            this.updateCurrentView(event);
        }
        else{
            alert("Please upload atleast 2 pictures");
            event.preventDefault();
        }
    }

    renderAvailability(){
        return(
            <div class="pricing">
                <h3>Already know when you would like your property to be available?</h3>
                <hr/>
                <div class="linear">
                    <p>Select a starting point for setting up your availability.</p>
                    <p>Full calendar availability</p>
                    <p>Block out certain dates</p>
                </div>
                <hr/>
                <form onSubmit={this.updateCurrentView.bind(this)}>
                    <div class="horizontal-group">
                        <div class="form-group-md">
                            <label>Blocked From <span> *</span></label>
                            <input type="date" required class="form-control" name="startDate" value={this.props.startDate} onChange={this.onChange} max={this.props.endDate} placeholder="Blocked From"/>
                        </div>
                        <div class="form-group-md">
                            <label>Blocked Till <span> *</span></label>
                            <input type="date"  required class="form-control" name="endDate" value={this.props.endDate} onChange={this.onChange} min={this.props.startDate} placeholder="Nights"/>
                        </div>
                    </div>
                    <hr/>
                    {this.renderPager()}
                </form>
            </div>
        );
    }

    renderPricing(){
        return(
            <div class="pricing">
                <h3>How much do you want to charge?</h3>
                <hr/>
                <div class="linear">
                    We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.
                </div>
                <hr/>
                <form onSubmit={this.updateCurrentView.bind(this)}>
                    <div class="form-group-md">
                        <label>Nightly Base Rate <span> *</span></label>
                        <input type="number" min="0" required class="form-control" name="singleNightRate" onChange={this.onChange}  placeholder="In Dollars $"/>
                    </div>
                    <div class="form-group-md">
                        <label>Minimum Stay <span> *</span></label>
                        <input type="number" min="1" required class="form-control" name="minStay" onChange={this.onChange} placeholder="Nights"/>
                    </div>
                    <hr/>
                    {this.renderPager()}
                </form>
            </div>
        );
    }

    postProperty(){
        const { country, street, unit, city, state, zip, headline, description, type, bedrooms, bathroom, guests,
            bookingOption, singleNightRate, minStay, startDate, endDate, propertyPictures } = this.props;
            
        this.props.postProperty({country, street, unit, city, state, zip, headline, description, type, bedrooms, 
            bathroom, guests,bookingOption, singleNightRate, minStay, startDate, endDate, propertyPictures});
    }

}

function mapStateToProps(reduxState) {
    console.log(reduxState);
    
    const { country, street, unit, city, state, zip, headline, description, type, bedrooms, bathroom, guests,
        bookingOption, singleNightRate, minStay, startDate, endDate, propertyPictures, message, loading  } = reduxState.postProperty;
    return { country, street, unit, city, state, zip, headline, description, type, bedrooms, bathroom, guests,
        bookingOption, singleNightRate, minStay, startDate, endDate, propertyPictures, message, loading };
}

export default connect(mapStateToProps, {postPropertyPicture, inputChange, postProperty})(PostProperty);