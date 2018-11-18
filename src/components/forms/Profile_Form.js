import React, { Component } from 'react'
import close from '../assets/close.png'
import './profile_form.css'
import {connect} from 'react-redux'
import Appointment from './Appointment'

class Profile_Form extends Component {
    constructor(props){
        super(props)

        this.state = {
            appointment: false
    }
}

    toggleModal = () => {
        this.setState(prevState => {
            return {
                appointment: !prevState.appointment
            }
        })
    }

    showAppointment = () => {
        if(this.state.appointment) {
        return (
            <Appointment onClose={this.toggleModal} props={this.props}/>
        )
    }
}

    render() {
        console.log(this.props)
        const {addName, addProfession, addEmail,addDescription, addWebsite} = this.props
        return (
            <div className='App'>
                <div className='profile-modal'>
                    <form className='profile'>
                    <div className='profile-header'>
                    <span onClick={this.props.onClose}className='profile-cancel'> {`<< BACK`}</span>
                    <span className='profile-title'>Personal Info</span>
                    <span onClick={this.toggleModal}className='profile-save'>Next</span>

                    </div>
                        {/* <img className='x-close' src={close} onClick={this.props.onClose} width='15px' height='15px' /> */}

                    {this.showAppointment()}
                            <div className='profile-inputs'>
                                <input placeholder='My Name' className='profile-name' onChange={(e) => addName(e.target.value)} />
                                <input className='profession' placeholder='My Profession' onChange={(e) => addProfession(e.target.value)}/>
                               
                                <textarea placeholder='About Me' className='about-input' onChange={(e) => addDescription(e.target.value)} />
                                <input placeholder='Add Email' className='email-input' onChange={(e) => addEmail(e.target.value)} />
                                <input placeholder='Add Website' className='website-input' onChange={(e) => addWebsite(e.target.value)} />
                            </div>
                            {/* <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} />
                        <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} /> */}
                        {/* <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} />
                        <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} /> */}
                        {/* <textarea placeholder='Description' className='description' onChange={(e) => this.email(e.target.value)} /> */}
                        {/* <span className='profile-forgot-pw'>Forgot your password?</span>
                        <button className='profile-login-button' onClick={this.login}>Sign Up</button> */}


                    </form>
            </div>

            </div >

        )
    }
}

export function mapStateToProps(state){
    const {business_name, city, State, address, zip} = state
    return {
       business_name,
        address, 
        city,
        State,
        zip,



    }
}

const mapDispatchToProps = dispatch => {
    return {
        addName: name => dispatch ({type: 'ADD_NAME', payload: name }),
        addProfession: profession => dispatch ({type: 'ADD_PROFESSION', payload: profession }),
        addDescription: description => dispatch({type: 'ADD_DESCRIPTION', payload: description}),
        addEmail: email => dispatch({type: 'ADD_EMAIL', payload: email}),
        addWebsite: website => dispatch({type: 'ADD_WEBSITE', payload: website}),

   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile_Form)

