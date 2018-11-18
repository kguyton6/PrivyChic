import React, { Component } from 'react';
import './home.css';
import logo from '../assets/privy3.svg'
import icon from '../assets/icon.svg'
import location from '../assets/location.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { searchField } from '../../ducks/reducer';
import { connect } from 'react-redux'
import bell from '../assets/bell.png'
import Login from './modal/Login'
import down from '../assets/down-arrow.png'
import DropDownMenu from '../login/dropdown/DropDown';
import Setup from './modal/Setup'
import menu from '../assets/menu.png'
import search from '../assets/search.png'

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
      input: ''

    }
  }

  componentDidMount = () => {
    axios.get('/api/getuser')
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          this.setState({ user: res.data, showUser: true, firstName: res.data[0].first_name, lastName: res.data[0].last_name })
        } else {
          console.log('no users')
        }
      })
  }

  searchField = (value) => {
    this.setState({ input: value })
  }

  toggleModal = () => {
    this.setState(prevState => {
      return {
        showLoginModal: !prevState.showLoginModal
      }
    })
  }


  showModal = () => {
    if (this.state.showLoginModal) {
      return (
        <Login onClose={this.toggleModal} onSignUp={this.componentDidMount} />
      )
    }

  }

  showSetupModal = () => {
    if (this.state.showLoginModal) {
      return (
        <Setup onClose={this.toggleModal} />
      )
    }

  }

  toggleMenu = () => {
    this.setState(prevState => {
      this.state.showMenu = !prevState.showMenu
    })
  }

  showDropDown = () => {
    if (this.state.showMenu) {
      return (
        <DropDownMenu onClose={this.toggleMenu} />
      )
    }
  }
  render() {


    const { searchField } = this.props
    return (
      <div className="App">

        {this.state.showUser === true ?
          <header className="home-header">
            <img src={menu} className='menu' width='100%' />
            <span className='responsive-title'>PrivyChic</span>
            <img src={search} className='search-img' />
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
                <span className='profile-img'>{`${this.state.firstName} ${this.state.lastName}`}</span>
                <div className='dropdown-container' >
                  {this.showDropDown()}
                </div>
              </div>
            </div>
            {/* <span>{this.state.firstNameSplit[0]}{this.state.lastNameSplit[0]}</span> */}

            {/* </div> */}

          </header> :
          <header className="home-header">
            <img src={menu} className='menu' width='15px' />
            <span className='responsive-title'>PrivyChic</span>
            <img src={search} className='search-img' />

            <div className='header-search-box'>
              <img src={logo} className="App-logo" alt="logo" width='170px' height='50px' />   <div className='wrapper'>
                <input className='search-input' placeholder='Search' />
                <img src={icon} alt='icon' className='icon' width='25px' />
              </div>
            </div>
            <div className='nav-link-container'>
              <span onClick={this.toggleModal} className='nav-link' >Sign Up</span>
              <span onClick={this.toggleModal} className='nav-link' >Login</span>
              <Link to='/form/business' ><button className='business'>For Business</button></Link>
              <Link to='/help' className='nav-link'><span className='nav-link'>Help</span></Link>
            </div>
          </header>}
        <div className='home'>
          <div className='top-box'>
            <div className='search-box'>
              <span className='motto'> {`Discover & book beauty and barber appointments.`}</span>

              <div className='input-search-box'>
                <div className='input-container'>
                  <input onChange={(e) => this.searchField(e.target.value)} className='name' placeholder='Haircut, salon name, stylist name' />
                  <img className='icon2' src={icon} />
                  <input onChange={(e) => this.searchField(e.target.value)} placeholder='Enter city, state, or zipcode' className='location' />
                  <img src={location} className='location-icon' />
                  <input className='responsive' placeholder='Haircut, Salon Name, Style Name'/>
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
              <button onClick={this.toggleModal} className='setup'>Set Up My Business</button>
              <span className='trial-text'>30 day free trial, no card required.</span>
              {this.showModal()}
              {this.showSetupModal()}
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
    search: state.search
  }
}
const mapDispatchToProps = dispatch => {
  return {
    searchField: search => dispatch({ type: 'SEARCHFIELD', payload: search })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
