import React, {Component} from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import search from "./assets/search.png";
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import CustomMenu from "./menu/CustomMenu";
import {getUserInfo} from '../ducks/actions/action_creators'
import menu from './assets/menu.png'


export const Nav = styled.nav`
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  align-items: center;
  cursor: pointer;
  width: 35%;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  z-index: 100;
  right: 0;
  letter-spacing: 1.5px;
  .full_name i {color: black; font-size: 18px;}
  a > span {
    color: ${props => props.color || "black"};
  }
  @media (max-width: 1200px) {
    font-size: 1rem;
    a > span {display: none;}
  }
  @media (max-width: 900px) {
    position: unset;
    width: auto;
    span, a {display: none;}
    div.full_name  {display:none;}

  }

`;

const Circle = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: ${props => props.backgroundColor || 'lightgray'};
    color: darkgrey;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3%;
    position: fixed;
    @media(max-width:500px){
      width: 40px;
      height: 40px;
    }
` 
const MenuButton = styled.img`
  display: none;
  @media (max-width: 900px) {
    display: block;
    height: 40px;
    width: auto;
    margin-right: 5px;
  }
  @media (max-width: 500px){
    height: 25px;
    margin-right: unset;

  }
`;

class NavBar extends Component { 
    state = {initials: ''}

    initials = () => {
        if(this.props.user.full_name){
            var last_name = this.props.user.full_name.split(' ')
                last_name = last_name[1]
            var lastInitial = last_name.split('')
            const firstInitial = this.props.user.full_name.split('')
                var letters = firstInitial[0] + lastInitial[0]
                return letters
                
            } else {
                return null
            }
    }
    
   
      renderClientType = () => {
        var { backgroundColor } = this.props         
        return this.props.user.user_type === 'client' ? (
          <Circle
          {...this.props}
           backgroundColor={backgroundColor}
           onClick={this.props.toggleMenu}>
           {this.initials()}
           </Circle>
            ):( 
              <>
        <div className='full_name' onClick={this.props.toggleMenu}>{this.props.user.full_name}<i className="fas fa-chevron-down arrow"></i></div> 
        <MenuButton src={menu} onClick={this.props.toggleMenu}/>
        </>
        )
      }
   

     render(){       
       return this.props.user.full_name ? (
        <Nav style={{justifyContent: 'flex-end', marginRight: '3%'}}>
        {this.renderClientType()}
       
        </Nav>
    ) : (
      <Nav {...this.props}>
      {this.props.links}
      <span onClick={() => this.props.toggle("signup")}>Sign Up</span>
      <span onClick={() => this.props.toggle("login")}>Login</span>
      {this.props.render}
      <NavLink to="/help">Help</NavLink>
      <MenuButton src={menu} onClick={this.props.toggleMenu}/>
     </Nav>
  );
   }
};
const mapStateToProps = state => {
    return {
      user: state.user
    }
  }
  
export default withRouter(connect(mapStateToProps, {getUserInfo})(NavBar));
