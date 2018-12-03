import React, { Component } from 'react'
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom'
import './profile.css'
import Services from './Services'
import search from '../assets/search.png'
import menu from '../assets/menu.png'
import '../../reset.css'
import {connect} from 'react-redux'
import Login from '../login/modal/login/Login'
import {Button} from 'react-bootstrap'
import CustomMenu from '../dropdown/CustomMenu'
import {addStylistName} from '../../ducks/actions/action_creators'
import star from '../assets/star.png'



const title = {
    height: '40px',
    fontWeight: 'bold',
    textDecoration: 'underline',

}
const well = {
    position: 'absolute',
    width: '150px',
     height: '90px',
    left: '5%',
    zIndex: '10',
    fontSize: '10px',
    marginTop: '8%',
    fontWeight: 'bold',
    justifyContent: 'space-evenly',
     flexDirection: 'column',
    backgroundColor: 'rgba(226, 226, 226, 0.918)',
    display: 'flex',
    bordeRadius: '3px',
  overflowWrap: 'break-word',
    boxShadow: 'rgba(128, 128, 128, 0.431)',
    cursor: 'pointer',
    TextAlign: 'left'
  }
  const searchMenu = {
    cursor: 'pointer',
    color: 'rgb(56, 56, 56)',
    fontSize: '18px',
    textAlign: 'left',
    letterSpacing: '1px',
    textIndent: '5px',
  }

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: [],
            stylist_name: '',
            loginModal: false,
            services: [],
            calendar: [],
            showTitles: true,
            open: false,
            showLogin: false
        }
    }

    componentDidMount = () => {
        axios.get(`/api/profile/${this.props.match.params.id}`)
            .then((res) => {
                console.log(res.data[0].full_name)

                this.setState({ profile: res.data, stylist_name: res.data[0].full_name,  })
                this.props.addStylistName(res.data[0].full_name)
            },
                axios.get(`/api/services/${this.props.match.params.id}`)
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ services: res.data.service, calendar: res.data.calendar })
                    })
                   
            )
    }
    toggleLogin = () => {
        this.setState(prevState => {
            return {
                showLogin: !prevState.showLogin,
                showSignUp: prevState.showSignUp
            }
        })
    }
    toggleSignUp = () => {

    }
  
    showModal = () => {
        if(this.state.showLogin){
            return (
                <Login onClose={this.toggleLogin} login={this.state.showLogin}/>
            )
        } else if(this.state.showSignUp){
                return (
                    <Login onClose={this.toggleSignUp} />
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
            <CustomMenu open={this.state.open} menuStyle={searchMenu} wellStyle={well} login={this.toggleLogin} showLogin={this.state.showLogin} />
          )
        }
      }

    showProfile = () => {
        let profile = this.state.profile
        let stylist = []
        for (let i in profile) {
            console.log(profile[i].portfolio)
        
            const sectionStyle = {
                width: "100%",
                height: "100%",
                position: 'relative',
                zIndex: '-100',
                zoom: -4

        }

              var profilePic = {
                  width: '9rem',
                  height: '9rem',
                  borderRadius:'70px'
              }

             

            stylist.push(
                <React.Fragment  key={i}>
                <div id='banner-container'>
                <img style={sectionStyle} src={profile[i].portfolio} />
                <img src={profile[i].picture} alt='profile-pic' id='profile-pic1'  style={profilePic} />
                    <span className='profile-fullname'>{profile[i].full_name.toUpperCase()}</span>
    </div>
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
        return (
            <div className='App'>

                <div className='profile-head' width='100%'>
                <Button onClick={this.menu}><img src={menu} className='profile-menu' width='40px' height='30px'/>
                {this.dropdown()}
                </Button>
                    <Link to='/' className='profile-logo-title'>PrivyChic</Link>
                    <div className='profile-link-container'>
                        <span onClick={(showLogin) =>this.toggleModal(showLogin)} className='profile-link' >Sign Up</span>
                        <span onClick={this.toggleModal} className='profile-link' >Login</span>
                        <Link to='/business' ><button className='business-button'>For Business</button></Link>
                        <NavLink to='/help' ><span className='profile-link'>Help</span></NavLink>
                    </div>
                <Link to='/search' className='profile-search-icon'><img src={search}  width='100%'/></Link> 
                                 </div>
                {this.showProfile()}
                <div className='profile-main-container'>

                
                <div><span className='reviews'>Rating</span><img src={star} width='25px'className='star'/> <img src={star} width='25px'className='star'/><img src={star} width='25px'/></div> 

                <div className='service-container'>
                <h4 className='service-menu-title'>{`${this.state.stylist_name}'s Service Menu`}</h4>
                {!this.state.showTitles ?
                <div className='labels'>
                <label  className='service_name-title'>Service </label>
                <label   className='description-title'>Description</label>
                <label   className='price-title'>Price</label>
                <label   className='duration-title'>Duration</label>
                </div> :
                <div className='labels'> </div>}
                 <div className='services' id='available'>  
                 <Services title={this.showServiceTitles} services={this.state.services} calendar={this.state.calendar} showAvailability={this.showAvailability} stylist_name={this.state.stylist_name}/>
                </div>

                </div>
                 {this.showAddress()}
                {this.showModal()}

                {this.businessHours()}
    </div>
    </div>



        )
    }
}
const mapStateToProps = (state) => {
    const {userInfo, stylist_name} = state
    return {
        userInfo,
        stylist_name
    }
}
 
const bindActionCreators = {addStylistName}
export default connect(mapStateToProps, bindActionCreators)(Profile)