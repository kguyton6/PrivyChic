import React, { Component } from "react";
import './business.css'
import { connect } from "react-redux";
import {StyledBtn as Button} from "../buttons/Button";
import Header from "../Header";
import Banner from "../Banner";
import styled from 'styled-components'
import Login from "../modal/login/Login";
const Title = styled.div`
margin-top: 3%;
text-align: center;
  h1 {
    font-size: 32px;
    font-weight: 700;
  }
  h2 {
    font-size: 18px;
    margin-bottom: 15px;
  }
  h1, h2{
font-family: sans-serif;
line-height: 42px;


  }
`
const Boxes = styled.div`
  width: 100%;
  padding: 3%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  div {
    margin: 3%;
  }
  h1 {
    font-weight: 700;
    font-size: 15px;
  }
  @media (max-width: 900px){
    padding-left: 80px;
    padding-right: 80px;
  }
  

`
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
      disabled: true,
      isBusiness: true
    };
  }

  toggleSignUp = () => {
    this.setState( prevState => {
      return { showSignUp: !prevState.showSignUp,
      disabled: false }
    })
  }
  showModal = () => {
    if (this.state.showSignUp) {
      return (
        <Login
          isBusiness={this.state.isBusiness}
          onClose={this.toggleSignUp}
          disabled={this.state.disabled}
        />
      );
    }
  };


    
  
  render() {
    return (
      <div>
        <Header links={<><span key={1}>Pricing</span><span>Blog</span></> }
        /> 
        {this.showModal()}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Banner
            business
            
          >
            <h1 >
              Be Independent.
              <br />
              Invest in Yourself.
              <br />
              Trust PrivyChic with the rest.
            </h1>
            <h3>
              #1 Appointment booking and online scheduling software for
              independent professionals.
            </h3><br/>
            <Button onClick={this.toggleSignUp} name='Try It Now' height='60px' width='210px'/><br/><br/>
            <h4>
              30 day free trial, no card required
            </h4>
          </Banner>
        </div>

          <Title>
            <h1>Why PrivyChic?</h1>
            <h2>
              Get the freedom to do what you love
            </h2>
          </Title>
          <Boxes>
            <div className="outer-box">
              <span className="box1">1</span>
              <h1>Get Online</h1>
              <p className="paragraph">
                Set up your professional website and let clients know you're
                available to be booked online. Include your services, business
                hours and photo gallery.
              </p>
            </div>
            <div className="outer-box">
              <span className="box1">2</span>
              <h1>Get Organized</h1>
              <p className="paragraph">
                Manage your schedule and client notes. Appointment reminders are
                sent automatically.
              </p>
            </div>
            <div className="outer-box">
              <span className="box1">3</span>
              <h1>Get Booked</h1>
              <p className="paragraph">
                Use your new VIP link to promote yourself online through social
                media, email marketing or by running a promotion. Make it easy
                for clients to find and book you.
              </p>
            </div>
            <div className="outer-box">
              <span className="box1">4</span>

              <h1>Get Paid</h1>
              <p className="paragraph">
                Instantly accept credit card payments or set up a no-show late
                cancellation policy. Get next day payouts directly to your bank
                account.
              </p>
            </div>
          </Boxes>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { user } = state;
  return {
    user
  };
};

export default connect(
  mapStateToProps
)(Business);
