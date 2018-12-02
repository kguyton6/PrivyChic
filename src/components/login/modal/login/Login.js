import React, { Component } from 'react'
import axios from 'axios'
import './login.css'
import close from '../../../assets/close.png'
import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux'
import { getUserInfo, addFullName, addEmail, addPassword } from '../../../../ducks/actions/action_creators';
import { withRouter } from 'react-router';
import Business_Form from '../../../forms/Business_Form';
import ForgotPassWord from '../login/ForgotPassWord'


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLogin: true,
      showSignup: false,
      user_id: null,
      email: '',
      password: '',
      full_name: '',
      user_type: '',
      disabled: false
    }

  }

  toggleSignUp = () => {
    this.setState(prevState => {
      return {
        showLogin: !prevState.showLogin

      }
    }
    )
  }

  signup = () => {
      let { full_name, email, password } = this.props
      axios.post('/auth/signup', { full_name, email, password: password })
        .then((res) => {
          if (res.status === 200) {
            this.props.getUserInfo(res.data)
            console.log(this.props.userInfo)
          }
        })
        this.props.onClose()
      }
  
  login = () => {
      let { email, password } = this.props
      axios.post('/auth/login', { email: email, password: password })
        .then((res) => {
          console.log(res.data)
           this.props.getUserInfo(res.data) 
           this.props.onClose()
          })
    }

  callbackForm = () => {
    if (this.state.user_id) {
      return <Business_Form onClose={this.props.onClose} email={this.props.userInfo.email} full_name={this.props.userInfo.full_name} />
    }
  }
  // passwordReset = () => {
  //     this.setState(prevState => {
  //       return {
  //         disabled: !prevState.disabled
  //       }
  //     })
  // }


  handlePassword = (value) => {
    this.setState({password: value})
  }

 
  render() {
 
    // password()
    const { onClose, addEmail, addFullName, addPassword } = this.props
    return (
    // this.state.disabled === true ?
      <div className='App'>
        {this.state.showLogin || this.props.showLogin ?
          <div className='login-modal'>
            <div className='modal'>
                <img src={close} className='close' onClick={onClose} width='5%' height='5%' />
              <div className='top-container'>
                <div className='signup-span'>
                  <span onClick={this.toggleSignUp} className='signup'>Sign Up</span>
                </div>
                <div className='login-span-active'>
                  <span className='login-text'>Login</span>
                </div>
                </div>
              <div className='input-container1'>
                <input placeholder='Email' className='login-input' onChange={(e) => addEmail(e.target.value)} />
                <input placeholder='Password' type='password' className='password-input' onChange={(e) => addPassword(e.target.value)} />
               
                <span className='forgot-pw'>Forgot your password?</span>
                <button className='login-button' onClick={this.login}>Login</button></div>
            </div>
          </div> :
          <div className='login-modal'>
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
                <input placeholder='Full Name' value={this.props.userInfo.full_name}className='signup-input' onChange={(e) => addFullName(e.target.value)} />
                <input placeholder='Email' value={this.props.userInfo.email}className='signup-input' onChange={(e) => addEmail(e.target.value)} />
                <input placeholder='Password' type='password' className='signup-input' onChange={(e) => addPassword(e.target.value)} />
                <button className='signup-button' onClick={this.signup}>Sign Up</button></div>
            </div>


          </div>}

        
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

// const mapDispatchToProps = dispatch => {
//   return {
//     addEmail: email => dispatch({ type: 'ADD_EMAIL', payload: email }),
//     addPassword: password => dispatch({ type: 'ADD_PASSWORD', payload: password }),
//     addFullName: full_name => dispatch({ type: 'ADD_FULLNAME', payload: full_name }),
//     addLastName: last_name => dispatch({ type: 'ADD_LAST_NAME', payload: last_name }),
     
// }
const bindActionCreators = {getUserInfo, addFullName, addEmail, addPassword}
export default withRouter(connect(mapStateToProps, bindActionCreators)(Login))
