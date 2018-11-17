import React, {Component} from 'react'
import './dropdown.css'
import {Link} from 'react-router-dom'

export default class DropDownMenu extends Component {
    constructor(props) {
        super(props)


    }
    render(){
    return (

        <ul id="dropdown-content" onMouseLeave={this.props.onClose} >
    <Link to='/account' className='menu-link' ><li className='menu-link'>My Account</li></Link>
    <Link to='/account/appointments'className='menu-link'><li className='menu-link' >My Appointments</li></Link>
    <a href='http://localhost:4000/api/logout'className='menu-link'><li className='menu-link'>Log Out</li></a>
  </ul> 

    )
    }
}