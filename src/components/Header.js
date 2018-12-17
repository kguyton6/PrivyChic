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


const Logo = styled.img`
  margin-left: 5%;
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
  justify-content: space-between;
`;

class Header extends React.Component {
  state = {
    open: false
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
        <div style={styledDiv}>
         <Logo src={logo} alt="logo"/>
          {this.props.children}
        </div>
        <NavBar
          render={
            <>
              <span onClick={login => this.toggleModal(login)}>Sign Up</span>
              <span onClick={login => this.toggleModal(login)}>Login</span>
              <Link to="/business">
                {" "}
                <Button backgroundColor="#242622">For Business</Button>{" "}
              </Link>
              <Link to="/help">Help</Link>
              <Link to="/search">
                <img
                  src={search}
                  className="search"
                  width="25px"
                  alt="search"
                />
              </Link>
            </>
          }
        />
      </StyledHeader>
    );
  }
}

export default Header;
