import React, { Component } from "react";
import { connect } from "react-redux";
import downArrow from "../assets/down-arrow.png";
import logo from "../assets/Artboard1.png";
import location from "../assets/location.png";
import icon from "../assets/icon.svg";
import "./search.css";
import check from "../assets/checkmark.png";
import Login from "../modal/login/Login";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import profile from "../assets/profile.png";
import Input from "../Input";
import Header from "../Header";
import CustomMenu from "../dropdown/CustomMenu";
import { addTimes,addZip,addStylistName, getUserInfo } from "../../ducks/actions/action_creators";
import Button from "../buttons/Button";
import Schedule from "../dropdown/Schedule";
import styled from 'styled-components'
import NavBar from '../NavBar'

const availableTimes = {
  fontColor: "black",
  borderStyle: "solid",
  borderColor: "black",
  fontSize: "12px",
  height: "50%"
};
const Logo = styled.img`
  margin-left: 5%;
  width: 200px;
  height: 80px;

`;

const StyledDiv = styled.div `
    width: 80%;

    input {
        width: 15%;
        height: 35px;

    }
`

class Search extends Component {
  constructor(props, context) {
    super(props, context);

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
    };
  }

  componentDidMount = () => {
    if (this.props.zipcode) {
      axios.get(`/api/zipcode/${this.props.zipcode}`).then(
        res => {
          this.setState({
            stylists: res.data,
            full_name: res.data[0].full_name
          });
        },
        axios.get("/checkSession").then(res => {
          this.props.getUserInfo(res.data);
        })
      );
    }
  };

  findStylist = () => {
    if (this.props.stylist_name) {
      axios
        .get(`/api/name/${this.props.stylist_name.toUpperCase()}`)
        .then(res => {
          this.setState({
            stylists: res.data,
            profileImage: res.data[0].picture,
            full_name: res.data[0].full_name
          });
        });
    } else if (this.props.zipcode) {
      axios.get(`/api/zipcode/${this.props.zipcode}`).then(res => {
        this.setState({ stylists: res.data, full_name: res.data[0].full_name });
      });
    } else {
      axios.get(`/api/date/${this.props.date}`).then(res => {
        this.setState({
          stylists: res.data,
          profileImage: res.data[0].picture,
          full_name: res.data[0].full_name
        });
      });
    }
  };

  showStylist = () => {
    if (this.state.stylists && this.state.stylists.length) {
      let stylists = this.state.stylists;
      let stylist = [];
      for (let i in stylists) {
        stylist.push(
          <div key={i} className="stylist-card">
            <div className="responsive-box">
              <img src={stylists[i].portfolio} width="100%" height="100%" />
            </div>
            <div className="profile-main-box">
              <div className="responsive-title">
                {`${stylists[i].full_name}-${stylists[i].profession}`}
              </div>
              <span className="service-filter">
                Multiple Services
                <img
                  src={downArrow}
                  alt="down"
                  className="down"
                  width="15px"
                  height="10px"
                />
              </span>
              <div className="profile-box">
                <div className="search-profile-pic">
                  <img
                    src={stylists[i].picture}
                    alt="profile"
                    className="picture"
                    width="100%"
                    height="100%"
                  />
                  <span className="stylist-name">{stylists[i].full_name}</span>
                </div>
              </div>
              <div className="availability">
                <div className="availability-filter">
                  <Button
                    onClick={() =>
                      this.showAvailability(stylists[i].business_id)
                    }
                    className="availability-text"
                  >
                    Check Availability
                  </Button>
                </div>
              </div>
            </div>
            <Link
              to={`/profile/${stylists[i].business_id}`}
              className="view-photos"
            >
              View Profile
            </Link>
          </div>
        );
      }

      return stylist;
    } else {
      return (
        <div className="no-results">
          No Search Results
          <Logo src={logo} alt='logo'/>
        </div>
      );
    }
  };

  paymentFilter = () => {
    this.setState({ acceptsPayment: true });
  };

  toggleModal = () => {
    this.setState(prevState => {
      return {
        showLoginModal: !prevState.showLoginModal
      };
    });
  };

  showAvailability = id => {
    this.setState(prevState => {
      return {
        availability: !prevState.availability,
        service_id: id
      };
    });
  };
  showPaymentFilter = () => {
    axios.get(`/api/payments`).then(res => {
      this.setState({ stylists: res.data });
    });
  };

  showModal = () => {
    if (this.state.showLoginModal) {
      return (
        <Login
          onClose={this.toggleModal}
          showLogin={this.state.showLoginModal}
        />
      );
    }
  };
  menu = () => {
    this.setState(prevState => {
      return {
        open: !prevState.open
      };
    });
  };
  dropdown = () => {
    if (this.state.open) {
      return <CustomMenu open={this.state.open} login={this.toggleModal} />;
    }
  };

  showSchedule = () => {
    if (this.state.showAvailability) {
      return <Schedule onClose={this.showAvailability} />;
    }
  };
  render() {
    console.log(this.state.calendar);
    const { addDate, addStylistName, addZip, stylist_name, date, zipcode } = this.props;
    return (
      <div >

          <Header>
            <Input type='text' placeholder='Search by name' />        
            <Input type='text' placeholder='Search by zipcode' image={location} size='14px' positionX='5px'/>
            <Input type='Date' image='none' indent='10px'/> 
         </Header> 
           


        <span className="filter-text">FILTERS</span>
        <span className="payments-text">
          Accepts Payment
          <input
            onChange={this.showPaymentFilter}
            type="checkbox"
            width="15px"
            className="payment-checkbox"
          />
        </span>
        {this.showModal()}

        <div className="stylist-container">{this.showStylist()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    zipcode: state.zipcode,
    stylist_name: state.stylist_name,
    date: state.date
  };
};

const bindActionCreators = { addTimes, addZip, addStylistName, getUserInfo };

export default connect(
  mapStateToProps,
  bindActionCreators
)(Search);
