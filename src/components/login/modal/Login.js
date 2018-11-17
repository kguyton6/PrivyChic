import React, {Component} from 'react'
import axios from 'axios'
import './login.css'
import close from '../../assets/close.png'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      fullName: '',
      login: true,
      signup: false
    }
  
  }
password = (value) => {
  this.setState({password: value})
}
email = (value) => {
  this.setState({ email: value })
}

first_name = (value) => {
  this.setState({first_name: value})
}

last_name = (value) => {
  this.setState({last_name: value }, () => {
    let concatName = this.state.first_name +  ' ' + this.state.last_name
    this.setState({fullName: concatName})
  }
  )
  console.log(this.state.fullName)
}

signup = () => {
  axios.post('/auth/signup', { 
    first_name: this.state.first_name,
    last_name: this.state.last_name,
    email: this.state.email, 
    password: this.state.password })
  .then((res) => {
    if(res.status === 200){
      
    return (
       this.props.onClose
    )
      
    } else {
      alert('Pick a new username')
    }
  })
}


login = () => {
  axios.post('/auth/login', { email: this.state.email, password: this.state.password })
  .then((res) => {
    if(res.status === 200){
      return(
        this.props.onClose
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
      <span onClick={this.handleLogin} className='modal-login'>Login</span>   <img src={close} onMouseEnter={this.props.onClose} width='5%' height='5%'/> </div>
      {this.state.login === true ? 
      <div className='input-container1'>
      <input placeholder='Email' className='login-input' onChange={(e) => this.email(e.target.value)}/>
      <input placeholder='Password' type='password' className='login-input' onChange={(e) => this.password(e.target.value)}/>
      <span className='forgot-pw'>Forgot your password?</span>
      <button className='login-button' onClick={this.login}>Login</button></div> :
      <div className='input-container1'>
      <div className='name-container'>
         <input placeholder='First Name' className='signup-input' onChange={(e) => this.first_name(e.target.value)}/>
      <input placeholder='Last Name'  className='signup-input' onChange={(e) => this.last_name(e.target.value)}/>
      </div>
      <input placeholder='Email' className='signup-input' onChange={(e) => this.email(e.target.value)}/>
      <input placeholder='Password' type='password' className='signup-input' onChange={(e) => this.password(e.target.value)}/>
      <button className='login-button'onClick={this.signup}>Sign Up</button> </div>}
      </div> 
   
      </div>
      </div>
    )
  }
}

export default Login
