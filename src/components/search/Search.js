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
import Services from '../profile/Services'
import CustomMenu from '../dropdown/CustomMenu'
import { addTimes, addZip, addStylistName, getUserInfo } from '../../ducks/actions/action_creators'
import {Button, Collapse, Well, Fade, Navbar, Nav, MenuItem, NavDropdown, NavItem} from 'react-bootstrap'
import Schedule from '../dropdown/Schedule';




const availableTimes = {
    fontColor: 'black',
    borderStyle: 'solid',
    borderColor: 'black',
    fontSize: '12px',
    height: '50%',
}

class Search extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            stylists: [],
            acceptsPayment: false,
            showLoginModal: false,
            appointments: false,
            availability: [],
            showStylist: true,
            business_id: null,
            calendar: [],
            profileImage: profile,
            open: false,
            stylistSchedule: false,
            service_id: null


        }
    }

   
    componentDidMount = () => {
        if(this.props.zipcode) {
        axios.get(`/api/zipcode/${this.props.zipcode}`)
        .then((res) => {
            this.setState({stylists: res.data ,full_name: res.data[0].full_name})
        },
               axios.get('/checkSession')
               .then((res) => {
                   this.props.getUserInfo(res.data)
                   
               })
            )
        }    
    }

    findStylist = () => {
        if (this.props.stylist_name) {
            axios.get(`/api/name/${this.props.stylist_name.toUpperCase()}`)
                .then((res) => {
                    this.setState({ stylists: res.data, profileImage: res.data[0].picture, full_name: res.data[0].full_name })
                })
        } else if (this.props.zipcode) {
            axios.get(`/api/zipcode/${this.props.zipcode}`)
                .then((res) => {
                    this.setState({ stylists: res.data, full_name: res.data[0].full_name })
                })
        } else {
            axios.get(`/api/date/${this.props.date}`)
                .then((res) => {
                    this.setState({ stylists: res.data, profileImage: res.data[0].picture, full_name: res.data[0].full_name })
                })
        }
    }


    showStylist = () => {
     if(this.state.stylists && this.state.stylists.length){ 
        let stylists = this.state.stylists
        let stylist = []
        for (let i in stylists) {
            stylist.push(
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
                                <div className='search-profile-pic'>
                                        <img src={stylists[i].picture} alt='profile' className='picture' width='100%' height='100%' />                                 
                                    <span className='stylist-name'>{stylists[i].full_name}
                                    </span>
                                </div>
                            </div>
                            <div className='availability'>
                                <div className='availability-filter'>
                                   <button className='search-button' onClick={() => this.showAvailability(stylists[i].business_id, stylists[i].service_id)}>Check Availability</button> 
                               
                                </div>
                               
                            </div>
                        </div>
                        <Link to={`/profile/${stylists[i].business_id}`} className='view-photos'>View Profile</Link>
                    </div> 
                    

            )
            return stylist
        }

        } else {
            return <div className='no-results'>
                No Search Results
                <img src={logo} className='results-logo' width='130px' height='50px' />
                </div>
        }
   }


    paymentFilter = () => {

        this.setState({ acceptsPayment: true
          
            
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
        this.setState(prevState => {
            return {
                stylistSchedule: !prevState.stylistSchedule,
                service_id: id
            }
        })      
    }
    showPaymentFilter = () => {
         axios.get(`/api/payments`)
        .then((res) => {
            this.setState({stylists: res.data})
        })
        
}  


    showModal = () => {
        if (this.state.showLoginModal) {
            return (
                <Login onClose={this.toggleModal} showLogin={this.state.showLoginModal} />
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
    dropdown = () => {
        if(this.state.open) {
          return (
            <CustomMenu open={this.state.open} login={this.toggleModal}/>
          )
        }
      }
      
      showSchedule = (id, business_id) => {
          if(this.state.open){
              return (
                  <Schedule onClose={this.showAvailability} business_id={business_id}service_id={id}/>
              )
          }
      }
    render() {
        console.log(this.state.calendar)
        const { addDate, addStylistName, addZip, stylist_name, date, zipcode } = this.props
        return (
            <div className='Search'>
                <div className='responsive-header' width='100%'>
                    <Link to='/'><img src={logo} alt='logo' width='100%' height='60px' className='logo' /></Link>
                    <div className='header-inputs'>
                        <div className='searchMenu'>
                        <Button onClick={this.menu} id='styledButton'><img className='menu-icon' width='40px'src={menu}/></Button>
                        {this.dropdown()}
                        </div> 
                    <div className='search-menu-container'>
                        <span>Login</span>
                        <span>Signup</span>
                    </div> 
                    
                        <img src={search} onClick={() => this.findStylist()} className='search-icon1' alt='search' width='27px' />
                        <input className='name-input' placeholder='Name, Salon, Style Type'
                            onChange={(e) => addStylistName(e.target.value)} />
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
                     <span className='nav-links'>{this.props.userInfo.full_name}</span>
                      <span className='nav-links'>{this.logout}</span>
                    </div> }
                </div>
                <div className='main-container'>
                    <div className='search-top-container'>
                        <span className='filter-text'>FILTERS</span>
                        <span className='payments-text'>Accepts Payment
                        <input onChange={this.showPaymentFilter}type='checkbox' width='15px' className='payment-checkbox'/>
                        </span>
                        {/* {this.showPaymentFilter()} */}
                    {this.showModal()}

                </div>
                <div className='stylist-container'>
                    {this.showStylist()}
                    {this.showSchedule()}

                </div>
            </div>
           </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        zipcode: state.zipcode,
        stylist_name: state.stylist_name,
        date: state.date
    }
}

const bindActionCreators = { addTimes, addZip, addStylistName, getUserInfo }

export default connect(mapStateToProps, bindActionCreators)(Search)
