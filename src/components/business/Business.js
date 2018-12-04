import React, { Component } from 'react'
import businessLogo from '../assets/Artboard3.png'
import './business.css'
import { Link } from 'react-router-dom'
import BusinessSignUp from '../login/modal/business/BusinessSignUp'
import menu from '../assets/menu.png'
import search from '../assets/search.png'
import Login from '../login/modal/login/Login'
import bell from '../assets/bell.png'
import down from '../assets/down-arrow.png'
import axios from 'axios';
import { getUserInfo } from '../../ducks/actions/action_creators'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import CustomMenu from '../dropdown/CustomMenu'


const businessWell = {
    position: 'absolute',
    width: '150px',
    height: '90px',
    left: '5%',
    zIndex: '10',
    fontSize: '10px',
    top: '5%',
    fontWeight: 'bold',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'rgba(226, 226, 226, 0.918)',
    display: 'flex',
    bordeRadius: '3px',
    overflowWrap: 'break-word',
    boxShadow: 'rgba(128, 128, 128, 0.431)',
    cursor: 'pointer',
}
const businessMenu = {
    cursor: 'pointer',
    color: 'rgb(56, 56, 56)',
    fontSize: '18px',
    textAlign: 'left',
    letterSpacing: '1px',
    textIndent: '5px',
    display: 'flex'
}
const buttonStyle = {
    width: '60px'
}
class Business extends Component {
    constructor(props) {
        super(props)

        this.state = {
            businessSignUp: false,
            businessLogin: false,
            showLogin: false,
            open: false
        }

    }

    componentDidMount = () => {
        axios.get('/checkSession')
            .then((res) => {
                this.props.getUserInfo(res.data)
                console.log(this.props.getUserInfo.full_name)
            })
    }

    toggleSignUp = () => {
        this.setState(prevState => {
            return {
                businessSignUp: !prevState.businessSignUp
            }
        })
    }
    toggleLogin = () => {
        this.setState(prevState => {
            return {
                businessLogin: !prevState.businessLogin
            }
        })
    }

    showModal = () => {
        if (this.state.businessSignUp) {
            return (
                <BusinessSignUp onClose={this.toggleSignUp} signup={this.state.businessSignUp} />
            )
        } else if (this.state.businessLogin) {
            return (
                <BusinessSignUp onClose={this.toggleLogin} businessLogin={this.state.businessLogin} />
            )
        }

    }
    menu = () => {
        this.setState(prevState => {
            return {
                open: !prevState.open
            }
        })
    }

    logout = () => {
        axios.get('/api/logout')
        .then((res) => {
        if (res.status === 200) {
            return (
              this.menu()
  
            )
        }
    })
}
    dropdown = () => {
        if (this.state.open) {
            return (
                <CustomMenu login={this.toggleLogin} open={this.menu}logout={this.logout} />
            )
        }
    }
    showLoginModal = () => {
        if (this.state.showLoginModal) {
          return (
            <Login onClose={this.toggleLogin} showLogin={this.state.showLoginModal} />
          )
        } else if (this.state.showSignUp) {
          return (
            <Login showSignUp={this.toggleSignUp} />
          )
        }
      }

    render() {

        return (
            <div className='App'>

                <div className='responsive-header'>
                    <Button style={buttonStyle} onClick={this.menu}><img src={menu} className='business-menu' width='40px' />
                        {this.dropdown()} </Button>


                    <span className='business-title'>PrivyChic</span>
                    <Link to='search' className='search-icon-link'><img src={search} width='100%' className='business-search-icon' /></Link>
                    <Link to='/' className='business-logo-link'><img src={businessLogo} alt='logo' className='business-logo' width='190px' height='70px' /></Link>
                    {this.props.userInfo.user_type === 'client' ?
                        <nav className='business-nav'>
                            <span className='profile-menu-name'>{`Hi ${this.props.userInfo.full_name},`} Start Growing Your business Today -----></span>
                            <span onClick={this.toggleSignUp} className='business-nav-links'>Sign Up</span>
                            <span className='business-nav-links'>Pricing</span>
                            <span className='business-nav-links'>Blog</span>
                            <span onClick={this.logout} className='business-nav-links'>Logout</span>
                            <div className='icons-container'>
                                <img className='bell' src={bell} width='30px' height='30px' />
                                <div className='nav-dropdown' >
                                    <img onClick={this.toggleMenu} src={down} className='down-arrow' width='15px' />
                                </div>
                            </div></nav> :
                        <nav className='business-nav'>
                            <span className='business-nav-links'>Pricing</span>
                            <span className='business-nav-links'>Blog</span>
                            <span onClick={this.toggleLogin} className='business-nav-links'>Login</span>
                            <span onClick={this.toggleSignUp} className='business-nav-links'>Sign Up</span>
                            <span onClick={this.logout} className='business-nav-links'>Logout</span>
                        </nav>}

                </div>
                {this.showModal()}
                {this.showLoginModal()}
                <div className='top-business-box'>
                    <div className='business-left-box'>
                        Be Independent. <br />
                        Invest in Yourself.<br />
                        Trust PrivyChic with the rest.
<span className='small-text'>#1 Appointment booking and online scheduling software for independent professionals.</span>
                        <button onClick={this.toggleSignUp} className='left-box-button'>Try It Now</button>
                        <span className='trial-text'>30 day free trial, no card required</span>
                    </div>
                </div>
                <div className='business-main-box'>

                    <div className='main-title'>
                        <span className='bold-text1'>Why PrivyChic?</span>
                        <span className='bold-text2'>Get the freedom to do what you love</span>
                    </div>
                    <div className='boxes'>
                        <div className='outer-box'><span className='box1'>1</span>
                            <span className='box-title'>Get Online</span>
                            <p className='paragraph'>
                                Set up your professional website and let clients know you're available to be booked online. Include your services, business hours and photo gallery.</p>
                        </div>
                        <div className='outer-box'><span className='box1'>2</span>
                            <span className='box-title'>Get Organized</span>
                            <p className='paragraph'>
                                Manage your schedule and client notes. Appointment reminders are sent automatically.</p>
                        </div>
                        <div className='outer-box'><span className='box1'>3</span>
                            <span className='box-title'>Get Booked</span>
                            <p className='paragraph'>
                                Use your new VIP link to promote yourself online through social media, email marketing or by running a promotion. Make it easy for clients to find and book you.</p>
                        </div>
                        <div className='outer-box'><span className='box1'>4</span>

                            <span className='box-title'>Get Paid</span>
                            <p className='paragraph'>
                                Instantly accept credit card payments or set up a no-show late cancellation policy. Get next day payouts directly to your bank account.</p>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { userInfo } = state
    return {
        userInfo
    }
}

const bindActionCreators = { getUserInfo }
export default connect(mapStateToProps, bindActionCreators)(Business)