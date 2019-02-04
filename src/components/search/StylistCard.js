import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
import Button from ".././buttons/Button";
import axios from "axios";


const Availability  = styled(Button)`
    font-size: 11px;
    background-color: white;
    color: #39D2C9;
    border: thin solid #39D2C9;
    width: 140px;
    height: 35px;
    font-weight: bold;
    outline-color: #39D2C9;
`


const Portfolio = styled.section`
  background-image: url(${props => props.backgroundImage});
  background-size: 100%;
  background-position-y: -100px;
  background-repeat: no-repeat;
  width:50%;
  height: 100%;
  padding: 5px;

  h1 {
    color: white;
    margin: 3%;
    font-size: 23px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: bold;

  }
  @media(max-width: 500px){
    background-position-y: -50px;
    h1 {font-size: 20px;}

  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  justify-content: space-between;
  .top-section {
    height: 10%;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }
  .bottom-section {
    display: flex;
    align-items: center;
    padding: 17px;
}
span {
    display: flex;
    align-items: center;
    font-family: 'Work Sans', sans-serif;
    color: gray;
    padding: 10px;
  }
  a {
    color: #4F8DA4;
    font-weight: bold;
    line-height: 25px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
  }
  i {
    color: lightgrey;
  }
  @media(max-width: 900px){
    a {font-size: 12px;}
    span {font-size: 12px}
  }
  @media(max-width: 500px){
    width: 45%;
    justify-content: unset;
    a {line-height: 10px;}
    span {display: none;}
    i {display: none;}
    .bottom-section {display: none;}
    .top-section {justify-content: flex-end;}

  }

`;
const Card = styled.div`
  width: 55%;
  height: 250px;
  display: flex;
  position: relative;
  margin: 2%;
  box-shadow: .5px .5px .5px .5px rgba(195, 195, 195);
  div + span {
    display: flex;
    border-bottom: thin solid #E9ECEB;
    width: 80%;
    height: 50%;
    padding: 10px;
    font-size: 20px;
    align-items: center;
    justify-content: space-evenly;
  }
  @media (max-width: 768px){
    width: 90%;
    height: 220px;
    margin-left: 5%;
  }
@media(max-width: 500px){
  width: 90%;
  margin-left: 5%;
  height: 200px;
  div + span {
    flex-direction: column-reverse;
    font-size: 18px;
    height: 80%;
    width: 110%;
    align-items: center;
    justify-content: center;
    margin-left: unset;
    border-bottom: unset;
  }
  h4 {
    margin-bottom: 10px;
    font-size: 18px;
  }
}
`;

const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  @media(max-width: 768px){
    width: 80px;
    height: 80px;

  }
`;
class StylistCard extends React.Component {
  constructor(props){
    super(props)
  
  this.state = {
    availability: false,
    id: this.props.id,
    results: 'No Results' }

  }
 
 
  
  render() {
    console.log(this.props)
    const { stylist } = this.props;
 
    return (
      <Card>
        <Portfolio key={this.props.id} backgroundImage={stylist.portfolio}>
          <h1>{`${stylist.full_name}-${stylist.profession}`}</h1>
        </Portfolio>
          <Wrapper>
        <div className='top-section'>
            <span>Multiple Services
            <i className='material-icons' >keyboard_arrow_down</i></span>
            <Link to={`/profile/${stylist.business_id}`}>VIEW PROFILE</Link>
           
          </div>
        <span >
        <ProfilePic
              src={stylist.picture ? stylist.picture : profile}
              alt="profile"
        
              />
            <h4>{stylist.full_name}</h4>

            </span>
           
          <div className='bottom-section'>

            <Link to={`/profile/${stylist.business_id}`}><Availability name='SHOW AVAILABILITY' onClick={this.getAvailability} /></Link>
          </div>
        </Wrapper>
      </Card>
    );
  }
}

export default StylistCard;
