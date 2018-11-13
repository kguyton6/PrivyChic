import React, { Component } from 'react';
import './home.css';
// import logo from './scissors-cut.png'
import logo from './comb.svg'
import icon from './icon.svg'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="home-header">

          <img src={logo} className="App-logo" alt="logo" width='160px' height='70px'/>
          <div className='header-search-box'>
        <input className='search-input' placeholder='Search'/>
        <img src={icon} alt='icon' className='icon' width='25px'/>
        </div>

          <div className='link-container'>
      <span className='link'>Login</span>
      <span className='link'>Sign Up</span>
      <button className='business'>For Business</button>
      <span className='link'>Help</span>
      </div>
        </header>
      <div className='home'>
        <div className='top-box'>
        <div className='search-box'>
       <span className='motto'> {`Discover & book beauty and barber appointments.`}</span>
       <div className='input-button'>
       <div className='input-container'>
        <input className='name' placeholder='Haircut, salon name, stylist name'/>
        <img className='icon2' src={icon}/><input placeholder='Enter city, state, or zipcode'className='location'/></div><button className='search'>Search</button></div></div>
        <div className='right-box'>
        <span className='bold-text'>Are you a beauty professional or barber?</span>
        <span className='booking-text'>#1 Appointment booking software for independent professionals</span>
        <button className='setup'>Set Up My Business</button>
        <span className='trial-text'>30 day free trial, no card required.</span>
</div>
        </div>
        </div>
      </div>
    );
  }
}

export default Home;
