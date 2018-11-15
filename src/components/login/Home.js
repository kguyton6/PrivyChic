import React, { Component } from 'react';
import './home.css';
import logo from '../assets/privy3.svg'
import icon from '../assets/icon.svg'
import location from '../assets/location.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import hi from '../assets/Hi.svg'
import { searchField } from '../../ducks/reducer';
import { connect } from 'react-redux'
import bell from '../assets/bell.png'
import Login from './modal/Login'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      firstNameSplit: '',
      lastNameSplit: '',
      password: '',
      username: '',
      showUser: false,
      showLoginModal: false,
      // prevState
    }

  }
  // componentDidMount() {
  //   axios.get('/api/getuser')
  //     .then((res) => {
  //       if(res.data){
  //       console.log(res.data)
  //       this.setState({ user: res.data, showUser: true, usernameSplit: res.data[0].email.toUpperCase().split('') })
  //       } else {
  //         this.setState({disbaled: true})
  //       }
  //       console.log(this.state.username)
  //     })
  // }

toggleModal = () => {
  this.setState(prevState => {
    return {
      showLoginModal: !prevState.showLoginModal
    }
  })
}

showModal = () => {
  if(this.state.showLoginModal){
    return (
      <Login onClose={this.toggleModal}/>
    )
  }
  axios.get('/api/getuser')
  .then((res) => {
    this.setState({user: res.data, showUser: true, firstNameSplit: res.data[0].first_name.toUpperCase().split(''), lastNameSplit: res.data[0].last_name.toUpperCase().split('')})
  })
}

  render() {
       
    
    
    const {searchField} = this.props
    return (
      <div className="App">
        {this.state.showUser === true ?
          <header className="home-header">

            <img src={logo} className="App-logo" alt="logo" width='170px' height='50px' />
            <div className='header-search-box'>
              <input className='search-input' placeholder='Search' />
              <img src={icon} alt='icon' className='icon' width='25px' />
            </div>

            <div className='icons-container'>
            <img className='bell'src={bell} width='30px' height='30px' />
              <a href='http://localhost:4000/api/logout'><div className='profile-img' ><span>{this.state.firstNameSplit[0]}{this.state.lastNameSplit[0]}</span>
             
              </div>
              </a></div>
          </header> :
          <header className="home-header">

            <img src={logo} className="App-logo" alt="logo" width='170px' height='50px' />
            <div className='header-search-box'>
              <input className='search-input' placeholder='Search' />
              <img src={icon} alt='icon' className='icon' width='25px' />
            </div>

            <div className='link-container'>
              <button onClick={this.toggleModal}className='link' >Login</button>
              <a onClick={this.login}><span className='link' >Sign Up</span></a>
              <button className='business'>For Business</button>
              <Link to='/help' className='help-link'><span className='link'>Help</span></Link>
            </div>
          </header>}
        <div className='home'>
          <div className='top-box'>
            <div className='search-box'>
              <span className='motto'> {`Discover & book beauty and barber appointments.`}</span>

              <div className='input-button'>
                <div className='input-container'>
                  <input onChange={(e) => searchField(e.target.value)} className='name' placeholder='Haircut, salon name, stylist name' />
                  <img className='icon2' src={icon} />
                  <input onChange={(e) => searchField(e.target.value)} placeholder='Enter city, state, or zipcode' className='location' />
                  <img src={location} className='location-icon' />
                </div>

                <Link to='/search'><button className='search'>Search</button></Link>
              </div>

              <div className='search-links'>Popular Searches
        <a href='#'>Haircut</a>
                <a href='#'>Barber</a>
                <a href='#'>{`Weaves & Extensions`}</a>
                <a href='#'>Nails</a>
                <a href='#'>Makeup</a>
                <a href='#'>Color</a>
              </div>
            </div>
            <div className='right-box'>
              <span className='bold-text'>Are you a beauty professional or barber?</span>
              <span className='booking-text'>#1 Appointment booking software for independent professionals</span>
              <button className='setup'>Set Up My Business</button>
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
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/jurica-koletic-317414-unsplash.jpg' width='100%' height='100%' className='box' /> </div>

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
