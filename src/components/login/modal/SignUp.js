import React, { Component } from 'react'
// import logo from '../assets/privy6.png'
import './setup.css'
import axios from 'axios'
import close from '../../assets/close.png'
import Form from '../../business/Form'

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            business: false
        }
    }

    clientSignup = () => {
        let { first_name, last_name, email, password } = this.props
        axios.post('/auth/client/signup', {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password
        })
          .then((res) => {
            if (res.status === 200) {
    
              return (
                this.props.onClose
              )
    
            } else {
              alert('Pick a new username')
            }
          })
      }
    render(){
        return(
            <div></div>
        )
    }
    }

    export default SignUp