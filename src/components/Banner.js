import React from "react";
import styled from "styled-components";
import Input from "./Input";
import Button, { StyledBtn } from "./buttons/Button";
import { Link } from "react-router-dom";
import location from "./assets/location.png";
import { connect } from "react-redux";
import { addZip, addStylistName } from "../ducks/actions/action_creators";

const HomeBanner = styled.section`
  background-image: url(${props => props.backgroundImage || " https://s3.us-east-2.amazonaws.com/styleseat/fezbot2000-365718-unsplash.jpg"});
  background-size: ${props => props.size || "115%"};
  background-position-y: ${props => props.positionY || "-380px"};
  background-repeat: no-repeat;
  width: ${props => props.width || "60%"};
  padding: 50px;
  height: 400px;
  position: relative;
  text-decoration-color: white;
  align-items: center;
  h1 {
    font-size: 37px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: white;
    font-weight: 700;
    line-height: 48px;
    margin-bottom: 4%;
    margin-top: ${props => props.marginTop || "6%"};
  }
  h3 {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
  }
  @media (max-width: 1200px) {
    height: 350px;
    background-position-y: -260px;
    h1 {
      font-size: 30px;
    }
    h3 {
      font-size: 9px;
    }
}
@media (max-width: 900px) {
        background-position-y: -200px;
}
    @media (max-width: 768px) {
      padding: 20px;
      width: 80%;
      flex-wrap: wrap;
    }
    @media (max-width: 450px) {
    background-position-y: -50px;
      width: 80%;
      height: 300px;
      flex-wrap: wrap;
      justify-content: center;
      display: flex;
      h1 {font-size: 24px; line-height: 25px;}
    }
    @media(max-width: 350px){
        height: 250px;
    }

  
`;
const BusinessBanner = styled.section `
background-image:url('https://s3.us-east-2.amazonaws.com/styleseat/attractive-beautiful-diversity-247204.jpg');
background-repeat:  no-repeat;
  background-size: 120%;
  background-position-y: -100px;
  background-position-x: -100px;
  width: ${props => props.width || "80%"};
  padding: 50px;
  height: 450px;
  position: relative;
  text-decoration-color: white;
  align-items: center;
    contain: content;
  h1 {
    font-size: 37px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: white;
    font-weight: 700;
    line-height: 48px;
    margin-bottom: 4%;
    /* margin-top: ${props => props.marginTop || "6%"}; */
  }
  h3 {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: white;
  }
  @media (max-width: 1200px) {
    height: 350px;
    background-position-x: 20px;
    background-position-y: -40px;
    h1 {font-size: 30px;}
    h3 {font-size: 16px;}
    h4 {font-size: 12px;}
}
    @media (max-width: 750px) {
      width: 80%;
      flex-wrap: wrap;
    }
   
`
const Banner = props => {
  return props.business ? (
    <BusinessBanner {...props}>{props.children}</BusinessBanner>
  ) : (
    <HomeBanner {...props}>{props.children}</HomeBanner>
  );
};

const mapStateToProps = state => {
  return {
    zipcode: state.zipcode,

  };
};

const bindActionCreators = { addZip, addStylistName };

export default connect(
  mapStateToProps,
  bindActionCreators
)(Banner);
