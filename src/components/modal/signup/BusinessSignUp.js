import React, { Component } from 'react'
import '../login/login.css'
import axios from 'axios'
import close from '../../assets/close.png'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import Business_Form from '../../forms/Business_Form';
import {getUserInfo, addEmail, addFullName} from '../../../ducks/actions/action_creators'
// import bindActionCreators from 'redux'

class BusinessSignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showForm: false,
      showSignup: false,
      showLogin: false,
      password: ''
    }
  }

 
  handlePassword = (value) => {
    this.setState({password: value})
  }

  toggleSignUp = () => {
    this.setState(prevState => {
      return {
        showSignup: !prevState.showSignup
      }
    })
  }

  toggleLogin = () => {
    this.setState(prevState => {
      return {
        showLogin: !prevState.showLogin
      }
    })
  }

  login = () => {
    let { password} = this.state
    axios.post('/auth/login/business', { email: this.props.email, password: password })
      .then((res) => {
        if (res.status === 200) {
          this.props.getUserInfo(res.data)
          return this.props.history.push('/dashboard')
        }  
      })
  }
  signup = () => {
    this.setState({showForm: true})
  }
  modalForms = () => {
    if(this.state.showForm){
      return (
        <Business_Form onClose={this.toggleSignUp}/>
      )
    }
  }
  render() {
    const { addEmail, addFullName, onClose } = this.props
    return (
      <div className='App'>
        {this.props.businessLogin ?
          <div className='login-modal'>
            <div className='modal'>
              <div className='top-container'>
                <div className='signup-span'>
                  <span onClick={this.toggleLogin} className='signup'>Sign Up</span>
                </div>
                <div className='login-span-active'>
                  <span className='login-text'>Login</span>
                </div>
                <img src={close} className='close' onClick={onClose} width='5%' height='5%' /></div>
              <div className='input-container1'>
                <input placeholder='Email' className='login-input' onChange={(e) => addEmail(e.target.value)} />
                <input placeholder='Password' type='password' className='password-input' onChange={(e) => this.handlePassword(e.target.value)} />
                <span className='forgot-pw'>Forgot your password?</span>
                <button className='login-button' onClick={this.login}>Login</button></div>
            </div>
          </div> :
          <div className='login-modal'>
            <div className='modal'>
              <div className='top-container'>
                <div className='signup-span-active'>
                  <span className='signup'>Sign Up</span>
                </div>
                <img src={close} className='close' onClick={onClose} width='5%' height='5%' />
              </div>
              <div className='signup-container'>
                <input placeholder='Full Name' value={this.props.userInfo.full_name}className='signup-input' onChange={(e) => addFullName(e.target.value)} />
                <input placeholder='Email' value={this.props.userInfo.email}className='signup-input' onChange={(e) => addEmail(e.target.value)} />
                <input placeholder='Password' type='password' className='signup-input' onChange={(e) => this.handlePassword(e.target.value)} />
                <button className='signup-button' onClick={this.signup}>Sign Up</button></div>
            </div>
          </div>}
         {this.modalForms()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
    full_name: state.full_name,
    last_name: state.last_name,
    userInfo: state.userInfo,
  }
}



const bindActionCreators = {getUserInfo, addEmail, addFullName}
export default withRouter(connect(mapStateToProps, bindActionCreators)(BusinessSignUp))