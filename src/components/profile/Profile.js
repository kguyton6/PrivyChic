import React, { Component } from "react";
import axios from "axios";
import "./profile.css";
import Services from "./Services";
import "../../reset.css";
import { connect } from "react-redux";
import {
  addStylistName,
  // addStylist
} from "../../ducks/actions/action_creators";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import Header from "../Header";
import logo from '../assets/whiteLogo.png'
import {Link} from 'react-router-dom'


const Main = styled.div`
  display: flex;
  justify-content: space-evenly;
  p > span {
    font-size: 16px;
    font-weight: lighter;
    color: rgb(9, 173, 165);
    text-align: center;
  }
  p {
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  section {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

  }
  ul {
    line-height: 20px;
    margin: 20px;
    color: gray;
  }
  ul > h1 {
    font-size: 16px;
    text-align: center;
    color: black;
  }
  @media(max-width: 768px){
    flex-direction: column;
    ul{line-height: 15px;}
    ul > h1 {font-size: 14px;}
    li {font-size: 12px;}
    p > span {font-size: 14px; }
    section {flex-direction: row; align-items: center;}
  }
  @media(max-width: 500px){
   
  }

  
`;
const Pic = styled.img`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  position: absolute;
  left: 5%;
  bottom: -30px;
  z-index: 1;
  @media(max-width: 1200px){
    height: 130px;
    width: 130px;
  }
  @media(max-width: 768px){
    height: 110px;
    width: 110px;
  }
  @media(max-width: 500px){
    height: 90px;
    width: 90px;
  }
`;


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: [],
      stylist_name: "",
      loginModal: false,
      services: [],
      calendar: [],
      showTitles: true,
      open: false,
      showLogin: false,
      hours: []
    };
  }

  componentDidMount = async () => {
    let profile = await axios.get(`/api/profile/${this.props.match.params.id}`);
    let services = await axios.get(
      `/api/services/${this.props.match.params.id}`
    );
    // this.props.addStylist(profile.data.profile);
    this.setState({
      profile: profile.data.profile[0],
      stylist_name: profile.data.profile[0].full_name,
      hours: profile.data.hours[0],
      services: services.data.service,
      calendar: services.data.calendar
    });
  };

  showProfile = () => {
    const { profile } = this.state;
    return (
        <Portfolio background={profile.portfolio} name={profile.full_name}>
          <Pic src={profile.picture} alt="profile-pic" />
        </Portfolio>
      );
  };
  showAddress = () => {
  const {profile} = this.state
      return (
          <p >
            <h1 style={{textTransform: 'uppercase', color: 'black'}}>
              {profile.full_name}
            </h1>
            <span>{profile.streetaddress}</span>
            <span>{profile.business_name}</span>
            <span>{`${profile.city}, ${profile.state} ${
              profile.zipcode
            }`}</span>
            <h5 >{profile.phone_number}</h5>
          </p>
      );
  };

  businessHours = () => {
    let { hours } = this.state;
      return (
          <ul key={hours.id}>
            <h1 >BUSINESS HOURS</h1>
            <li>{` Sunday: ${hours.sunday}`}</li>
            <li>{` Monday: ${hours.monday}`}</li>
            <li>{` Tuesday: ${hours.tuesday}`}</li>
            <li>{` Wednesday: ${hours.wednesday}`}</li>
            <li>{` Thursday: ${hours.thursday}`}</li>
            <li>{` Friday: ${hours.friday}`}</li>
            <li>{` Saturday: ${hours.saturday}`}</li>
          </ul>
      );
    }
  

  toggleModal = showLogin => {
    let loginModal = showLogin;
    loginModal = this.state.loginModal;
    this.setState(prevState => {
      return {
        loginModal: !prevState.loginModal
      };
    });
  };
  showServiceTitles = () => {
    this.setState(prevState => {
      return {
        showTitles: !prevState.showTitles
      };
    });
  };

  render() {

    const {full_name} = this.state.profile
    console.log(full_name)
    return (
      <div>
        <Header background='transparent' backgroundColor='white' title={<Link to='/search' style={{color: 'white'}} className='title'>PrivyChic</Link>} position='fixed'  />

        {this.showProfile()}
        <Main>
          <Services 
          title={this.showServiceTitles}
          services={this.state.services}
          calendar={this.state.calendar}
          showAvailability={this.showAvailability}
          name={full_name}/>
          <section>
          {this.showAddress()}
          {this.businessHours()}
          </section>
        </Main>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { stylists, stylist_name } = state;
  return {
    stylists,
    stylist_name
  };
};

const bindActionCreators = { addStylistName };
export default connect(
  mapStateToProps,
  bindActionCreators
)(Profile);
