import React, {Component} from 'react'
import axios from 'axios'
import { addFullName, addEmail } from '../../../../ducks/actions/action_creators';
import {connect} from 'react-redux'
import close from '../../../assets/close.png'


class ForgotPassWord extends Component {
    constructor(props){
        super(props)

        this.state = {
            full_name: '',
            email: '',
            message: ''
        }

    }
            
 sendEmail = (full_name, email ) => {
    axios.post('/sendPassword', email, full_name) 
  .then((res) => {
      console.log('here is the response: ', res);
    })
    .catch((err) => {
      console.error('here is the error: ', err);
    })
   }
    render() {
        const {addFullName, addEmail, onClose} = this.props
        return (

            <div className='form-modal'>
            <form className='modal'>
            <img src={close} className='close' onClick={onClose} width='5%' height='5%' />
            <input onChange={(e) => addFullName(e.target.value)}placeholder='Full Name' className='login-input'/>
            <input onChange={(e) =>  addEmail(e.target.value)}placeholder='Email' className='password-input'/>
            <button onClick={this.sendEmail}>Send</button>
            </form>
            </div>

        )
    }
}
const bindActionCreators = {addFullName, addEmail}
export default connect(bindActionCreators)(ForgotPassWord)