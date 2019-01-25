import React from 'react'
import { Button, Collapse, Well, Fade, Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyledWell = styled(Well)`
  color: black;
  font-size: 14px;
  line-height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  a:hover, span:hover {
    font-size: 18px;
    background-color: #F2F5F5;
  }
`
 const Dropdown = styled.div`
 width: 140px;
  height: 250px;
  position: absolute;
  right: 5%;
  top: 32px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  box-shadow: 1px 1px 3px 1px rgba(190, 199, 198);
  text-indent: 25px;
 `

class CustomMenu extends React.Component {

  render() {
    console.log(this.props)
    return this.props.user.email ? (
      <Dropdown>
        <Fade in={this.props.open} >
          <div>
            <StyledWell>
              <Link  to='/'>Home</Link>
              <Link to={`/dashboard/${this.props.user.user_type}/${this.props.user.user_id}`}>Account</Link>
              <span  onClick={this.props.logout}>Log Out</span>
              <Link to='/business'>Business</Link>

            </StyledWell>
          </div>
        </Fade>
        </Dropdown>
    ) : (
      <Dropdown>
      <Fade in={this.props.open} >
      <div>
        <StyledWell >
          <Link to='/'>Home</Link>
          <span onClick={this.props.login}>Login</span>
          <Link to={`/dashboard/${this.props.user.user_type}`}>Business</Link>

        </StyledWell>
      </div>
    </Fade>
    </Dropdown>
    )
  }
}


export default CustomMenu