import React, { Component } from 'react'
import axios from 'axios';
import logo from '../assets/Artboard1.png'
import { Link, NavLink } from 'react-router-dom'
import './profile.css'
import Services from './Services'



class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: [],
            full_name: '',
            loginModal: false,
            hours: []
        }
    }

    componentDidMount = () => {
        axios.get(`/api/profile/${this.props.match.params.id}`)
            .then((res) => {
                console.log(res)
                this.setState({ profile: res.data, full_name: res.data[0].full_name })
            },
                axios.get(`/api/hours/${this.props.match.params.id}`)
                    .then((res) => {
                        this.setState({ hours: res.data })
                    })
                   
            )
    }

  

    showProfile = () => {
        let profile = this.state.profile
        let stylist = []
        for (let i in profile) {

            var sectionStyle = {
                width: "100%",
                height: "400px",
                backgroundImage: `url(${profile[i].pictures})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
                backgroundPositionY: '-300px',
                zoom: '-2'

              };

             

            stylist.push(
                <React.Fragment>
                <section  style={sectionStyle} className='banner-container'>
                    <img src={profile[i].picture} alt='profile-pic'  className='profile-pic'/>
                    <h1 className='profile-fullname'>{profile[i].full_name.toUpperCase()}</h1>
                </section>
                <div key={i} className='profile-top-container'>
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
              <div className='business-address-box'>
            <ul>
              <span id='business-name-title'>{address[i].full_name.toUpperCase()}</span>
                <li>{address[i].streetaddress}</li>
                <li>
                    {address[i].business_name}
                </li>
                <li>{address[i].city}</li>
                <li>{address[i].state}</li>
                <li>{address[i].zipcode}</li>
                <span id='number'>{address[i].phone_number}</span>
            </ul>
        </div>

          )
        }
        return business_address
    }

    businessHours = () => {
        let hours = this.state.hours
        let newHours = []

        for (let i in hours) {
            newHours.push(
                <div key={i} className='business_hours'>
                <span className='business-hours-text'>BUSINESS HOURS</span>
                    <ul >
                        <li >{` Sunday: ${hours[i].sunday}`}</li>
                        <li >{` Monday: ${hours[i].monday}`}</li>                      <li >{` Tuesday: ${hours[i].tuesday}`}</li>
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

    toggleModal = () => {
        this.setState(prevState => {
            return {
                loginModal: !prevState.loginModal
            }
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className='App'>

                <div className='profile-head' width='100%'>
                    <Link to='/' className='profile-logo'>PrivyChic</Link>
                    <div className='profile-link-container'>
                        <span onClick={this.toggleModal} className='profile-link' >Sign Up</span>
                        <span onClick={this.toggleModal} className='profile-link' >Login</span>
                        <Link to='/form/business' ><button className='business-button'>For Business</button></Link>
                        <NavLink to='/help' ><span className='profile-link'>Help</span></NavLink>
                    </div>
                </div>
                {this.showProfile()}
                <div className='profile-main-container'>
                <div className='services'>
                <h4 >{`${this.state.full_name} Service Menu`}</h4>
                 <Services id={this.props.match.params.id} />
                 </div>
                 <div className='right-profile-box'>
                 {this.showAddress()}
                {this.businessHours()}
                </div>
                </div>

            </div>


        )
    }
}


export default Profile