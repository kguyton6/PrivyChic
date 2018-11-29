import React, { Component } from 'react'
import close from '../assets/close.png'
import './profile_form.css'
import {connect} from 'react-redux'
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard'
import {withRouter, Redirect} from 'react-router'
import {getUserInfo, addFirstName, addLastName, addEmail, addFullName, addPicture,addDescription, addProfession } from '../../ducks/actions/action_creators'

class Profile_Form extends Component {
    constructor(props){
        super(props)

        this.state = {
            appointment: false,
            payment: false
    }
}


    delete = () => {
        axios.delete(`/api/delete/business`)
        .then((res) => {
            if(res.status === 200){
                this.props.onClose()
            }
        })
    }
    businessSignUp = () => {
        const {full_name, email, password, business_name, phone, address, city, State, zipcode, portfolio, profession, first_name, last_name, description, picture } = this.props  
        
        axios.post(`/auth/signup/business`, {
            full_name: full_name, email: email, password: password, business_name: business_name, phone_number: phone, streetaddress: address,  city: city, state: State, zipcode: zipcode, portfolio: portfolio, first_name: first_name, last_name: last_name, profession: profession, about: description, picture: picture, accept_payment: this.state.payment  })
            .then((res) => {
                if(res.status === 200) {
                    this.props.history.push('/dashboard')
               } else {
                   console.log(res.statusText)
               }
            })
    }
    handleCheckBox = () => {
        this.setState({payment: true})
    }
    render() {
        console.log(this.props)
        const {addFirstName, addLastName, addProfession, addEmail, addDescription, addPicture} = this.props
        return (
            <div className='App'>
                <div className='profile-modal'>
                    <form className='profile'>
                    <div className='profile-header'>
                    <span onClick={this.props.onClose}className='profile-cancel'> {`<< BACK`}</span>
                    <span className='profile-title'>Personal Info</span>
                    <span onClick={this.businessSignUp}className='profile-save'>Save</span>
                    </div>
                               <div className='profile-inputs'>
                                <input placeholder='First Name' className='profile-name' onChange={(e) => addFirstName(e.target.value)} />
                                <input placeholder='Last Name' className='profile-name' onChange={(e) => addLastName(e.target.value)} />
                                <input className='profession' placeholder='My Profession' onChange={(e) => addProfession(e.target.value)}/>
                               
                                <textarea placeholder='About Me' className='about-input' onChange={(e) => addDescription(e.target.value)} />
                                <input placeholder='Add Email' value={this.props.email}className='email-input' onChange={(e) => addEmail(e.target.value)} />
                                <input placeholder='Picture URL' className='website-input' onChange={(e) => addPicture(e.target.value)} />
                                <span className='accept-payment'>Accept Online Payments <input type='checkbox' onChange={this.handleCheckBox}/></span>
                            </div>
                    </form>
            </div>

            </div >

        )
    }
}

export function mapStateToProps(state){
    const {business_name, phone, city, State, address, zipcode, full_name, first_name, last_name, email, description, userInfo} = state
    return {
       business_name,
       phone,
        address, 
        city,
        State,
        zipcode,
        first_name, 
        last_name, 
        email,
        description,
        full_name,
        userInfo


    }
}


const bindActionCreators = {addFullName, addDescription, addLastName, addFirstName, addPicture, addProfession, addEmail, getUserInfo}

export default withRouter(connect(mapStateToProps, bindActionCreators)(Profile_Form))

