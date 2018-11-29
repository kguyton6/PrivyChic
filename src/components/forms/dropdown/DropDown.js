import React, {Component} from 'react'
import './dropdown.css'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default class DropDown extends Component {
    constructor(props) {
        super(props)


    }

    
    render(){
        return (
            <div className='dropdown' onClick={this.props.onClose}>
            {this.props.userInfo ?
        <ul className="dropdown-content"  >
    <Link to='/account' className='menu-link' ><li className='menu-link'>My Account</li></Link>
    <Link to='/account/appointments'className='menu-link'><li>My Appointments</li></Link>
    <li onClick={this.props.logout} className='menu-link'>Log Out</li>
  </ul> :

   <ul className="responsive-dropdown-content"  >
  <li className='responsive-menu-link'onClick={this.props.toggleModal}>Login</li>
   <li onClick={this.props.toggleModal}>SignUp</li>
   <Link to='/business' className='responsive-menu-link' ><li  className='responsive-menu-link'>Business</li> </Link>
            </ul> }
            </div> 

    )
    }
}