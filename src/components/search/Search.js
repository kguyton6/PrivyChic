import React, { Component } from 'react'
import { connect } from 'react-redux'
import downArrow from '../assets/down-arrow.png'
import logo from '../assets/Artboard1.png'
import marker from '../assets/location.png'
import search from '../assets/icon.svg'
import './search.css'
import check from '../assets/checkmark.png'
import Login from '../login/modal/login/Login'
import axios from 'axios';
import { Link, Route } from 'react-router-dom'
import profile from '../assets/profile.png'
import menu from '../assets/menu.png'
import Availability from './Availability'
import Appointment from '../forms/Appointment'
import { addTimes, addZip, addFullName, getUserInfo } from '../../ducks/actions/action_creators'


const APP_CODE = 'KdE2bd_twT_q-JIYM47NSA'
const APP_ID = 'kyH657pnAu1U3wljSnsq'

const availableTimes = {
    fontColor: 'black',
    borderStyle: 'solid',
    borderColor: 'black',
    fontSize: '12px',
    height: '50%',
}

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylists: [],
            acceptsPayment: false,
            showLoginModal: false,
            appointments: false,
            availability: [],
            showStylist: true,
            business_id: null,
            calendar: [],
            profileImage: profile
        


        }
    }

    // componentWillReceiveProps = (prevProps) => {
    //     return {

    //         prevProps:  prevProps.this.props
    //     }
    // }
    componentDidMount = () => {
               axios.get('/checkSession')
               .then((res) => {
                   this.props.getUserInfo(res.data)
               })
            
    }

    findStylist = () => {
        if (this.props.full_name) {
            axios.get(`/api/name/${this.props.full_name.toUpperCase()}`)
                .then((res) => {
                    this.setState({ stylists: res.data, profileImage: res.data[0].picture })
                })
        } else if (this.props.zipcode) {
            axios.get(`/api/zipcode/${this.props.zipcode}`)
                .then((res) => {
                    this.setState({ stylists: res.data, profileImage: res.data[0].picture })
                })
        } else {
            axios.get(`/api/date/${this.props.date}`)
                .then((res) => {
                    this.setState({ stylists: res.data, profileImage: res.data[0].picture })
                })
        }
    }


    showStylist = () => {
        let stylists = this.state.stylists
        let stylist = []
        for (let i in stylists) {
            console.log(stylists[i])
            stylist.push(
                this.state.showStylist ?
                    <div key={i} className='stylist-card' >
                        <div className='responsive-box'>
                            <img src={stylists[i].portfolio} width='100%' height='100%' />
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
                                        <img src={stylists[i].picture} alt='profile' className='picture' width='100%' height='100%' />                                 
                                    <span className='stylist-name'>{stylists[i].full_name}
                                    </span>
                                </div>
                            </div>
                            <div className='availability'>
                                <div className='availability-filter'>
                                    <span onClick={() => this.showAvailability(stylists[i].business_id)} className='availability-text'>Check Availability</span>

                                </div>
                               
                            </div>
                        </div>
                        <Link to={`/profile/${stylists[i].business_id}`} className='view-photos'>View Photos</Link>
                    </div> :
                    <div className='stylist-card2'>
                        <div className='responsive-box'>
                            <img src={stylists[i].portfolio} width='100%' height='100%' />
                            </div>

                            <div className='profile-main-box'>
                                <div className='profile-box'>
                                    <div className='profile-pic'>
                                        <img src={stylists[i].picture} alt='profile' className='picture' width='100%' height='100%' />
                                        <span className='stylist-name'>{this.stylists[i].full_name.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className='availability'>
                                    <div className='time-filter'>
                                        {this.showAvailability()}</div>

                                </div>
                            </div>
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
                showLoginModal: !prevState.showLoginModal,
            }
        })
    }

    showAvailability = (id) => {
       this.state.calendar.filter((time) => {
           console.log(time)
           if(time.business_id === id){
              return (
              <div key={id}>
                {time.month_name}
              </div>
              )
          }
        })        
    }
    handlePaymentFilter = (e) => {
        console.log(e.target)
        this.state.stylists.filter((stylist, i) => {
            console.log(stylist, i)
        })
    }


    showModal = () => {
        if (this.state.showLoginModal) {
            return (
                <Login onClose={this.toggleModal} showLogin={this.state.showLoginModal} />
            )
        }
    }
    // availability = () => {
    //     const { addTimes } = this.props
    //     let times = this.state.availability
    //     let time = []
    //     for (let i in times) {
    //         time.push(
    //             <ul className='timeList' key={i}>
    //                 <Link to={`/profile/${this.state.business_id}`} onClick={() => addTimes(`${times[i].month_name} ${times[i].day} at ${times[i].time}`)}><li className='time'>{`${times[i].month_name} ${times[i].day} ${times[i].year} ${times[i].time}`}</li></Link>
    //             </ul>

    //         )
    //     }
    //     return time
    // }
    render() {
        console.log(this.state.calendar)
        const { addDate, addFullName, addZip, full_name, date, zipcode } = this.props
        return (
            this.state.stylists? 
            <div className='Search'>
                <div className='search-header' width='100%'>
                    <Link to='/'><img src={logo} alt='logo' width='100%' height='60px' className='logo' /></Link>
                    <div className='header-inputs'>
                        <img src={menu} className='menu-icon' width='40px' height='30px' />
                  
                    <div className='search-menu-container'>
                        <span>Login</span>
                        <span>Signup</span>
                    </div> 
                    
                        <img src={search} onClick={() => this.findStylist()} className='search-icon1' alt='search' width='27px' />
                        <input className='name-input' placeholder='Name, Salon, Style Type'
                            onChange={(e) => addFullName(e.target.value)} />
                        <input className='location-input' placeholder='Current Location'
                            onChange={(e) => addZip(e.target.value)} />
                        <img src={marker} alt='marker' className='marker-icon' width='13px' />
                        <input type='date' id='date'
                            onChange={(e) => addDate(e.target.value)} />
                        <button className='search-button' onClick={this.findStylist}>Search</button>
                    </div>
                    {!this.props.full_name ?
                    <div className='nav-links'>
                        <span onClick={this.toggleModal} className='signup-link'>Sign Up</span>
                        <span onClick={this.toggleModal} className='login-link'>Login</span>
                        <span className='help-link'>Help</span>
                    </div> :
                     <div className='nav-links'>
                     <span className='nav-links'>{this.props.full_name}</span>
                      <span className='nav-links'>{this.logout}</span>
                    </div> }
                </div>
                <div className='main-container'>
                    <div className='search-top-container'>
                        <span className='filter-text'>FILTERS</span>
                        <span className='payments-text'>Accepts Payment
                        <input onChange={(e) => this.handlePaymentFilter(e.target)}type='checkbox' width='15px' className='payment-checkbox'/>
                        </span>
                        {/* {!this.state.acceptsPayment ? */}
                            {/* <span className='payments-text'>Accepts Payments */}
            {/* <div onClick={this.paymentsToggle} className='toggle'></div></span> : */}
                            {/* <span className='payments-text'>Accepts Payments */}
            {/* <img src={check} onClick={this.paymentsToggle} width='40px' height='40px' className='toggle' /> } */}
                    </div>
                    {/* </span> */}
                    {this.showModal()}
                    {/* {this.showAvailability()} */}
                </div>
                <div className='stylist-container'>
                    {this.showStylist()}
                    {this.showAvailability()}
                </div>
            


            </div>
            :
            <div className='no-search'>No Search Results</div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        zipcode: state.zipcode,
        full_name: state.full_name,
        date: state.date
    }
}

const bindActionCreators = { addTimes, addZip, addFullName, getUserInfo }

export default connect(mapStateToProps, bindActionCreators)(Search)
