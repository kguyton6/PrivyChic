import React, { Component } from 'react'
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom'
import './profile.css'
import Services from './Services'
import Appointment from '../forms/Appointment'
import search from '../assets/search.png'
import menu from '../assets/menu.png'
import '../../reset.css'
import {connect} from 'react-redux'
import {showServices} from '../../ducks/actions/action_creators'
import Login from '../login/modal/login/Login'



class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: [],
            full_name: '',
            loginModal: false,
            services: [],
            calendar: [],
            showTitles: true
        }
    }

    componentDidMount = () => {
        axios.get(`/api/profile/${this.props.match.params.id}`)
            .then((res) => {
                console.log(res)
                this.setState({ profile: res.data, full_name: res.data[0].full_name})
            },
                axios.get(`/api/services/${this.props.match.params.id}`)
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ services: res.data.service, calendar: res.data.calendar })
                    })
                   
            )
    }

  
    showModal = () => {
        if(this.props.showLogin){
            return (
                <Login onClose={this.toggleLogin} />
            )
        } else {
            if(this.props.showSignUp){
                return (
                    <Login onClose={this.toggleSignUp} />
                )
            }
        }
    }

    showProfile = () => {
        let profile = this.state.profile
        let stylist = []
        for (let i in profile) {
        
            var sectionStyle = {
                width: "100%",
                height: "42vw",
                backgroundImage: `url(${profile[i].portfolio})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
                backgroundPositionY: '40%',
                zoom: '-2'

              };

             

            stylist.push(
                <React.Fragment key={i}>
                <section  style={sectionStyle} id='banner-container'>
                    <img src={profile[i].picture} alt='profile-pic'  className='profile-pic'/>
                    <h1 className='profile-fullname'>{profile[i].full_name.toUpperCase()}</h1>
                </section>
                <div key={profile[i].id} className='profile-top-container'>
                    <div className='name-title'>
                        {`${profile[i].full_name} - Hair Stylist`}<br/>
                       <span id='profession-title'> {profile[i].profession}</span>

                    </div>
                </div>
                </React.Fragment>
            )
        }
        return stylist
    }
    showAddress = () => {
        let address = this.state.profile
        let business_address = []
        for(let i in address){
          business_address.push(
              <div key={i}className='business-address-box'>
            <ul>
              <span id='business-name-title'>{address[i].full_name.toUpperCase()}</span>
                <li>{address[i].streetaddress}</li>
                <li>
                    {address[i].business_name}
                </li>
                <li>{`${address[i].city}, ${address[i].state} ${address[i].zipcode}`}</li>
                {/* <li>{address[i].zipcode}</li> */}
                <span id='number'>{address[i].phone_number}</span>
            </ul>
        </div>

          )
        }
        return business_address
    }

    businessHours = () => {
        let hours = this.state.profile
        let newHours = []

        for (let i in hours) {
            newHours.push(
                <div key={i} className='business_hours'>
                <span className='business-hours-text'>BUSINESS HOURS</span>
                    <ul >
                        <li >{` Sunday: ${hours[i].sunday}`}</li>
                        <li >{` Monday: ${hours[i].monday}`}</li>                      
                        <li >{` Tuesday: ${hours[i].tuesday}`}</li>
                        <li >{` Wednesday: ${hours[i].wednesday}`}</li>
                        <li >{` Thursday: ${hours[i].thursday}`}</li>
                        <li >{` Friday: ${hours[i].friday}`}</li>
                        <li>{` Saturday: ${hours[i].saturday}`}</li>
                    </ul>
                </div>
            )
        }
        return newHours
    }

    toggleModal = (showLogin) => {
        let loginModal = showLogin
        loginModal = this.state.loginModal
        this.setState(prevState => {
            return {
            loginModal: !prevState.loginModal
            }
        })
    }
    showServiceTitles = () => {
        this.setState(prevState => {
            return {
                showTitles: !prevState.showTitles
                
            }
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className='App'>

                <div className='profile-head' width='100%'>
                <img src={menu} className='menu' width='40px' height='30px'/>
                    <Link to='/' className='profile-logo-title'>PrivyChic</Link>
                    <div className='profile-link-container'>
                        <span onClick={(showLogin) =>this.toggleModal(showLogin)} className='profile-link' >Sign Up</span>
                        <span onClick={this.toggleModal} className='profile-link' >Login</span>
                        <Link to='/business' ><button className='business-button'>For Business</button></Link>
                        <NavLink to='/help' ><span className='profile-link'>Help</span></NavLink>
                    </div>
                 <img src={search} className='search-icon' width='30px'/>
                                 </div>
                {this.showProfile()}
                <div className='profile-main-container'>
                {this.state.showTitles ? 
                <div className='service-container'>
                <h4 className='service-menu-title'>{`${this.state.full_name}'s Service Menu`}</h4>
                <div className='labels'>
                <label className='service_name-title'>Service </label>
                <label className='description-title'>Description</label>
                <label className='price-title'>Price</label>
                <label className='duration-title'>Duration</label>
                </div> 
                 {/* <div className='services' id='available'>  
                 <Services title={this.showServiceTitles}services={this.state.services} calendar={this.state.calendar}full_name={this.state.full_name}/>
                </div> */}
                 </div> :
                 <div id='avialability-container'>
                

                  <h4 className='service-menu-title'>{`${this.state.full_name}'s Availablility`}</h4>
               
                </div> }

                 <Services showAvailability={this.showServiceTitles} services={this.state.services} calendar={this.state.calendar} full_name={this.state.full_name} showModal={this.showModal}/>


                </div> 
                 {this.showAddress()}


                {this.businessHours()}
                </div>




        )
    }
}
// const mapStateToProps = (state) => {
//     return {
//         displayServices: state.displayServices,
//         showServices: showServices()
//     }
// }
// const bindActionCreators = {showServices}
export default Profile