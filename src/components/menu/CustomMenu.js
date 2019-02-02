import React from 'react'
import { Button, Collapse, Well, Fade, Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyledWell = styled(Well)`
  color: black;
  font-size: 17px;
  line-height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  a:hover, span:hover {
    font-size: 20px;
    background-color: #F2F5F5;
  }
`
 const Dropdown = styled.div`
 width: 120px;
  height: auto;
  position: absolute;
  right: 6%;
  top: 50px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  box-shadow: 1px 1px 3px 1px rgba(190, 199, 198);
  text-indent: 25px;
  z-index: 50;
  color: black;
  @media (max-width: 900px){
    top: 60px;
    right: 7%;
  }
 `

class CustomMenu extends React.Component {

  render() {
    console.log(this.props)
    return this.props.user.email ? (
      <Dropdown>
        <Fade in={this.props.open} >
          <div>
            <StyledWell onClick={this.props.toggleMenu}>
              <Link to='/' style={{color: 'black'}}>Home</Link>
              <Link to={`/dashboard/${this.props.user.user_type}/${this.props.user.user_id}`} style={{color: 'black'}}>Account</Link>
              <span  onClick={this.props.logout} style={{color: 'black'}}>Log Out</span>
              <Link to='/business'style={{color: 'black'}} >Business</Link>

            </StyledWell>
          </div>
        </Fade>
        </Dropdown>
    ) : (
      <Dropdown>
      <Fade in={this.props.open} >
      <div>
        <StyledWell >
          <Link to='/' style={{color: 'black'}}>Home</Link>
          <span onClick={this.props.login} style={{color: 'black'}}>Login</span>
          <Link to={`/dashboard/${this.props.user.user_type}`} style={{color: 'black'}}>Business</Link>

        </StyledWell>
      </div>
    </Fade>
    </Dropdown>
    )
  }
}


export default CustomMenu