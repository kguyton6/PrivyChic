import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import downArrow from "../assets/down-arrow.png";
import profile from "../assets/profile.png";
import Availability from "./Availability";

const Button = styled(Availability)``;

const Portfolio = styled.section`
  background-image: ${props => props.backgroundImage};
  background-size: 200px;
  width: auto;
  height: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Card = styled.div`
  width: 70%;
  height: 200px;
  display: flex;
  position: relative;
  div {
    display: flex;
    width: 50%;

  }

  .right-box {
    display: flex;
    flex-direction: column;
    height: 70%;
    justify-content: space-evenly;
    margin-left: 10px;
    width: 30%;
    align-items: center;
  }
  .top-container {
    display: flex;
    width: 50%;
    justify-content: space-evenly;
  }
`;

const ProfilePic = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin-top: 3%;
`;
class StylistCard extends React.Component {
  showAvailability = id => {
    this.setState(prevState => {
      return {
        availability: !prevState.availability,
        service_id: id
      };
    });
  };
  render() {
    const { stylist } = this.props;
    return (
      <Card>
        <Portfolio key={this.props.id} backgroundImage={stylist.portfolio}>
          <h1>{`${stylist.full_name}-${stylist.profession}`}</h1>
        </Portfolio>
        <ProfilePic
              src={stylist.picture ? stylist.picture : profile}
              alt="profile"
              width="100%"
              height="100%"
              />
              <Wrapper>
          <div className='top-container'>
            <span>Multiple Services</span>
            <img
              src={downArrow}
              alt="down"
              className="down"
              width="15px"
              height="10px"
            />
            <Link to={`/profile/${stylist.business_id}`}>View Profile</Link>
           
          </div>
          <div className='right-box'>
            <h6>{stylist.full_name}</h6>

            <Button onClick={() => this.showAvailability(stylist.service_id)} />
          </div>
        </Wrapper>
      </Card>
    );
  }
}

export default StylistCard;
