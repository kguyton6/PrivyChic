import React, { Component } from 'react'
import close from '../assets/close.png'
import './profile_form.css'
import {connect} from 'react-redux'
import Appointment from './Appointment'
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard'
import {withRouter, Redirect} from 'react-router'

class Profile_Form extends Component {
    constructor(props){
        super(props)

        this.state = {
            appointment: false
    }
}
    delete = () => {
        axios.delete(`/api/delete/business/${this.props.id}`)
        .then((res) => {
            if(res.status === 200){
                this.props.onClose()
            }
        })
    }
        profileSignUp = () => {
           let { profession, first_name, last_name, description, picture} = this.props
            axios.post(`/api/addProfile/${this.props.id}`, {first_name: first_name, last_name: last_name, profession: profession,  about: description, picture: picture })
            .then((res) => {
                console.log(res)
                if(res.status === 200) {
                    this.props.history.push('/dashboard')
                } else {
                   return alert('something went wrong')
                }
            })
    
    }

    render() {
        console.log(this.props)
        const {addFullName, addProfession, addEmail, addDescription, addPicture} = this.props
        return (
            <div className='App'>
                <div className='profile-modal'>
                    <form className='profile'>
                    <div className='profile-header'>
                    <span onClick={this.delete}className='profile-cancel'> {`<< BACK`}</span>
                    <span className='profile-title'>Personal Info</span>
                    <span onClick={this.profileSignUp}className='profile-save'>Save</span>
                    </div>
                               <div className='profile-inputs'>
                                <input placeholder='First Name' className='profile-name' onChange={(e) => addFullName(e.target.value)} />
                                <input placeholder='Last Name' className='profile-name' onChange={(e) => addFullName(e.target.value)} />
                                <input className='profession' placeholder='My Profession' onChange={(e) => addProfession(e.target.value)}/>
                               
                                <textarea placeholder='About Me' className='about-input' onChange={(e) => addDescription(e.target.value)} />
                                <input placeholder='Add Email' value={this.props.email}className='email-input' onChange={(e) => addEmail(e.target.value)} />
                                <input placeholder='Picture URL' className='website-input' onChange={(e) => addPicture(e.target.value)} />
                            </div>
                    </form>
            </div>

            </div >

        )
    }
}

export function mapStateToProps(state){
    const {business_name, phone, city, State, address, zipcode, full_name, first_name, last_name, email, description} = state
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
        full_name


    }
}

const mapDispatchToProps = dispatch => {
    return {
        addFullName: full_name => dispatch ({type: 'ADD_FULLNAME', payload: full_name }),
        addProfession: profession => dispatch ({type: 'ADD_PROFESSION', payload: profession }),
        addDescription: description => dispatch({type: 'ADD_DESCRIPTION', payload: description}),
        addEmail: email => dispatch({type: 'ADD_EMAIL', payload: email}),
        addPicture: picture => dispatch({type: 'ADD_PICTURE', payload: picture}),

   
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile_Form))

