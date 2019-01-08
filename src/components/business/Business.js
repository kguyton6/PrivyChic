import React, { Component } from "react";
import businessLogo from "../assets/Artboard3.png";
import "./business.css";
import { Link } from "react-router-dom";
import BusinessSignUp from "../modal/signup/BusinessSignUp";
import menu from "../assets/menu.png";
import search from "../assets/search.png";
import Login from "../modal/login/Login";
import bell from "../assets/bell.png";
import down from "../assets/down-arrow.png";
import axios from "axios";
import { getUserInfo } from "../../ducks/actions/action_creators";
import { connect } from "react-redux";
import Button from "../buttons/Button";
import CustomMenu from "../dropdown/CustomMenu";
import Header from "../Header";
import Banner from "../Banner";
import styled from 'styled-components'
import NavBar from "../NavBar";

const Container = styled.div`
  position: relative;
  border: solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;

  button {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 200px;
    font-weight: bold;
  }

  h4 {
      font-size: 1em;
      color: white;
      font-weight: lighter;
  }
`;

class Business extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSignUp: false,
      businessLogin: false,
      showLogin: false,
      open: false,
      disabled: true
    };
  }

  componentDidMount = () => {
    axios.get("/checkSession").then(res => {
      this.props.getUserInfo(res.data);
      console.log(this.props.getUserInfo.full_name);
    });
  };

  toggleSignUp = () => {
    this.setState(prevState => {
      return {
        showSignUp: !prevState.showSignUp
      };
    });
  };
 
  logout = () => {
    axios.get("/api/logout").then(res => {
      if (res.status === 200) {
        return this.menu();
      }
    });
  };
  dropdown = () => {
    if (this.state.open) {
      return (
        <CustomMenu
          login={this.toggleLogin}
          open={this.menu}
          logout={this.logout}
        />
      );
    }
  };
  showModal = () => {
    if (this.state.showSignUp) {
      return (
        <Login
          onClose={this.toggleSignUp} />

      )
    }
 }

  render() {
    return (
      <>
        <Header >
            <NavBar >
            <span>Login</span>
            <span>Sign Up</span>
            </NavBar> 
            </Header>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Banner
            backgroundImage="https://s3.us-east-2.amazonaws.com/styleseat/attractive-beautiful-diversity-247204.jpg"
            size="1600px"
            width="80%"
            positionY="-100px"
          >
          <Container>
            <h1 marginTop='2%'>
              Be Independent.
              <br />
              Invest in Yourself.
              <br />
              Trust PrivyChic with the rest.
            </h1>
            <h4>
              #1 Appointment booking and online scheduling software for
              independent professionals.
            </h4>
            <Button onClick={() => this.toggleSignUp()}>
              Try It Now
            </Button>
            <h6 className="trial-text">
              30 day free trial, no card required
            </h6>
            </Container>
        {this.showModal()}
          </Banner>
        </div>

          <div >
            <h1>Why PrivyChic?</h1>
            <h2>
              Get the freedom to do what you love
            </h2>
          </div>
          <div className="boxes">
            <div className="outer-box">
              <span className="box1">1</span>
              <span className="box-title">Get Online</span>
              <p className="paragraph">
                Set up your professional website and let clients know you're
                available to be booked online. Include your services, business
                hours and photo gallery.
              </p>
            </div>
            <div className="outer-box">
              <span className="box1">2</span>
              <span className="box-title">Get Organized</span>
              <p className="paragraph">
                Manage your schedule and client notes. Appointment reminders are
                sent automatically.
              </p>
            </div>
            <div className="outer-box">
              <span className="box1">3</span>
              <span className="box-title">Get Booked</span>
              <p className="paragraph">
                Use your new VIP link to promote yourself online through social
                media, email marketing or by running a promotion. Make it easy
                for clients to find and book you.
              </p>
            </div>
            <div className="outer-box">
              <span className="box1">4</span>

              <span className="box-title">Get Paid</span>
              <p className="paragraph">
                Instantly accept credit card payments or set up a no-show late
                cancellation policy. Get next day payouts directly to your bank
                account.
              </p>
            </div>
          </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  const { userInfo } = state;
  return {
    userInfo
  };
};

const bindActionCreators = { getUserInfo };
export default connect(
  mapStateToProps,
  bindActionCreators
)(Business);
