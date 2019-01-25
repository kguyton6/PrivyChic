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
  background-size: 90%;
  background-position-y: -100px;
  background-repeat: no-repeat;
  width: 45%;
  height: 100%;

  h1 {
    color: white;
    margin: 3%;
    font-size: 23px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: bold;

  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
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
`;
const Card = styled.div`
  width: 55%;
  height: 220px;
  display: flex;
  position: relative;
  margin: 2%;
  box-shadow: .5px .5px .5px .5px rgba(195, 195, 195);
 

  span {
    display: flex;
    align-items: center;
    font-family: 'Work Sans', sans-serif;
    color: gray;
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
`;

const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;

`;
class StylistCard extends React.Component {
  constructor(props){
    super(props)
  
  this.state = {
    availability: false,
    id: this.props.id,
    results: 'No Results' }

  }
 componentDidMount = () => {
   console.log(this.props, this.state)
  return this.getAvailability()
 }

     getAvailability = async(req, res) => {
       try{
    let schedule = await axios.get(`/api/availability/${this.state.id}`)
    console.log(schedule.data[0])
       }
       catch(err){
         console.log(err)
       }
     
 }
 
  
  render() {
    console.log(this.state)
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
        <div style={{display: 'flex', alignItems: 'center', borderBottom:'#E9ECEB  solid thin', paddingBottom: '10px', height:'30%'}}>
        <ProfilePic
              src={stylist.picture ? stylist.picture : profile}
              alt="profile"
        
              />
            <h4>{stylist.full_name}</h4>

            </div>
           
          <div className='bottom-section'>

            <Availability name='SHOW AVAILABILITY' onClick={this.getAvailability} />
          </div>
        </Wrapper>
      </Card>
    );
  }
}

export default StylistCard;
