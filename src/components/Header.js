import React from "react";
import styled from "styled-components";
import menu from "./assets/menu.png";
import { Link } from "react-router-dom";
import Login from "./modal/login/Login";
import CustomMenu from "./dropdown/CustomMenu";
import logo from "./assets/Artboard3.png";
import Input from "./Input";
import search from "./assets/search.png";
import NavBar from "./NavBar";
import Button from "./buttons/Button";
import Axios from "axios";


const Logo = styled.img`
  margin-left: 3%;
  width: 200px;
  height: 80px;
  cursor: pointer;

  @media (max-width: 1200px) {
    width: 180;
    height: 60px;
    
  }
`;

const styledDiv = {
  display: "flex",
  alignItems: "center",
  width: "60%"
};

const MenuButton = styled.button`
  display: none;
  @media (max-width: 900px) {
    background-image: url(${menu});
    width: 60px;
  }
`;
const StyledHeader = styled.header`
  height: 120px;
  display: flex;
  align-items: center;

`;

class Header extends React.Component {
  state = {
    open: false,
    showLogin: false,
    disabled: true
  };
  toggleModal = () => {
    this.setState(prevState => {
      return {
        showLogin: !prevState.showLogin,
        disabled: !prevState.disabled
      };
    });
  };
  toggleSignUp = () => {
    this.setState(prevState => {
      return {
        showLogin: !prevState.showLogin,
        disabled: false
      };
    });
  };

  showModal = () => {
    if (this.state.showLogin) {
      return (
        <Login
          onClose={this.toggleModal}
          disabled={this.state.disabled}
          showLogin={this.state.showLogin}
          toggle={this.state.disabled}
          disableLogin={() => this.setState({disabled: false})}
          disableSignUp={() => this.setState({disabled: true})}
        />
      );
    }
  };
  

  menu = () => {
    this.setState(prevState => {
      return {
        open: !prevState.open
      };
    });
  };
  dropdown = () => {
    if (this.props.userInfo !== null) {
      if (this.state.open) {
        return (
          <CustomMenu
            open={this.state.open}
            logout={this.logout}
            login={this.toggleModal}
            toggleMenu={this.menu}
            name={this.state.full_name}
          />
        );
      }
    } else {
      if (this.state.open) {
        return (
          <CustomMenu
            open={this.state.open}
            userInfo={this.props.userInfo}
            logout={this.logout}
            login={this.toggleModal}
            toggleMenu={this.menu}
          />
        );
      }
    }
  };

  render() {
    console.log(this.props);
    return (
      <StyledHeader {...this.props}>
        <MenuButton onClick={menu}>{this.dropdown()}</MenuButton>
         <Logo src={logo} alt="logo"/>
          {this.props.children}

        <NavBar render={this.props.render}/>
      </StyledHeader>
    );
  }
}

export default Header;
