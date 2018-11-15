import React, {Component} from 'react'
import axios from 'axios'
import './login.css'
import close from '../../assets/close.png'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      login: true,
      signup: false
    }
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }
password(value){
  this.setState({password: value})
}
username(value){
  this.setState({
    username: value
  })
}
signup = () => {
  axios.post('/auth/signup', { username: this.state.username, password: this.state.password })
  .then((res) => {
    if(res.status === 200){
      this.setState({signup: true})
      console.log('Create Success')
    }
  })
}

login(){
  axios.post('/auth/login', { username: this.state.username, password: this.state.password })
  .then((res) => {
    if(res.status === 200){
      return(
        this.props.onClose()
      )
    } else {
      console.log(res)
    }

   
  })
}

handleSignup = () => {
  this.setState({login: false, signup: true})
}

handleLogin = () => {
  this.setState({login: true, signup: false})
}

  render() {
    return (
      <div className='App'>
      <div className='login-modal'>
      <div className='modal'>
      <div className='top-spanActive'>
      <span onClick={this.handleSignup}className='signup'>Sign Up</span>
      <span onClick={this.handleLogin} className='modal-login'>Login</span>   <img src={close} onClick={this.props.onClose} width='5%' height='5%'/> </div>
      {this.state.login === true ? 
      <div className='input-container1'>
      <input placeholder='Email' className='login-input' onChange={(e) => this.username(e.target.value)}/>
      <input placeholder='Password' type='password' className='login-input' onChange={(e) => this.password(e.target.value)}/>
      <span className='forgot-pw'>Forgot your password?</span>
      <button className='login-button'onClick={this.login}>Login</button></div> :
      <div className='input-container1'>
         <input placeholder='First Name' className='signup-input' onChange={(e) => this.username(e.target.value)}/>
      <input placeholder='Last Name'  className='signup-input' onChange={(e) => this.password(e.target.value)}/>
      <input placeholder='Email' className='signup-input' onChange={(e) => this.username(e.target.value)}/>
      <input placeholder='Password' type='password' className='signup-input' onChange={(e) => this.password(e.target.value)}/>
      <button className='login-button'onClick={this.signup}>Sign Up</button> </div>}
      </div> 
   
      </div>
      </div>
    )
  }
}

export default Login
