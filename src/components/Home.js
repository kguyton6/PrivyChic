import React, { Component } from "react";
import icon from "./assets/icon.svg";
import location from "./assets/location.png";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";
import { connect } from "react-redux";
import Banner from "./Banner";
import Button, {BusinessButton, StyledBtn} from "./buttons/Button";
import Input, {SearchInput} from "./Input";
import {
  getUserInfo,
  addStylistName,
  addZip
} from "../ducks/actions/action_creators";
import Header from "./Header";
import styled from "styled-components";
import menu from "./assets/menu.png";
import LinkBox from './LinkBox'

const Box = styled.div`
background-image: url(${props => props.image});
background-repeat:no-repeat;
box-sizing: border-box;
background-position-y: ${props => props.y };
background-size: ${props => props.size || '100%'};
  height: 375px;
  width: 320px;
  margin: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  h2 {
    font-family: 'Work Sans', sans-serif;
    font-size: 26px;
    line-height: 35px;
  }
  span {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;

  }
    .inner-box{
    width: 60%;
    height: 30%;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.774);
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    text-align: center;
    justify-content: center;
    font-weight: lighter;
    transition-property: width, height;
    transition-duration: .5s;
  }
  .inner-box:hover {
    height: 40%;
    width: 65%;
    transition-duration: .25s;
  }
  @media(max-width: 1200px){
    width: 250px;
    height: 300px;
  }
  @media(max-width: 900px){
    h2{font-size: 20px;}
    span{font-size: 10px;}
    .inner-box{ font-size: 10px;}
  }

`;
const RightBox = styled.div`
  width:20%;
  padding: 35px;
  background-color: rgb(36, 36, 36);
  height: auto;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  h1 {
    font-size: 26px;
  }
  h4 {
    font-size: 20px;
    font-weight: lighter;
  }

  /* button {
    width: 200px;
    font-size: 16px;
  } */

  h6 {
    font-size: 16px;
  }
  @media(max-width: 1200px){
    h1 {font-size: 20px;}
    h4 {font-size: 16px;}
    h6 {font-size: 12px;}
  }
  @media(max-width: 768px){
    width: 80%;
    h1, h4, h6 {
      margin: 10px;
    }
  @media(max-width: 500px){
    h1, h4, h6{display: none;}
  }
  }

  
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: Arial, Helvetica, sans-serif;
  justify-content: center;
  width: 90%;
  padding: 20px;

`;
const H1 = styled.h1`
  font-size: 48px;
  text-align: center;
  font-family: 'Work Sans', sans-serif;
  margin-top: 3%;
  @media(max-width: 950px){
    font-size: 38px;
  }
`;
const Container = styled.div`
  position: relative;
  /* margin-bottom: 5%; */
  border: solid transparent;

  button {
    margin-top: 10px;
  }
`;
const StyledInput = styled(Input)`
  @media (max-width: 900px){
    display: none;
  }
`
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showSignUp: false,
      user: [],
      firstName: "",
      lastName: "",
      zipcode: "",
      name: "",
      showUser: false,
      showMenu: false,
      input: "",
      full_name: '',
      open: false,
      disabled: true
    };

  }

 

  handleInput = event => {
    this.setState({
      keyword: event.target.value
    });
  };
 handleSearch = (e) => {
   e.preventDefault();
   console.log(e.target.value)
   this.props.addStylistName(e.target.value)
  return this.props.history.push('/search')
 }
  
  render() {
    return (
      <div>
         <Header
          Button={<Link to='/business'><BusinessButton backgroundColor='#353737'>For Business</BusinessButton></Link>}>
         <StyledInput
         onChange={(e) => this.setState({input: e.target.value})}
         placeholder="Search" 
        />
        <SearchInput 
         onSubmit={(e) => this.handleSearch(e)} 
         onChange={(e) => this.setState({input: e.target.value})}
         placeholder="Search" 
        /> 
        </Header>
        <div style={{ display: "flex", justifyContent: "center", flexWrap:'wrap' }}>
          <Banner>
          <LinkBox value={this.state.keyword} onChange={this.handleInput}/>
          </Banner>

          <RightBox>
            <h1>Are you a beauty professional or barber?</h1>
            <h4>
              #1 Appointment booking software for independent professionals
            </h4>
            <Link to="/business">
              <StyledBtn name='Set Up My Business'></StyledBtn>
            </Link>
            <h6>30 day free trial, no card required.</h6>
          </RightBox>
        <H1>{`Browse & Discover`}</H1>
        <Wrapper>
          <Box image="https://s3.us-east-2.amazonaws.com/styleseat/wedding.jpeg">
            <div className="inner-box">
              <h2> Special Event</h2>
              <span >Look Great</span>
            </div>
          </Box>

          <Box image="https://s3.us-east-2.amazonaws.com/styleseat/freshcut.jpeg">
            <div className="inner-box">
              <h2> Fresh Cuts</h2>
              <span >Looks You'll Love</span>
            </div>
           
          </Box>

          <Box image="https://s3.us-east-2.amazonaws.com/styleseat/fezbot2000-365718-unsplash.jpg">
            <div className="inner-box">
              <h2>Most Booked</h2>
              <span >This Week</span>
            </div>
          </Box>
          <Box 
          y='-50px'
          image="https://s3.us-east-2.amazonaws.com/styleseat/beard.jpeg">
          <div className='inner-box'>
              <h2>Top Barber </h2>
              <span >Near You </span>
              </div>
          </Box>

          <Box image="https://s3.us-east-2.amazonaws.com/styleseat/ivan-dodig-361699-unsplash.jpg">
            <div className="inner-box">
              <h2>Brighten Up</h2>
              <span > Stunning Hues Are In</span>
            </div>
          </Box>

          <Box image='"https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b65afe192a0efba2046ab14531040e06&auto=format&fit=crop&w=634&q=80"'>
            <div className="inner-box">
              <h2>New Stylists</h2>
              <span >This Week</span>
            </div>
  
          </Box>

          <Box image="https://s3.us-east-2.amazonaws.com/styleseat/nail.jpeg">
            <div className="inner-box">
              <h2>Top Nail Artists</h2>
              <span >Near You</span>
            </div>
        
          </Box>

          <Box image="https://s3.us-east-2.amazonaws.com/styleseat/michael-dam-258165-unsplash.jpg">
            <div className="inner-box">
              <h2>Color</h2>
              <span >Highlight Your Season</span>
            </div>
          </Box>

          <Box image="https://s3.us-east-2.amazonaws.com/styleseat/kal-loftus-596319-unsplash.jpg">
            <div className="inner-box">
              <h2>Available Today</h2>
              <span >Near You</span>
            </div>
          </Box>
        </Wrapper>
        </div>

      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    zipcode: state.zipcode,
    userInfo: state.userInfo,
    stylist_name: state.stylist_name
  };
};

const bindActionCreators = { getUserInfo, addStylistName, addZip };
export default withRouter(
  connect(
    mapStateToProps,
    bindActionCreators
  )(Home)
);
