import React from 'react'
import {Button, Collapse, Well, Fade, Navbar, Nav, MenuItem, NavDropdown, NavItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './dropdown.css'
export default class CustomMenu extends React.Component {


render () {
 return (
<Fade in={this.props.open} >
<div>
    <Well className='width'>
    <span id='login' onClick={this.props.login}>Login</span>
  <Link to='/business'><span id='business'>Business</span></Link>  
    <Link to='/'><span id='home'>Home</span></Link>
    
    </Well>
    </div>
</Fade>
  
)
}
}