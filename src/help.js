import React, {Component} from 'react'
import logo from './components/assets/chic3.png'
import './App.css'
import {Link} from 'react-router-dom'

class Help extends Component {
    render(){
        return (
            <div className='Help'>
            <div className='home-header'>
           <Link to='/'><img src={logo} alt='logo' width='100px' height='50px' 
           className='App-logo'/></Link>
           <span className='link-container'>
           <Link to='' className='link'>Submit a Request</Link>
           <Link to=''className='link'>Login</Link></span>
           </div>
    <div className='help'></div>
    </div>
        )
  }
}

export default Help