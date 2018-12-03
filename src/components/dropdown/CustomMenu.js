import React from 'react'
import { Button, Collapse, Well, Fade, Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './dropdown.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { addPicture, getUserInfo } from '../../ducks/actions/action_creators';


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

class CustomMenu extends React.Component {


  componentDidMount = () => {
    axios.get('/checkSession')
      .then((res) => {
        this.props.getUserInfo(res.data)
      })
  }

 
  showUserMenu = () => {
    if (this.props.userInfo) {
      return (
        <Fade in={this.props.open} >
          <div>
            <Well className='width' >
              <span id='login' onClick={this.props.logout}>Log Out</span>
              <Link id='business' to='/business'>Business</Link>
              <Link id='account'to={`/dashboard/${this.props.userInfo.user_type}/${this.props.userInfo.user_id}`}>Account</Link>
              <Link id='home' to='/'>Home</Link>

            </Well>
          </div>
        </Fade>
      )
    }
  }

  showMenu = () => {
    return (
      <Fade in={this.props.open} >
        <div>
          <Well className='width' >
            <span id='login'  onClick={this.props.login}>Login</span>
            <Link id='business'to='/business'>Business</Link>
            <Link id='home' to='/'>Home</Link>

          </Well>
        </div>
      </Fade>
    )
  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        {this.props.userInfo ?
          this.showUserMenu() :
          this.showMenu()}
      </React.Fragment>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}
const bindActionCreators = { getUserInfo }
export default connect(mapStateToProps, bindActionCreators)(CustomMenu)