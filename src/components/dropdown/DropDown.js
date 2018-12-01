import React from 'react'
import {Button, Collapse, Well, Fade, Navbar, Nav, MenuItem, NavDropdown, NavItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './dropdown.css'
export default class CustomMenu extends React.Component {


render () {
 return (
<Fade in={this.props.open} >
<div>
    <Well className='width1'>
    <span className='menu-well1'>Login</span>
  <Link to='/business'><span className='menu-well1'>Business</span></Link>  
    <Link to='/'><span className='menu-well1'>Home</span></Link>
    
    </Well>
    </div>
</Fade>
  
)
}
}