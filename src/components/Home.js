import React, { Component } from "react";
import "./home.css";
import icon from "./assets/icon.svg";
import location from "./assets/location.png";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";
import { connect } from "react-redux";
import Login from "./modal/login/Login";
import Banner from "./Banner";
import Button from "./buttons/Button";
import Input from "./Input";
import {
  getUserInfo,
  addStylistName,
  addZip
} from "../ducks/actions/action_creators";
import Header from "./Header";
import styled from "styled-components";
import NavBar from "./NavBar";
import menu from "./assets/menu.png";
import search from "./assets/search.png";
import logo from "./assets/Artboard3.png";
import CustomMenu from "./dropdown/CustomMenu";

const Logo = styled.img`
  margin-left: 5%;
  width: 200px;
  height: 80px;
`;

const MenuButton = styled.button`
  display: none;
  @media (max-width: 900px) {
    background-image: url(${menu});
    width: 60px;
  }
`;
const Box = styled.div`
  height: 375px;
  width: 27%;
  margin: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RightBox = styled.div`
  width: 20%;
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

  button {
    width: 200px;
    font-size: 16px;
  }

  h6 {
    font-size: 16px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: Arial, Helvetica, sans-serif;
  justify-content: center;
`;
const H1 = styled.h1`
  font-size: 48px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
  margin-top: 3%;
`;
const Container = styled.div`
  position: relative;
  margin-bottom: 5%;
  border: solid transparent;

  button {
    margin-top: 10px;
  }
`;
const styledDiv = {
  display: "flex",
  alignItems: "center",
  width: "40%"
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showSignUp: false,
      keyword: "",
      user: [],
      firstName: "",
      lastName: "",
      zipcode: "",
      name: "",
      showUser: false,
      showMenu: false,
      input: "",
      full_name: this.props.userInfo.full_name,
      open: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidUpdate = () => {
    axios.get("/checkSession").then(res => {
      this.props.getUserInfo(res.data);
    });
  };

  handleInput = event => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.checked
    });
  };

  toggleModal = value => {
    this.setState(prevState => {
      return {
        showLogin: !prevState.showLogin,
        keyword: value
      };
    });
  };
  toggleSignUp = () => {
    this.setState(prevState => {
      return {
        showSignUp: !prevState.showSignUp
      };
    });
  };

  showModal = () => {
    if (this.state.showLogin) {
      return (
        <Login
          onClose={this.toggleModal}
          keyword={this.state.keyword}
          showLogin={this.state.showLogin}
          onClick={this.login}
        />
      );
    }
  };

  logout = () => {
    axios.get("/api/logout").then(res => {
      if (res.status === 200) {
        return this.menu();
      }
    });
  };

  menu = () => {
    this.setState(prevState => {
      return {
        open: !prevState.open
      };
    });
  };
  dropdown = () => {
    if (this.props.userInfo !== null) {
      if (this.state.open) {
        return (
          <CustomMenu
            open={this.state.open}
            logout={this.logout}
            login={this.toggleModal}
            toggleMenu={this.menu}
            name={this.state.full_name}
          />
        );
      }
    } else {
      if (this.state.open) {
        return (
          <CustomMenu
            open={this.state.open}
            userInfo={this.props.userInfo}
            logout={this.logout}
            login={this.toggleModal}
            toggleMenu={this.menu}
          />
        );
      }
    }
  };

  render() {
    return (
      <div>
         <Header>
         <Input placeholder="Search..." />
        </Header>

        {this.showModal()}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Banner>
            <h1> {`Discover & book beauty and barber appointments.`}</h1>
            <Container>
              <Input
                onChange={e => addStylistName(e.target.value)}
                name="name"
                placeholder="Haircut, salon name, stylist name"
              />
              <Input
                size="15px"
                positionX="5px"
                image={location}
                onChange={e => addZip(e.target.value)}
                placeholder="Enter city, state, or zipcode"
              />
              <Link to="/search">
                <Button>Search</Button>
              </Link>
            </Container>
          </Banner>

          <RightBox>
            <h1>Are you a beauty professional or barber?</h1>
            <h4>
              #1 Appointment booking software for independent professionals
            </h4>
            <Link to="/business">
              <Button>Set Up My Business</Button>
            </Link>
            <h6>30 day free trial, no card required.</h6>
          </RightBox>
        </div>
        <H1>{`Browse & Discover`}</H1>
        <Wrapper>
          <Box>
            <div className="floatBox">
              <h2>Top Barber </h2>
              <span className="float-text">Near You </span>
            </div>
            <img
              src="https://s3.us-east-2.amazonaws.com/styleseat/a-l-l-e-f-v-i-n-i-c-i-u-s-354911-unsplash.jpg"
              width="100%"
              height="100%"
              alt=""
            />
          </Box>

          <Box>
            <div className="floatBox">
              <h2> Special Event</h2>
              <span className="float-text">Look Great</span>
            </div>
            <img
              src="https://s3.us-east-2.amazonaws.com/styleseat/colette-allen-480460-unsplash.jpg"
              width="100%"
              height="100%"
              alt=""
            />{" "}
          </Box>

          <Box>
            <div className="floatBox">
              <h2> Fresh Cuts</h2>
              <span className="float-text">Looks You'll Love</span>
            </div>
            <img
              src="https://s3.us-east-2.amazonaws.com/styleseat/element5-digital-611462-unsplash.jpg"
              width="100%"
              height="100%"
              alt=""
            />{" "}
          </Box>

          <Box>
            <div className="floatBox">
              {" "}
              <h2>Most Booked</h2>
              <span className="float-text">This Week</span>
            </div>
            <img
              src="https://s3.us-east-2.amazonaws.com/styleseat/fezbot2000-365718-unsplash.jpg"
              width="100%"
              height="100%"
              alt=""
            />{" "}
          </Box>

          <Box>
            <div className="floatBox">
              {" "}
              <h2>Brighten Up</h2>
              <span className="float-text"> Stunning Hues Are In</span>
            </div>
            <img
              src="https://s3.us-east-2.amazonaws.com/styleseat/ivan-dodig-361699-unsplash.jpg"
              width="100%"
              height="100%"
              alt=""
            />
          </Box>

          <Box>
            <div className="floatBox">
              {" "}
              <h2>New Stylists</h2>
              <span className="float-text">This Week</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b65afe192a0efba2046ab14531040e06&auto=format&fit=crop&w=634&q=80"
              width="100%"
              height="100%"
              alt=""
            />{" "}
          </Box>

          <Box>
            {" "}
            <div className="floatBox">
              {" "}
              <h2>Top Nail Artists</h2>
              <span className="float-text">Near You</span>
            </div>
            <img
              src="https://s3.us-east-2.amazonaws.com/styleseat/sharon-mccutcheon-666323-unsplash.jpg"
              width="100%"
              height="100%"
              alt=""
            />
          </Box>

          <Box>
            <div className="floatBox">
              {" "}
              <h2>Color</h2>
              <span className="float-text">Highlight Your Season</span>
            </div>
            <img
              src="https://s3.us-east-2.amazonaws.com/styleseat/michael-dam-258165-unsplash.jpg"
              width="100%"
              height="100%"
              alt=""
            />
          </Box>

          <Box>
            <div className="floatBox">
              {" "}
              <h2>Available Today</h2>
              <span className="float-text">Near You</span>
            </div>
            <img
              src="https://s3.us-east-2.amazonaws.com/styleseat/kal-loftus-596319-unsplash.jpg"
              width="100%"
              height="100%"
              alt=""
            />
          </Box>
        </Wrapper>
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
