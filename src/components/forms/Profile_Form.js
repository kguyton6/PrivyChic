import React, { Component } from 'react'
import close from '../assets/close.png'
import './profile_form.css'
import {connect} from 'react-redux'
import Appointment from './Appointment'
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard'

class Profile_Form extends Component {
    constructor(props){
        super(props)

        this.state = {
            appointment: false
    }
}

    businessSignUp = () => {
        const {business_name, address, city, State, zip, profession, name, phone, description, picture} = this.props
        axios.post('/api/business/signup', {business_name: business_name, phone: phone,address: address, city: city, State:State, zip: zip, })
        .then(() => {
            axios.post('/api/addProfile', {name: name, profession: profession,  description: description, picture: picture })
            .then((res) => {
                if(res.status === 200) {
                    return (
                        <Dashboard props={this.props}/>
                    )
                } else {
                    alert('something went wrong')
                }
            })
        })
    }

    // toggleModal = () => {
    //     this.setState(prevState => {
    //         return {
    //             appointment: !prevState.appointment
    //         }
    //     })
    // }

//     showAppointment = () => {
//         if(this.state.appointment) {
//         return (
//             <Appointment onClose={this.toggleModal} props={this.props}/>
//         )
//     }
// }

    render() {
        console.log(this.props)
        const {addName, addProfession, addEmail,addDescription, addWebsite, addPicture} = this.props
        return (
            <div className='App'>
                <div className='profile-modal'>
                    <form className='profile'>
                    <div className='profile-header'>
                    <span onClick={this.props.onClose}className='profile-cancel'> {`<< BACK`}</span>
                    <span className='profile-title'>Personal Info</span>
                    <span onClick={this.businessSignUp}className='profile-save'>Save</span>

                    </div>
                        {/* <img className='x-close' src={close} onClick={this.props.onClose} width='15px' height='15px' /> */}


                            <div className='profile-inputs'>
                                <input placeholder='My Name' className='profile-name' onChange={(e) => addName(e.target.value)} />
                                <input className='profession' placeholder='My Profession' onChange={(e) => addProfession(e.target.value)}/>
                               
                                <textarea placeholder='About Me' className='about-input' onChange={(e) => addDescription(e.target.value)} />
                                <input placeholder='Add Email' className='email-input' onChange={(e) => addEmail(e.target.value)} />
                                <input placeholder='Picture URL' className='website-input' onChange={(e) => addPicture(e.target.value)} />
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
    const {business_name, phone, city, State, address, zip} = state
    return {
       business_name,
       phone,
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
        addPicture: picture => dispatch({type: 'ADD_PICTURE', payload: picture}),

   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile_Form)

