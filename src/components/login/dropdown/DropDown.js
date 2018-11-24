import React, {Component} from 'react'
import './dropdown.css'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default class DropDownMenu extends Component {
    constructor(props) {
        super(props)


    }
    
    
    render(){
    return (
        <div className='dropdown'>
        <ul className="dropdown-content"  >
    <Link to='/account' className='menu-link' ><li className='menu-link'>My Account</li></Link>
    <Link to='/account/appointments'className='menu-link'><li>My Appointments</li></Link>
    <li onClick={() => this.props.logout()} className='menu-link'>Log Out</li>
  </ul> 
  </div>

    )
    }
}