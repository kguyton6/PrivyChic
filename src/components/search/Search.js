import React, { Component } from "react";
import { connect } from "react-redux";
import location from "../assets/location.png";
import axios from "axios";
import Input from "../Input";
import Header from "../Header";
import CustomMenu from "../dropdown/CustomMenu";
import {
  addTimes,
  addZip,
  addStylistName,
  getUserInfo,
  addStylist
} from "../../ducks/actions/action_creators";
import { StyledBtn as Button } from "../buttons/Button";
import Schedule from "../dropdown/Schedule";
import styled from "styled-components";
import StylistCard from "./StylistCard";


const StyledHeader = styled(Header)`
  input {
    width: 20%;
    height: 35px;
    border: solid 0.1px rgb(230, 230, 230);
    background-position-y: 5px;
    ::placeholder{
      color: gray;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 12px;
    }
  }
  button {
    width: 10%;
    height:35px;
    text-transform: uppercase;
  }
`;
const NoResults = styled.h1`
  text-align: center;
  margin-top: 10%;
`;

const InputWrapper = styled.div`
  width: 60%;
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
      service_id: null,
      stylist_name: this.props.stylist_name,
      zip: this.props.zipcode,
      keyword: '',
      date:  '',
      results: 'No Results'
    };
  }

  componentDidMount = () => {
    const {zipcode, stylist_name} = this.props
    if(zipcode){
    return this.findByZip(zipcode)

  } else {
    return this.findStylist(stylist_name)
  }
}
findMethod = () => {
  if(this.state.zip){
    return this.findByZip(this.state.zip)
  } else if(this.state.stylist_name){
    return this.findStylist(this.state.stylist_name)
  } else {
    return this.getAvailability(this.state.date)
  }
}
  
  findByZip = (val) => {
      axios
        .get(`/api/zipcode/${val}`)
        .then(res => {
          this.setState({
            stylists: res.data,
            profileImage: res.data[0].picture,
            full_name: res.data[0].full_name,
            zipcode: null,
          });
          this.props.addZip(null)
        }).catch(err => console.log(err))
  };


findStylist = (value) => {
  console.log(value)
  axios
    .get(`/api/availability/${value}`)
    .then(res => {
      this.setState({
        stylists: res.data,
        profileImage: res.data[0].picture,
        full_name: res.data[0].full_name,
        stylist_name: ''
      });
      this.props.addStylistName('')
    }).catch(err => console.log(err))
  }

getAvailability = () => {
  axios.get(`/api/date/${this.state.date}`)
  .then((res) => {
    if(res.data.length > 0){
    this.setState({
      stylists: res.data,
      // profileImage: res.data[0].picture,
      // full_name: res.data[0].full_name,
      date: ''
    });
  } else {
    this.setState({results: 'Sorry, no availibility', stylists: []})
  }
})
}

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
     
  }

  showStylist = () => {
    if (this.state.stylists && this.state.stylists.length) {
      let stylists = this.state.stylists;
      let stylist = [];
      for (let i in stylists) {
        stylist.push(
          <StylistCard key={stylists[i].business_id} stylist={stylists[i]} id={stylists[i].business_id} />
        );
      }
      return stylist;
    }
  };
  


  paymentFilter = () => {
    this.setState({ acceptsPayment: true });
  };

  showPaymentFilter = () => {
    axios.get(`/api/payments`).then(res => {
      this.setState({ stylists: res.data });
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

    return (
      <div>
        <StyledHeader title={<h1 aria-label='Home'className='title'>PrivyChic</h1>} links={<span>Features</span>}>
        <InputWrapper>
          <Input
            name='stylist_name'
            value={this.state.stylist_name}
           type="text" 
           placeholder="Search by name" 
           onChange={this.handleChange}/>
          <Input
           color='lightgrey'
            y='30px'
            type="text"
            placeholder="Search by zipcode"
            image={location}
            size="20px"
            positionX="5px"
            name='zip'
            value={this.state.zip}
            onChange={this.handleChange}
          />
          <Input 
          name='date'
          value={this.state.date}
          onChange={this.handleChange}
          style={{color: 'grey', fontWeight: 'lighter'}}
          type="Date" image="none" indent="10px" />
          <Button onClick={this.findMethod} fontWeight="bolder" fontSize="14px" name="Search"
           />
           </InputWrapper>
        </StyledHeader>

        <div style={{ display: "flex", flexDirection: "column", margin: "3%" }}>
          <span>
            Accepts Payment
            <input
              onChange={this.showPaymentFilter}
              type="checkbox"
              width="15px"

            />
          </span>
        </div>
        {this.state.stylists.length > 0 ? ( 
        <div>{this.showStylist()}</div>
        ) : (
        <NoResults>{this.state.results}</NoResults>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    zipcode: state.zipcode,
    stylist_name: state.stylist_name,
    date: state.date,
    keyword: ''
  };
};

const bindActionCreators = { addStylist, addTimes, addZip, addStylistName, getUserInfo };

export default connect(
  mapStateToProps,
  bindActionCreators
)(Search);
