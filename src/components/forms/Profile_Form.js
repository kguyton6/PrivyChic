import React, { Component } from 'react'
import close from '../assets/close.png'
import './profile_form.css'
import {connect} from 'react-redux'
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard'
import {withRouter } from 'react-router'
import {getUserInfo, addPicture,addDescription, addProfession } from '../../ducks/actions/action_creators'

class Profile_Form extends Component {
    constructor(props){
        super(props)

        this.state = {
            appointment: false,
            payment: false,
            first_name: '',
            last_name: '',
            description: '',
            profession: '',
            image: ''
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
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
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
                                <input placeholder='First Name' 
                                name='first_name'
                                 onChange={this.handleChange} />
                                <input 
                                name='last_name'
                                placeholder='Last Name' 
                                 onChange={this.handleChange} />
                                <input 
                                name='profession'
                                placeholder='My Profession' 
                                onChange={this.handleChange}/>
                               
                                <textarea placeholder='About Me' className='about-input' name='description' onChange={this.handleChange} />
                                <input 
                                name='email'
                                    placeholder='Add Email' 
                                 value={this.props.email}
                                 onChange={this.handleChange} />
                                <input 
                                placeholder='Picture URL' 
                                name='image'
                                onChange={this.handleChange}/>
                                <span className='accept-payment'>Accept Online Payments <input type='checkbox' onChange={this.handleCheckBox}/></span>
                            </div>
                    </form>
            </div>

            </div >

        )
    }
}

export function mapStateToProps(state){
    const {user} = state
    return { user }
}




export default withRouter(connect(mapStateToProps )(Profile_Form))

