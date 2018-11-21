import React, { Component } from 'react'
import { connect } from 'react-redux'
import downArrow from '../assets/down-arrow.png'
import logo from '../assets/Artboard1.png'
import marker from '../assets/location.png'
import search from '../assets/icon.svg'
import './search.css'
import check from '../assets/checkmark.png'
import Login from '../login/modal/Login'
import axios from 'axios';
import { Link } from 'react-router-dom'
import profile from '../assets/profile.png'
import menu from '../assets/menu.png'

const APP_CODE = 'KdE2bd_twT_q-JIYM47NSA'
const APP_ID = 'kyH657pnAu1U3wljSnsq'

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylists: [],
            acceptsPayment: false,
            zip: null,
            name: '',
            date: '',
            showLoginModal: false,


        }
    }

   

    findStylist = (value) => {
        axios.get(`/api/stylist/${value}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ stylists: res.data })
            })
    }
 
    // viewProfile = (id) => {
    //     return (
    //         <Profile business_id={id}/>
    //     )
    // }

    showStylist = () => {
        let stylists = this.state.stylists
        let stylist = []
        for (let i in stylists) {
            console.log(stylists[i])
            let full_name = stylists[i].full_name.toUpperCase()
            stylist.push(
                <div key={stylists[i].business_id} className='stylist-card' >
                    <div className='responsive-box'>
                    <img src={stylists[i].pictures} width='100%' height='100%'/>

                    </div>
                    <div className='profile-main-box'>
                    <div className='responsive-title'>
                    {`${stylists[i].full_name}-${stylists[i].profession}`}
                    </div>
                            <span className='service-filter'>Multiple Services
                    <img src={downArrow} alt='down' className='down' width='15px' height='10px' />
                            </span>
                       
                        <div className='profile-box'>
                            <div className='profile-pic'>
                                {stylists[i].picture ?
                                    <img src={stylists[i].picture} alt='profile' className='picture' width='100%' height='100%' />
                                    : <img src={profile} alt='profile' className='picture' width='100%' height='100%' />}
                              
                              <span className='stylist-name'>{full_name}
                            </span>
                                </div>
                        </div>
                        <div className='availability'>
                            <div className='availability-filter'>
                            <span className='availability-text'>Check Availability</span>
                            <li className='schedule'>10:00 a.m.</li>
                            <li className='schedule'>11:00 a.m.</li>
                            <li className='schedule'>12:00 p.m.</li>
                            <li className='schedule'>2:00 p.m.</li>
                            <li className='schedule'>4:30 p.m.</li>
                            <li className='schedule'>5:30 p.m.</li>

                            </div>
                        </div>
                    </div>
                    <Link to={`/profile/${stylists[i].business_id}`} className='view-photos'>View Photos</Link>
                </div>
            )
        }
        return stylist
    }


    paymentsToggle = () => {

        this.setState(prevState => {
            return {
                acceptsPayment: !prevState.acceptsPayment
            }
        })
    }

    toggleModal = () => {
        this.setState(prevState => {
            return {
                showLoginModal: !prevState.showLoginModal
            }
        })
    }

    handleZip = (value) => {
        this.setState({ zip: value })
    }

    handleName(value) {
        this.setState({ name: value })
    }

    handleDate(value) {
        this.setState({ date: value })
    }

    showModal = () => {
        if (this.state.showLoginModal) {
            return (
                <Login onClose={this.toggleModal} />
            )
        }
    }
    render() {
        console.log(this.state)
        const { searchField } = this.props
        return (
            <div className='Search'>
                <div className='search-header' width='100%'>
                    <Link to='/'><img src={logo} alt='logo' width='100%' height='60px' className='logo' /></Link>
                    <div className='header-inputs'>
                    <img src={menu} className='menu' width='100%' height='100%'/>
                        <img src={search} onClick={() => this.findStylist(this.state.zip)}className='search-icon1' alt='search' width='27px' />
                        <input value={searchField} className='name-input' placeholder='Name, Salon, Style Type'
                            onChange={(e) => this.handleName(e.target.value)} />
                        <input className='location-input' placeholder='Current Location'
                            onChange={(e) => this.handleZip(e.target.value)} />
                        <img src={marker} alt='marker' className='marker-icon' width='13px' />
                        <input type='date' id='date'
                            onChange={(e) => this.handleDate(e.target.value)} />
                        <button className='search-button' onClick={() => this.findStylist(this.state.zip)}>Search</button>
                    </div>

                    <div className='nav-links'>
                        <span onClick={this.toggleModal} className='signup-link'>Sign Up</span>
                        <span onClick={this.toggleModal} className='login-link'>Login</span>
                        <span className='help-link'>Help</span>
                    </div>
                </div>
                <div className='main-container'>
                    <div className='search-top-container'>
                        <span className='filter-text'>FILTERS</span>
                        {!this.state.acceptsPayment ?
                            <span className='payments-text'>Accepts Payments
                <div onClick={this.paymentsToggle} className='toggle'></div></span> :
                            <span className='payments-text'>Accepts Payments
                <img src={check} onClick={this.paymentsToggle} width='40px' height='40px'className='toggle' /> </span>}
                    </div>

                    {this.showModal()}
                </div>
                <div className='stylist-container'>
                    {this.showStylist()}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        search: state.search
    }
}


export default connect(mapStateToProps)(Search)