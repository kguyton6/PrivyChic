import React, { Component } from 'react'
import axios from 'axios'
import './login.css'
import close from '../../assets/close.png'
import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux'
import { getUserInfo, addFullName, addEmail, addPassword } from '../../../ducks/actions/action_creators';
import { withRouter } from 'react-router';
import styled from 'styled-components'
import Button from '../../buttons/Button'
import Input from '../../Input'

const Modal = styled.div `
width: 350px;
height: 400px;
background-color: white;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
justify-content: space-between;
position: relative;
`
const Container = styled.div `
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.671);
    min-width: 100vw;
    min-height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    

`

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLogin: true,
      name: '',
      user_id: null,
      email: '',
      password: '',
      full_name: '',
      user_type: '',
      disabled: true
    }

  }

  // signup = () => {
  //     let { full_name, email, password } = this.props
  //     axios.post('/auth/signup', { full_name, email, password: password })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           this.props.getUserInfo(res.data)
  //           console.log(this.props.userInfo)
  //         }
  //       })
  //       this.props.onClose()
  //     }
  
  // login = () => {
  //     let { email, password } = this.props
  //     axios.post('/auth/login', { email: email, password: password })
  //       .then((res) => {
  //         console.log(res.data)
  //          this.props.getUserInfo(res.data) 
  //          this.props.onClose()
  //         })
  //   }

  handleInput = (event) => {
    let name = event.target.name
    this.setState({
      [name]: event.target.name
    })
  }
  

 
  render() {
    const { onClose, addEmail, addFullName, addPassword } = this.props
    return (
      <Container>
          <Modal>
            
                <div className='top-container'>
                  <span 
                  onClick={() => this.setState({disabled: false})} 
                  style={{ color: this.state.disabled ? 'grey' : 'blue'}}>Sign Up</span>
                  <span 
                  onClick={() => this.setState({disabled: true})}
                 style={{ color: this.state.disabled ? 'blue' : 'grey'}} >Login</span>
                </div>
                <img className='xIcon' src={close} onClick={onClose} width='15px' height='15px' alt=''/>
              <div >
              {!this.state.disabled ?
                 <Input placeholder='Full Name' type='text' image='none' onChange={(e) => addFullName(e.target.value)} /> : null }
                <Input placeholder='Email' type='text'  image='none'  onChange={(e) => addEmail(e.target.value)} />
              <Input placeholder='Password'  image='none' type='password' onChange={this.handleInput} /> 
               
                <span className='forgot-pw'>Forgot your password?</span>
                <Button width='100%' onClick={this.props.login}>{this.state.disabled ? 'Login' : 'Sign Up'}</Button></div>    
          </Modal>
        </Container>

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
