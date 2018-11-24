import React, { Component } from 'react'
import './login.css'
import axios from 'axios'
import close from '../../assets/close.png'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class BusinessSignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            business: false
        }
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
      let {email, password} = this.props
      axios.post('/auth/business/login', {email: email, password: password})
      .then((res) => {
        if(res.status === 200){
          this.props.onClose()
        }
      })
    }
    signup = () => {
        let { first_name, last_name, email, password } = this.props
        axios.post('/auth/business/signup', {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password
        })
          .then((res) => {
            if (res.status === 200) {
                this.props.onClose()
            } else {
              alert('Pick a new username')
            }
          })
      }
      render() {
        const { addEmail, addPassword, addFullName, addLastName, onClose } = this.props
        return (
          <div className='App'>
              <div className='login-modal'>
                <div className='modal'>
                  <div className='top-container'>
                    <div className='signup-span'>
                      <span onClick={this.toggleSignUp} className='signup'>Sign Up</span>
                    </div>
                    <div className='login-span-active'>
                      <span className='login-text'>Login</span>
                    </div>
                    <img src={close} className='close' onClick={onClose} width='5%' height='5%' /></div>
                  <div className='input-container1'>
                    <input placeholder='Email' className='login-input' onChange={(e) => addEmail(e.target.value)} />
                    <input placeholder='Password' type='password' className='password-input' onChange={(e) => addPassword(e.target.value)} />
                    <span className='forgot-pw'>Forgot your password?</span>
                    <button className='login-button' onClick={this.login}>Login</button></div>
                </div>
              </div> 
              {/* <div className='login-modal'>
                <div className='modal'>
                  {this.props.showLogin ?
                    <div className='top-container'>
                      <div className='signup-span-active'>
                        <span className='signup'>Sign Up</span>
                      </div>
                      <div className='login-span'>
                        <span onClick={this.toggleSignUp} className='login-text'>Login</span>
                      </div>
                      <img src={close} className='close' onClick={onClose} width='5%' height='5%' />
    
                    </div> :
                    <div className='top-container'>
                      <div className='signup-span-active'>
                        <span className='signup'>Sign Up</span>
                      </div>
                      <img src={close} className='close' onClick={onClose} width='5%' height='5%' />
    
                    </div>}
    
                  <div className='signup-container'>
                    <input placeholder='Full Name' className='signup-input' onChange={(e) => addFullName(e.target.value)} />
                    <input placeholder='Email' className='signup-input' onChange={(e) => addEmail(e.target.value)} />
                    <input placeholder='Password' type='password' className='signup-input' onChange={(e) => addPassword(e.target.value)} />
                    <button className='signup-button' onClick={this.signup}>Sign Up</button></div>
                </div>
    
    
              </div>} */}

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
        user: state.user,
      }
    }
    
    const mapDispatchToProps = dispatch => {
      return {
        addEmail: email => dispatch({ type: 'ADD_EMAIL', payload: email }),
        addPassword: password => dispatch({ type: 'ADD_PASSWORD', payload: password }),
        addFullName: full_name => dispatch({ type: 'ADD_FULLNAME', payload: full_name }),
        addLastName: last_name => dispatch({ type: 'ADD_LAST_NAME', payload: last_name }),
        getUserInfo: userInfo => dispatch({ type: 'GET_USER', payload: userInfo })
      }
    }
    
    
    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BusinessSignUp))