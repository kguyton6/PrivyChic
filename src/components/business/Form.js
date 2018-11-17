import React, { Component } from 'react'
import close from '../assets/close.png'
import './form.css'
class Form extends Component {




    render() {
        return (
            <div className='App'>
                <div className='form-modal'>
                    <form className='form'>
                    <div className='form-header'>
                    <span onClick={this.props.onClose}className='form-cancel'>CANCEL</span>
                    <span className='form-title'>Business Info</span>
                    <span className='form-save'>Save</span>

                    </div>
                        {/* <img className='x-close' src={close} onClick={this.props.onClose} width='15px' height='15px' /> */}
                        <div className='form-input-container1'>
                            <div className='form-login-inputs'>
                                <input placeholder='Email' className='email-input' onChange={(e) => this.email(e.target.value)} />
                                <input placeholder='Password' type='password' className='password-input' onChange={(e) => this.password(e.target.value)} />
                            </div>
                            <div className='business-inputs'>
                                <input placeholder='Business Name' className='business-name' onChange={(e) => this.email(e.target.value)} />
                                <input placeholder='Business Address' className='business-address' onChange={(e) => this.email(e.target.value)} />
                                <input placeholder='City' className='city-input' onChange={(e) => this.email(e.target.value)} />
                                <input placeholder='State' className='state-input' onChange={(e) => this.email(e.target.value)} />
                                <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} />
                            </div>
                            <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} />
                        <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} />
                        <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} />
                        <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} />
                        <textarea placeholder='Description' className='description' onChange={(e) => this.email(e.target.value)} />
                        <span className='form-forgot-pw'>Forgot your password?</span>
                        <button className='form-login-button' onClick={this.login}>Sign Up</button>
                        </div>

                    </form>
            </div>

            </div >

        )
    }
}


export default Form


// import React, {Component} from 'react'
// import axios from 'axios'
// import './login.css'
// import close from '../../assets/close.png'
// import {Link} from 'react-router-dom'

// class Login extends Component {
//   constructor(props){
//     super(props)

//     this.state = {
//       email: '',
//       password: '',
//       first_name: '',
//       last_name: '',
//       fullName: '',
//       login: true,
//       signup: false
//     }

//   }
// password = (value) => {
//   this.setState({password: value})
// }
// email = (value) => {
//   this.setState({ email: value })
// }

// first_name = (value) => {
//   this.setState({first_name: value})
// }

// last_name = (value) => {
//   this.setState({last_name: value }, () => {
//     let concatName = this.state.first_name +  ' ' + this.state.last_name
//     this.setState({fullName: concatName})
//   }
//   )
//   console.log(this.state.fullName)
// }

// signup = () => {
//   axios.post('/auth/signup', { 
//     first_name: this.state.first_name,
//     last_name: this.state.last_name,
//     email: this.state.email, 
//     password: this.state.password })
//   .then((res) => {
//     if(res.status === 200){

//     return (
//        this.props.onClose
//     )

//     } else {
//       alert('Pick a new username')
//     }
//   })
// }


// login = () => {
//   axios.post('/auth/login', { email: this.state.email, password: this.state.password })
//   .then((res) => {
//     if(res.status === 200){
//       return(
//         this.props.onClose
//       )
//     } else {
//       console.log(res)
//     }


//   })
// }

// handleSignup = () => {
//   this.setState({login: false, signup: true})
// }

// handleLogin = () => {
//   this.setState({login: true, signup: false})
// }

//   render() {
//     return (
//       <div className='App'>
//       <div className='login-modal'>
//       <div className='modal'>
//       <div className='top-spanActive'>
//       <span onClick={this.handleSignup}className='signup'>Sign Up</span>
//       <span onClick={this.handleLogin} className='modal-login'>Login</span>   <img src={close} onMouseEnter={this.props.onClose} width='5%' height='5%'/> </div>
//       {this.state.login === true ? 
//       <div className='input-container1'>
//       <input placeholder='Email' className='login-input' onChange={(e) => this.email(e.target.value)}/>
//       <input placeholder='Password' type='password' className='login-input' onChange={(e) => this.password(e.target.value)}/>
//       <span className='forgot-pw'>Forgot your password?</span>
//       <button className='login-button' onClick={this.login}>Login</button></div> :
//       <div className='input-container1'>
//       <div className='name-container'>
//          <input placeholder='First Name' className='signup-input' onChange={(e) => this.first_name(e.target.value)}/>
//       <input placeholder='Last Name'  className='signup-input' onChange={(e) => this.last_name(e.target.value)}/>
//       </div>
//       <input placeholder='Email' className='signup-input' onChange={(e) => this.email(e.target.value)}/>
//       <input placeholder='Password' type='password' className='signup-input' onChange={(e) => this.password(e.target.value)}/>
//       <button className='login-button'onClick={this.signup}>Sign Up</button> </div>}
//       </div> 

//       </div>
//       </div>
//     )
//   }
// }

// export default Login
