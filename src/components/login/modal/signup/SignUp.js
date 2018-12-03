import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addEmail, addFullName, addPassword} from '../../../../ducks/actions/action_creators'
import close from '../../../assets/close.png'


class SignUp extends Component {
    constructor(props){
        super(props)

        this.state = {
            full_name: '',
            email: '',
            password: ''
        }
    }




    render() {
        return (

          <React.Fragment>
                <div className='top-container'>
                <div className='login-span'>
                <span className='login'>Login</span>
                </div>
                  <div className='signup-span-active'>
                    <span className='signup'>Sign Up</span>
                  </div>
                  <img src={close} className='close' onClick={this.props.onClose} width='5%' height='5%' />
              <div className='signup-container'>
                <input placeholder='Full Name' value={this.props.userInfo.full_name}className='signup-input' onChange={(e) => addFullName(e.target.value)} />
                <input placeholder='Email' value={this.props.userInfo.email}className='signup-input' onChange={(e) => addEmail(e.target.value)} />
                <input placeholder='Password' type='password' className='signup-input' onChange={(e) => addPassword(e.target.value)} />
                <button className='signup-button' onClick={this.props.signup}>Sign Up</button></div>
            </div>

            </React.Fragment>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        email: state.email,
        password: state.password,
        full_name: state.full_name,
        userInfo: state.userInfo
    }
}
const bindActionCreators = {addEmail, addFullName, addPassword}

export default connect(mapStateToProps, bindActionCreators)(SignUp)