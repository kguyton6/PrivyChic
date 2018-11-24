import React, { Component } from 'react'
import axios from 'axios'
import './login.css'
import close from '../../assets/close.png'
import { connect } from 'react-redux'
import { addFirstName, addLastName } from '../../../ducks/actions/action_creators';
import SignUp from './BusinessSignUp'
import Home from '../Home'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router';
import Business_Form from '../../forms/Business_Form';


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLogin: true,
      showSignup: false,
      user_id: null
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
    if (this.props.business) {
      let { full_name, email, password } = this.props
      axios.post('/auth/signup', { full_name: full_name, email: email, password: password })
        .then(() => {
          axios.get('/api/getuser')
            .then((res) => {
              this.setState({ user_id: res.data[0].user_id })
            })
        })
    } else {
      let { full_name, email, password } = this.props
      axios.post('/auth/signup', { full_name, email: email, password: password })
        .then((res) => {
          if (res.status === 200) {
            this.props.getUser()
          }
        })
    }
    this.props.onClose()
  }
  login = () => {
    if (this.props.businessLogin) {
      axios.post('/auth/login/business', { email: this.props.email, password: this.props.password })
      .then((res) => {
        if(res.status === 200){
          this.props.history.push('/dashboard')
        }
      })
    } else if(this.props.showLogin) {
      let { email, password } = this.props
      axios.post('/auth/login', { email: email, password: password })
        .then((res) => {
          if (res.status === 200) {
            this.props.getUser() 
          }
        })
    }
  }

  callbackForm = () => {
    if (this.state.user_id) {
      return <Business_Form onClose={this.props.onClose} id={this.state.user_id} />
    }
  }


  render() {
    const { addEmail, addPassword, addFullName, addLastName, onClose } = this.props
    return (
      <div className='App'>
        {this.state.showLogin === true && this.props.showLogin ?
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
                <button className='login-button' onClick={() => this.login(this.props.email, this.props.password)}>Login</button></div>
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
                <input placeholder='Full Name' className='signup-input' onChange={(e) => addFullName(e.target.value)} />
                <input placeholder='Email' className='signup-input' onChange={(e) => addEmail(e.target.value)} />
                <input placeholder='Password' type='password' className='signup-input' onChange={(e) => addPassword(e.target.value)} />
                <button className='signup-button' onClick={this.signup}>Sign Up</button></div>
            </div>


          </div>}
        {this.callbackForm()}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
