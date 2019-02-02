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
const Menu = styled.img `
display: none;
  @media(max-width: 900px){
    display: block;
  }
`
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
  color: white;
  right: 0;
  letter-spacing: 1.5px;


  a > span {
    color: ${props => props.color || "black"};
  }
  @media (max-width: 1200px) {
    font-size: 1rem;
    a > span {display: none;}
  }
  i {
      margin: 10px;
  }
`;
const Link = styled(NavLink)`
  background-image: url(${search});
  @media(max-width: 900px){
    display: none;
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
    
   
    logout = () => {
        axios.get("/api/logout").then(res => {
          if (res.status === 200) {
            this.props.getUserInfo({})
            return this.props.toggleMenu();
          }
        });
      };
   dropdown = () => {
        if (this.props.open) {
          return (
            <CustomMenu
             user={this.props.user}  
              user_type={this.props.user.is_business}        
              open={this.props.open}
              logout={this.logout}
              login={this.props.toggleModal}
              toggleMenu={this.props.toggleMenu}
            />
          )}
      }
      render(){       
          console.log(this.props)

           var { background } = this.props
          
    return this.props.user ? (

        <Nav style={{justifyContent: 'flex-end', marginRight: '3%'}}>
        {this.props.user.user_type === 'client' ? 
      <Circle backgroundColor={background}{...this.props} onClick={this.props.toggleMenu}>{this.initials()}</Circle>
    :
    <span onClick={this.props.toggleMenu}>{this.props.user.full_name}<i className="fas fa-chevron-down"></i></span> }
       {this.dropdown()}
        </Nav>
    ) : (
        <Nav {...this.props}>
      {this.props.links}
      <span onClick={() => this.props.toggle("signup")}>Sign Up</span>
      <span onClick={() => this.props.toggle("login")}>Login</span>
      {this.props.render}
      <NavLink to="/help">Help</NavLink>

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
