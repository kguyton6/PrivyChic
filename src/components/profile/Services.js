import React, { Component } from "react";
import Availability from "./Availability";
import styled from "styled-components";
import moment from 'moment'
import StyledBtn from '../buttons/Button'

const ServiceBox = styled.div`
  width: 40%;
  height: auto;
  padding-bottom: 10%;
  border: solid #06d8cc thin;
  padding: 3%;
  position: relative;
  content: contain;
  color: black;
  z-index: -1;

  
    i {
        position: absolute;
        left: 10px;
        top: 10px;
        font-size: 12px;
        cursor: pointer;
    }
  h1 {
    text-align: center;
    font-size: 28px;
    padding-bottom: 10px;
    
  }
  li {
    font-size: 24px;
  }
  #price, .price-title {
    position: absolute;
    left: 45%;
}
span > p {
    font-size: 12px;
    text-align: left;
}
div > span {
    height: 20px;
    width: 200px;
    line-height: 20px;
    overflow-wrap:break-word;
}
@media(max-width: 900px){
    span > p {
        display: none;
    }
    h1 {font-size: 24px;}
}
@media(max-width: 768px){
    width: 80%;
    margin-left: 10%;
    span > p { display: inline; }

@media(max-width: 450px){
    span>p {display: none;}
    div > label {font-size: 13px; line-height: 25px;}
    #price{line-height: 24px;}
    button {
        width: 80px;
        height: 20px;
    }
    div > span {font-size: 12px; }

}
} 
`;
const Button = styled(StyledBtn)`
    width: 100px;
    height: 30px;
    position: absolute;
    right: 8%;
    background-color: rgb(9,173,165);
    color: white;
  
`
const Wrapper = styled.div`
    display: flex;
    padding: 5%;
    
`

class Services extends Component {
  constructor(props) {
    super(props);

    this.state = {
      services: [],
      availibleTimes: [],
      service_id: null,
      showAvailable: false
    };
  }


  showTimes = id => {
    this.setState(prevState => {
      return {
        showAvailable: !prevState.showAvailable,
        service_id: id
      };
    });
  };


  showServices = () => {
     const { services } = this.props
    return services.map((service, i) => {
    return (
          <Wrapper key={service.service_id} >
            <span >{service.service_name} <br/>
            <p>{service.description}</p></span>
            <span id='price' >{service.price}</span>
            <Button
              name='Select'
              onClick={() => this.setState({showAvailable: !this.state.showAvailable})}
            />

      </Wrapper>
      );
    })
    }
  

  render() {
      console.log(this.props)
    return (
      <ServiceBox>
        {!this.state.showAvailable && this.props.name? (
          <>
            <h1 style={{ borderBottom: 'darkgrey thin solid'}}>{`${
              this.props.name
            }'s Service Menu`}</h1>
            <div style={{position: 'relative', width: '100%', paddingTop: '5%', color: 'grey'}}>
              <label >Available Services </label>
              <label id="price">Price</label>
            </div>
            {this.showServices()}
          </>
         ) : (
            <>
            <i onClick={this.showTimes}>{`< Go Back `}</i>
            <h1 style={{ borderBottom: 'darkgrey thin solid'}}>{moment().format('MMMM')}</h1>
           
            <Availability
          service_id={this.state.service_id}
          goBack={this.showTimes}
          calendar={this.props.calendar}
        />
          </>
        )} 
      </ServiceBox>
    );
  }
}
export default Services
