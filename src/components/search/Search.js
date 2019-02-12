import React, { Component } from "react";
import { connect } from "react-redux";
import location from "../assets/location.png";
import {Link} from 'react-router-dom'
import axios from "axios";
import Input from "../Input";
import Header from "../Header";
import CustomMenu from "../menu/CustomMenu";
import {
  addTimes,
  addZip,
  addStylistName,
  getUserInfo,
  addStylists
} from "../../ducks/actions/action_creators";
import { StyledBtn as Button } from "../buttons/Button";
import Schedule from "../menu/Schedule";
import styled from "styled-components";
import StylistCard from "./StylistCard";


const StyledHeader = styled(Header)`
  div > input {
    border: solid 0.1px rgb(230, 230, 230);
    background-position-y: 5px;
    ::placeholder{
      color: gray;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 12px;
    }
  }
  button {
    width: 80px;
    height:45px;
    text-transform: uppercase;
  }
`;
const NoResults = styled.h1`
  text-align: center;
  margin-top: 10%;
`;

const InputWrapper = styled.form`
  width: 50%;
  input {width: 165px;}
  @media screen and (max-width: 900px){
    display: none;
  }
`

const ZipInput = styled(Input)`
  display:none;
  @media(max-width: 900px){
    display: inline;
    border-radius: 2px;
    width: 100%;
    color: grey;
  }

`
const NameInput = styled(Input)`
  display: none;
  @media (max-width: 900px){
    display: inline;
    border-radius: 2px;
    width: 100%;
    color: grey; 
  }
  @media(max-width: 450px){
    display: none;
  }
`
const SearchContainer = styled.div `
        div > form {display: none;}

      @media(max-width: 900px){
        header + div {
          justify-content: space-between;
        }
        div > span {
          font-size: 12px;

        }
        div > form {
          display: flex;
          width: 60%;
          button{
            display: hidden;
          }
        }
      }
`

class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      stylists: [],
      acceptsPayment: false,
      appointments: false,
      availability: [],
      calendar: [],
      open: false,
      service_id: null,
      stylist_name: this.props.stylist_name,
      zip: this.props.zipcode,
      keyword: '',
      date:  '',
      results: 'No Results',
      disabled: true,
      error: 'Invalid Zipcode'
    };
  }

  componentDidMount = () => {
    const {zipcode, stylist_name} = this.props
    if(zipcode){
    return this.searchByZip(zipcode)

  } else if(stylist_name) {
    return this.searchByName(stylist_name)
  } else {
    return null
  }
}
findMethod = () => {
  if(this.state.zip){
    return this.searchByZip(this.state.zip)
  } else if(this.state.stylist_name){
    return this.searchByName(this.state.stylist_name)
  } else {
    return this.isValidDate(this.state.date)
  }
}
  
  searchByZip = (val) => {
    if(val.length < 5){
     return alert(this.state.error)
    } else {
      axios
        .get(`/api/zipcode/${val}`)
        .then(res => {
          this.props.addStylists(res.data)
          this.setState({
            zip: '',
            disabled: true
          });
          return this.props.addZip('')
        }).catch(err => console.log(err))
  };
}


searchByName = (value) => {
  value = value.toLowerCase()
  axios
    .get(`/api/availability/${value}`)
    .then(res => {
      this.props.addStylists(res.data)
      this.setState({
        stylist_name: '',
        disabled: true
      });
      this.props.addStylistName('')
    }).catch(err => console.log(err))
  }

searchByDate = () => {
  axios.get(`/api/date/${this.state.date}`)
  .then((res) => {
    if(res.data.length > 0){
    this.setState({
      date: '',
      disabled: true
    });

  } else {
    this.setState({results: 'Sorry, no availibility', stylists: []})
  }
})
  
}

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value,
    disabled: false})
     
  }
  handleSubmit = (e) => {
    e.preventDefault()
    return this.findMethod()
  }

  showStylist = () => {
    return this.props.stylists.map((stylist, i) =>  {
       return (
        this.setTimer(),
        <StylistCard key={i} stylist={stylist} id={stylist.business_id} />
        );
      })
}
  


  paymentFilter = () => {
    this.setState({ acceptsPayment: true });
  };

  showPaymentFilter = () => {
    axios.get(`/api/payments`).then(res => {
      this.props.addStylists(res.data);
    });
  };

  dropdown = () => {
    if (this.state.open) {
      return <CustomMenu open={this.state.open} login={this.toggleModal} />;
    }
  };

  setTimer = () => {
    setTimeout(() => {
        this.props.addStylists([])
    }, 80000);
  }
  render() {
    return (
      <SearchContainer>
        <StyledHeader title={<Link to='/' className='title' >PrivyChic</Link>} links={<span>Features</span>}>
        <InputWrapper onSubmit={this.findMethod}>
          <Input
            name='stylist_name'
            value={this.state.stylist_name}
           type="text" 
           placeholder="Search by name" 
           onChange={this.handleChange}/>
          <Input
           color='lightgrey'
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
          <Button type='submit' disabled={this.state.disabled} onClick={this.findMethod} fontWeight="bolder" fontSize="14px" name="Search"
           />
           </InputWrapper>
        </StyledHeader>

        <div style={{ display: "flex",  margin: "3%" }}>
        <form 
        onSubmit={this.handleSubmit}>
        <ZipInput
            type="integer"
            placeholder="Search by zipcode"
            image={location}
            size="20px"
            right='none'
            name='zip'
            value={this.state.zip}
            onChange={this.handleChange}
          />
          <NameInput 
           placeholder='Search by name'
           name='stylist_name'
           onChange={this.handleChange}
           value={this.state.stylist_name}
          />
          <button onClick={this.findMethod} />
          </form>
          <span>
            Accepts Payment
            <input
              onChange={this.showPaymentFilter}
              type="checkbox"
              width="15px"

            />
          </span>
        </div>
        {this.props.stylists.length > 0 ? ( 
        <div>{this.showStylist()}</div>
        ) : (
        <NoResults>{this.state.results}</NoResults>
        )}
      </SearchContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    zipcode: state.zipcode,
    stylist_name: state.stylist_name,
    date: state.date,
    keyword: '',
    stylists: state.stylists
  };
};

const bindActionCreators = { addStylists, addTimes, addZip, addStylistName, getUserInfo };

export default connect(
  mapStateToProps,
  bindActionCreators
)(Search);
