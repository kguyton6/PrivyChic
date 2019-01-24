import React, { Component } from 'react'
import axios from 'axios';
import './profile.css'
import Services from './Services'
import '../../reset.css'
import {connect} from 'react-redux'
import {addStylistName} from '../../ducks/actions/action_creators'
import styled from 'styled-components'
import Portfolio from './Portfolio'
import Header from '../Header'
import ServiceBox from '../ServiceBox'



  const Main = styled.div`
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
  
  `
  const Pic = styled.img`
    border-radius: 50%;
    height: 200px;
    width: 200px;
    position: absolute;
    left: 5%;
    top: 45vh;

  `
const StyledPortfolio = styled(Portfolio)`
    .stars {
        position: absolute;
        left: 25%;
    }
`

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
    
  
    showProfile = () => {
        let profile = this.state.profile
        let stylist = []
        for (let i in profile) {
            console.log(profile[i].portfolio)
            stylist.push(

                <StyledPortfolio background={profile[i].portfolio}>
                <Pic src={profile[i].picture} alt='profile-pic' />
                    <h1>{profile[i].full_name.toUpperCase()}</h1>

                {/* <div className='stars' key={profile[i].id} >
                       {`${profile[i].full_name} - Hair Stylist`}<br/>
                       <span> {profile[i].profession}</span>
                    <img src={star} width='25px'className='star'/> <img src={star} width='25px'className='star'/><img src={star} width='25px'/>

                    </div> */}
                </StyledPortfolio>

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

            <div>
                <Header title={'Privy'} color='white'/>
             
                {this.showProfile()}
                <Main>
                <ServiceBox>
                <h1 className='service-menu-title'>{`${this.state.stylist_name}'s Service Menu`}</h1>
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

                </ServiceBox>
                 {this.showAddress()}


                {this.businessHours()}
    </Main>
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