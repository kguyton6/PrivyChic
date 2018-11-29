import React, { Component } from 'react';
import './home.css';
import logo from '../assets/privy3.svg'
import icon from '../assets/icon.svg'
import location from '../assets/location.png'
import { Link, NavLink, Route} from 'react-router-dom'
import {withRouter} from 'react-router'
import axios from 'axios'
import { connect } from 'react-redux'
import bell from '../assets/bell.png'
import Login from './modal/login/Login'
import down from '../assets/down-arrow.png'
import DropDown from '../forms/dropdown/DropDown';
import menu from '../assets/menu.png'
import search from '../assets/search.png'
import Search from '../search/Search'
import {getUserInfo, addStylistName, addZip} from '../../ducks/actions/action_creators'
// import { bindActionCreators } from '../../../../../../Library/Caches/typescript/3.1/node_modules/redux';



class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      showUser: false,
      showLoginModal: false,
      showMenu: false,
      input: '',
      full_name: ''

    }
  }
 
  componentDidUpdate = () => {
    axios.get('/checkSession')
    .then((res) => {

      this.props.getUserInfo(res.data)
    })
  }

  
  toggleModal = () => {
    this.setState(prevState => {
      return {
        showLoginModal: !prevState.showLoginModal
      }
    })
  }
  toggleSignUp = () => {
    this.setState(prevState => {
      return {
        showSignUp: !prevState.showSignUp
      }
    })
  }


  showModal = () => {
    if (this.state.showLoginModal) {
      return (
        <Login onClose={this.toggleModal} showLogin={this.state.showLoginModal}  />
      )
    } else if(this.state.showSignUp){
      return (
        <Login onClose={this.toggleSignUp}  />
      )
    }
  }
 

  toggleMenu = () => {
    this.setState(prevState => {
      return {
     showMenu: !prevState.showMenu,
    
      }
    })
  }

  logout = () => {
    axios.get('/api/logout')
    .then((res) => {
     if(res.status === 200) {
       return this.componentDidUpdate()
       }
    })
 }
  
 showDropDown = () => {
    if (this.state.showMenu) {
      return (
        <DropDown onClose={this.toggleMenu} logout={this.logout} login={this.showModal}/>
      )
    }
  }


  render() {
    console.log(this.props.userInfo.full_name)
    const { addStylistName, addZip } = this.props
    return (
      <div className="App">

        {this.props.userInfo.full_name ?
          <header className="home-header">
            <img src={menu} className='menu' width='100%' />
            <span className='responsive-title'>PrivyChic</span>
           <Link to='/search' className='search-link'><img src={search} className='search-img' /></Link> 
            <div className='header-search-box'>
              <img src={logo} className="App-logo" alt="logo" width='170px' height='50px' />
              <div className='wrapper'>
                <input className='search-input' placeholder='Search' />
                <img src={icon} alt='icon' className='icon' width='25px' />
              </div>
            </div>

            <div className='icons-container'>
              <img className='bell' src={bell} width='30px' height='30px' />
              <div className='nav-dropdown' >
                <img onClick={this.toggleMenu} src={down} className='down-arrow' width='15px' />
                <span className='profile-img'>{this.props.userInfo.full_name}</span>
                  {this.showDropDown()}
              </div>
            </div>
          </header> :
          <header className="home-header">
            <img src={menu} className='menu' width='15px' onMouseEnter={this.toggleMenu} />
            {this.showDropDown()}
            <span className='responsive-title'>PrivyChic</span>
            <Link to='/search' className='search-link'> <img src={search}  className='search-img' /></Link>

            <div className='header-search-box'>
              <img src={logo} className="App-logo" alt="logo" width='170px' height='50px' />   <div className='wrapper'>
                <input className='search-input' placeholder='Search' onChange={(e) => addZip(e.target.value)}/>
              <img src={icon} alt='icon' className='icon' width='25px' />
              </div>
            </div>
            <div className='nav-link-container'>
              <span onClick={this.toggleSignUp} className='nav-link' >Sign Up</span>
              <span onClick={this.toggleModal} className='nav-link' >Login</span>
              <Link to='/business' ><button className='business'>For Business</button></Link>
              <NavLink to='/help' className='nav-link'><span className='nav-link'>Help</span></NavLink>
            </div>
          </header>}
        <div className='home'>
          <div className='top-box'>
            <div className='search-box'>
              <span className='motto'> {`Discover & book beauty and barber appointments.`}</span>

              <div className='input-search-box'>
                <div className='input-container'>
                  <input onChange={(e) => addStylistName(e.target.value)} className='name' placeholder='Haircut, salon name, stylist name' />
                  <Link to='/search'> <img className='icon2' src={icon} /> </Link>
                  <input onChange={(e) => addZip(e.target.value)} placeholder='Enter city, state, or zipcode' className='location' />
                  <img src={location} className='location-icon' />
                  <input onChange={(e) => addStylistName(e.target.value)}className='responsive' placeholder='Haircut, Salon Name, Style Name'/>
                </div>

                <Link to='/search' className='search'><button className='search'>Search</button></Link>
              </div>

              <div className='search-link-container'>Popular Searches
        <a className='search-links' href='#'>Haircut</a>
                <a className='search-links' href='#'>Barber</a>
                <a className='search-links' href='#'>{`Weaves & Extensions`}</a>
                <a className='search-links' href='#'>Nails</a>
                <a className='search-links' href='#'>Makeup</a>
                <a className='search-links' href='#'>Color</a>
              </div>
            </div>
            <div className='right-box'>
              <span className='bold-text'>Are you a beauty professional or barber?</span>
              <span className='booking-text'>#1 Appointment booking software for independent professionals</span>
              <Link to='/business'><button className='setup'>Set Up My Business</button></Link>
              <span className='trial-text'>30 day free trial, no card required.</span>
              {this.showModal()}
            </div>
          </div>
        </div>
        <h1>{`Browse & Discover`}</h1>
        <div className='discover-box'>
          <div className='img-container'><span className='float1'>
            <span className='float-text'>Top Barbers</span>Near You</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/a-l-l-e-f-v-i-n-i-c-i-u-s-354911-unsplash.jpg' width='100%' height='100%' className='box' /></div>

          <div className='img-container'><span className='float1'>
            <span className='float-text'>Special Event</span>Look Great</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/colette-allen-480460-unsplash.jpg' width='100%' height='100%' className='box' /> </div>

          <div className='img-container'><span className='float1'><span className='float-text'>Fresh Cuts</span>Looks You'll Love</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/element5-digital-611462-unsplash.jpg' width='100%' height='100%' className='box' /> </div>

          <div className='img-container'><span className='float1'><span className='float-text'>Most Booked</span>This Week</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/fezbot2000-365718-unsplash.jpg' width='100%' height='100%' className='box' />  </div>

          <div className='img-container'><span className='float1'><span className='float-text'>Brighten Up</span> Stunning Hues Are In</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/ivan-dodig-361699-unsplash.jpg' width='100%' height='100%' className='box' /></div>

          <div className='img-container'><span className='float1'><span className='float-text'>New Stylists</span>This Week</span>
            <img src='https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b65afe192a0efba2046ab14531040e06&auto=format&fit=crop&w=634&q=80' width='100%' height='100%' className='box' /> </div>

          <div className='img-container'> <span className='float1'><span className='float-text'>Top Nail Artists</span>Near You</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/sharon-mccutcheon-666323-unsplash.jpg' width='100%' height='100%' className='box' /></div>

          <div className='img-container'><span className='float1'><span className='float-text'>Highlight Your Season</span></span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/michael-dam-258165-unsplash.jpg' width='100%' height='100%' className='box' /></div>

          <div className='img-container'><span className='float1'><span className='float-text'>Available Today</span>Near You</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/kal-loftus-596319-unsplash.jpg' width='100%' height='100%' className='box' />
          </div>
        </div>
       
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    zipcode: state.zipcode,
    userInfo: state.userInfo,
    stylistName: state.stylistName

  }
}

const bindActionCreators = {getUserInfo, addStylistName, addZip}
export default withRouter( connect(mapStateToProps, bindActionCreators)(Home))
