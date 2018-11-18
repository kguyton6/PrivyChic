import React, { Component } from 'react'
import close from '../assets/close.png'
import './profile_form.css'
import {connect} from 'react-redux'


class Appointment extends Component {
    constructor(props){
        super(props)
    }
   

    render() {
        console.log(this.props)
        const {addName, addProfession, addEmail,addDescription, addWebsite} = this.props
        return (
            <div className='App'>
                <div className='profile-modal'>
                    <form className='profile'>
                    <div className='profile-header'>
                    <span onClick={this.props.onClose} className='profile-cancel'> {`<< BACK`}</span>
                    <span className='profile-title'>Online Booking</span>
                    <span onClick={this.saveProfile}className='profile-save'>Save</span>

                    </div>
                        {/* <img className='x-close' src={close} onClick={this.props.onClose} width='15px' height='15px' /> */}

                
                            <div className='profile-inputs'>
                                 <label>Online Booking</label>
                                <input  className='booking' type='checkbox' />
                                <label><span>REQUIRE CLIENTS TO PROVIDE CREDIT CARD TO BOOK
</span><div className=''>No</div></label>
<label><div></div></label>
                               <label><input type='checkbox'/></label>
                               <label><input type='checkbox'/></label>
                               <label><input /></label>
                                <label><input /></label>
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
    const {name, profession, description, email, website} = state
    return {
       name,
        profession, 
        description,
        email,
        website,



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

export default connect(mapStateToProps, mapDispatchToProps)(Appointment)

