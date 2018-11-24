import React, { Component } from 'react'
import close from '../assets/close.png'
import './form.css'
import { connect } from 'react-redux'
import Profile_Form from './Profile_Form';
// import {ADD_BUSINESS_NAME, ADD_ADDRESS, ADD_PHONE, ADD_CITY, ADD_ADDRESS, ADD_STATE, ADD_ZIP} from '../../ducks/reducer'
import { Route, Link } from 'react-router-dom'
import { runInThisContext } from 'vm';
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
    businessSignUp = () => {
        const {business_name, phone, address, city, State, zipcode } = this.props   
        axios.post(`/api/signup/business/${this.props.id}`, {business_name: business_name, phone_number: phone, streetaddress: address, state: State, zipcode: zipcode, city: city,  })
        .then((res) => {
            if(res.status === 200){
                return (
                    this.toggleModal()
                )
            } else {
                alert(res.statusText)
            }
        })
    }
    delete = () => {
        axios.delete(`/api/delete/${this.props.id}`)
        .then((res) => {
            if(res.status === 200){
                this.props.onClose()
            }
        })
    }

    render() {
        const { addAddress, addZip, addBusinessName, addCity, addPhone, addState } = this.props
        return (
            <div className='App'>
                <div className='form-modal'>
                    <form className='form'>
                        <div className='form-header'>
                            <span onClick={this.delete} className='form-cancel'>CANCEL</span>
                            <span className='form-title'>Add Business Info</span>
                            <span onClick={this.businessSignUp} className='form-save'>Next</span>

                        </div>

                        {this.showProfileForm()}
                        <div className='form-input-container1'>

                            <div className='business-inputs'>
                                <input placeholder='Business Name' className='business-name' onChange={(e) => addBusinessName(e.target.value)} />
                                <input className='phone' placeholder='Phone Number on Profile' onChange={(e) => addPhone(e.target.value)} />
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
const mapDispatchToProps = dispatch => {
    return {
        addBusinessName: business_name => dispatch({ type: 'ADD_BUSINESS_NAME', payload: business_name }),
        addPhone: phone => dispatch({ type: 'ADD_PHONE', payload: phone }),
        addAddress: address => dispatch({ type: 'ADD_ADDRESS', payload: address }),
        addCity: city => dispatch({ type: 'ADD_CITY', payload: city }),
        addState: State => dispatch({ type: 'ADD_STATE', payload: State }),
        addZip: zipcode => dispatch({ type: 'ADD_ZIP', payload: zipcode }),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Business_Form)

