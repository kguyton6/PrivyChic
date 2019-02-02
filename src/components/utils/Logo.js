import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import logo from "../assets/webLogo.png";
import mobileLogo from '../assets/mobileLogo.png'

const WebLogo = styled.img`
  margin-left: 30px;
  margin-right: 20px;
  width: 140px;
  height: 70px;
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
  height: 70px;
  width: 140px;

}
@media(max-width: 500px){
  margin-right: 20px;
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