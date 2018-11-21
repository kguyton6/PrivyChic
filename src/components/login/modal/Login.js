import React, { Component } from 'react'
import axios from 'axios'
import './login.css'
import close from '../../assets/close.png'
import {connect} from 'react-redux'
import { addEmail, addPassword, addFirstName, addLastName } from '../../../ducks/reducer';
import SignUp from './SignUp'
import Home from '../Home'
import {Route} from 'react-router-dom'


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLogin: true,
      showSignup: false
    }

  }

  toggleSignUp = () => {
    this.setState( prevState => {
      return {
      showSignup: !prevState.showSignup }
    })  
      
  }
  

  // showSignupModal = () => {
  //   const { addFirstName, addLastName, addEmail, addPassword, onClose } = this.props
  //     return (
       
  //     )
  //   }
  

  signup = () => {
    let { first_name, last_name, email, password } = this.props
    axios.post('/auth/signup', { first_name: first_name, last_name: last_name, email: email, password: password })
      .then((res) => {
        if (res.status === 200) {
            return this.toggleModal
          
        } else {
          console.log(res)
        }


      })
  }


  login = ( ) => {
    let { email, password } = this.props
    axios.post('/auth/login', { email: email, password: password })
      .then((res) => {
        if(res.status === 200) {
           return ( 
             this.context.history.push('/')
           )
        
        }
      })

  }

  

  render() {
    const {addEmail, addPassword, onClose } = this.props
    return (
      <div className='App'>
      { this.state.showLogin ?
        <div className='login-modal'>
          <div className='modal'>
          <div className='top-container'>
            <div  className='signup-span'>
              <span onClick={this.toggleSignUp} className='signup'>Sign Up</span>
              </div>
              <div className='login-span-active'>
              <span className='login-text'>Login</span>   
              </div>
              <img src={close} className='close'onClick={onClose} width='5%' height='5%' /></div>
              <div className='input-container1'>
                <input placeholder='Email' className='login-input' onChange={(e) => addEmail(e.target.value)} />
                <input placeholder='Password' type='password' className='password-input' onChange={(e) => addPassword(e.target.value)} />
                <span className='forgot-pw'>Forgot your password?</span>
                <button className='login-button' onClick={() => this.login(this.props.email, this.props.password)}>Login</button></div> 
          </div> 
          </div> :
          <div className='login-modal'>
        <div className='modal'>
        <div className='top-container'>
          <div className='signup-span-active'>
            <span  className='signup'>Sign Up</span>
            </div>
            <div className='login-span'>
            <span onClick={this.toggleSignUp} className='login-text'>Login</span>   
            </div>
            <img src={close} className='close'onClick={onClose} width='5%' height='5%' /></div>
            <div className='input-container1'>

              <input placeholder='First Name' className='login-input' onChange={(e) => addFirstName(e.target.value)} />

              <input placeholder='Last Name' className='login-input' onChange={(e) => addLastName(e.target.value)} />
              <input placeholder='Email' className='login-input' onChange={(e) => addEmail(e.target.value)} />
              <input placeholder='Password' type='password' className='password-input' onChange={(e) => addPassword(e.target.value)} />
              <span className='forgot-pw'>Forgot your password?</span>
              <button className='login-button' onClick={this.signup}>Sign Up</button></div> 
        </div>  
  

      </div>   }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
    first_name: state.first_name,
    last_name: state.last_name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addEmail: email => dispatch({ type: 'ADD_EMAIL', payload: email }),
    addPassword: password => dispatch({ type: 'ADD_PASSWORD', payload: password }),
    addFirstName: first_name => dispatch ({type: 'ADD_FIRST_NAME', payload: first_name}),
    addLastName: last_name => dispatch ({type: 'ADD_LAST_NAME', payload: last_name})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
