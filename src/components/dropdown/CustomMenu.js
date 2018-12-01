import React from 'react'
import {Button, Collapse, Well, Fade, Navbar, Nav, MenuItem, NavDropdown, NavItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './dropdown.css'

// const wellStyle = {
//   position: 'absolute',
//   width: '150px',
//    height: '90px',
//   left: '5%',
//   zIndex: '10',
//   fontSize: '10px',
//   top: '10%',
//   fontWeight: 'bold',
//   justifyContent: 'space-evenly',
//    flexDirection: 'column',
//   backgroundColor: 'rgba(226, 226, 226, 0.918)',
//   display: 'flex',
//   bordeRadius: '3px',
// overflowWrap: 'break-word',
//   boxShadow: 'rgba(128, 128, 128, 0.431)',
//   cursor: 'pointer'
// }
// const menuStyle = {
//   cursor: 'pointer',
//   color: 'rgb(56, 56, 56)',
//   fontSize: '18px',
//   textAlign: 'left',
//   letterSpacing: '1px',
//   textIndent: '5px'
// }

export default class CustomMenu extends React.Component {


render () {
 return (
<Fade in={this.props.open} >
<div>
    <Well className='width' style={this.props.wellStyle}>
    <span style={this.props.menuStyle} onClick={this.props.login}>Login</span>
  <Link to='/business'><span style={this.props.menuStyle}>Business</span></Link>  
    <Link to='/'><span style={this.props.menuStyle}>Home</span></Link>
    
    </Well>
    </div>
</Fade>
  
)
}
}