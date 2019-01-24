import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import logo from "../assets/priv.svg";

const HomeLogo = styled.img`
  margin-left: 3%;
  margin-right: 20px;
  width: 140px;
  height: 70px;
  cursor: pointer;

  @media (max-width: 1200px) {
    width: 180;
    height: 60px;
    
  }
`;

export const Logo = (props) => {
    return (
       <HomeLogo onClick={props.onClick} src={props.newLogo ? props.newLogo : logo} alt='logo'/>
    )
}


export default Logo 