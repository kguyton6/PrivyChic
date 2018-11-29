import React, { Component } from 'react'
import close from '../assets/close.png'
import './form.css'
import { connect } from 'react-redux'
import Profile_Form from './Profile_Form';
import {addAddress, addBusinessName, addCity, addPhone, addPortfolio, addState, addZip} from '../../ducks/actions/action_creators'
import { Route, Link } from 'react-router-dom'
import axios from 'axios';

class Business_Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profileForm: false
        }
    }

    toggleModal = () => {
        this.setState(prevState => {
            return {
                profileForm: !prevState.profileForm
            }
        })
    }
    showProfileForm = () => {
        if (this.state.profileForm) {
            return (
                <Profile_Form onClose={this.toggleModal} id={this.props.id} />

            )
        }
    }
    
    delete = () => {
        axios.delete(`/api/delete/${this.props.id}`)
        .then((res) => {
            if(res.status === 200){
                this.props.onClose()
            }
        })
    }
//     businessSignup = () => {
//         const {full_name, email, password, business_name, phone, address, city, State, zipcode, portfolio, profession, first_name, last_name, description, picture } = this.props  
        
//         axios.post(`/auth/signup/business`, {
//             full_name: full_name, email: email, password: password, business_name: business_name, phone_number: phone, streetaddress: address,  city: city, state: State, zipcode: zipcode, portfolio: portfolio })
//             .then((res) => {
//                 if(res.status === 200) {
//                     this.props.history.push('/dashboard')
//                } else {
//                    console.log(res.statusText)
//              }
             
//     })
// }

    render() {
        const { addAddress, addZip, addBusinessName, addCity, addPhone, addState, addPortfolio } = this.props
        return (
            <div className='App'>
                <div className='form-modal'>
                    <form className='form'>
                        <div className='form-header'>
                            <span onClick={this.props.onClose} className='form-cancel'>CANCEL</span>
                            <span className='form-title'>Add Business Info</span>
                            <span onClick={this.toggleModal} className='form-save'>Save</span>

                        </div>

                        {this.showProfileForm()}
                        <div className='form-input-container1'>

                            <div className='business-inputs'>
                                <input placeholder='Business Name' className='business-name' onChange={(e) => addBusinessName(e.target.value)} />
                                <input className='phone' placeholder='Business Phone Number' onChange={(e) => addPhone(e.target.value)} />
                                <input className='portfolio' placeholder='Picture Of Your Work' onChange={(e) => addPortfolio(e.target.value)}/>
                                <span className='business-location'>Business Location</span>
                                <input placeholder='Business Address' className='business-address' onChange={(e) => addAddress(e.target.value)} />
                                <input placeholder='City' className='city-input' onChange={(e) => addCity(e.target.value)} />
                                <input placeholder='State' className='state-input' onChange={(e) => addState(e.target.value)} />
                                <input placeholder='Zip Code' className='zip-input' onChange={(e) => addZip(e.target.value)} />
                            </div>
                        </div>
                    </form>
                </div>
            </div >

        )
    }
}

export function mapStateToProps(state) {
    const { business_name, phone, address, city, State, zipcode, description } = state
    return {
        business_name,
        phone,
        address,
        city,
        State,
        zipcode,
        description


    }
}

const bindActionCreators = {addAddress, addBusinessName, addCity, addPhone, addPortfolio, addState, addZip, addPortfolio}
export default connect(mapStateToProps, bindActionCreators)(Business_Form)

