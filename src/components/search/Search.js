import React, { Component } from "react";
import { connect } from "react-redux";
import location from "../assets/location.png";
import "./search.css";
import Login from "../modal/login/Login";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Input from "../Input";
import Header from "../Header";
import CustomMenu from "../dropdown/CustomMenu";
import { addTimes,addZip,addStylistName, getUserInfo } from "../../ducks/actions/action_creators";
import Button from "../buttons/Button";
import Schedule from "../dropdown/Schedule";
import styled from 'styled-components'
import NavBar from '../NavBar'
import search from '.././assets/search.png'
import StylistCard from './StylistCard'
import Banner from '../Banner'


const StyledHeader = styled(Header)`
    input {
        width: 10%;
        border: solid .1px rgb(230, 230, 230);

    }
    button {
        width: 8%;
        height: 42px;
    }
`

class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      stylists: [],
      acceptsPayment: false,
      showLogin: false,
      appointments: false,
      availability: [],
      calendar: [],
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
      )}
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
          <StylistCard stylist={stylists[i] } id={stylists[i].business_id}/>


        );
      }

      return stylist;
    } else {
      return (
        <h1>
          No Search Results
        </h1>
      );
    }
  };

  paymentFilter = () => {
    this.setState({ acceptsPayment: true });
  };

  toggleModal = () => {
    this.setState(prevState => {
      return {
        showLogin: !prevState.showLogin
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

          <StyledHeader>
            <Input type='text' placeholder='Search by name' />        
            <Input type='text' placeholder='Search by zipcode' image={location} size='14px' positionX='5px'/>
            <Input type='Date' image='none' indent='10px' height='43px'/> 
            <Button>Search</Button>
            <NavBar>

              <Link to="/search"> 
                <img
                  src={search}
                  className="search"
                  width="25px"
                  alt="search"
                />
              </Link>

         </NavBar>
         </StyledHeader> 
           


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
