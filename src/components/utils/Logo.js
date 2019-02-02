import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import logo from "../assets/priv.svg";
import mobileLogo from '../assets/whiteLogo.png'

const WebLogo = styled.img`
  margin-left: 20px;
  margin-right: 20px;
  width: 120px;
  height: 130px;
  cursor: pointer;
  position :relative;
  @media (max-width: 1200px) {
    width: 180;
    height: 60px;
    
  }
  @media(max-width: 900px){
    display: none;
  }
`;
const MobileLogo = styled.img `
display: none;
@media(max-width: 900px){
  display: inline;
  height: 130px;
  width: 120px;
  margin: 20px;
}

`
const Logo = (props) => {
  console.log(props)
    return (
      <>
       <WebLogo onClick={props.onClick} src={logo} alt='logo'/>
       <MobileLogo onClick={props.onClick} src={mobileLogo} alt='logo'/>
</>
    )
}


export default Logo 