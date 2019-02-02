import React from "react";
import styled from "styled-components";
import menu from "./assets/menu.png";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Login from "./modal/login/Login";
import Logo from "./utils/Logo";
import { BusinessButton } from "./buttons/Button";
import NavBar from "./NavBar";


const MenuButton = styled.button`
  display: none;
  @media (max-width: 900px) {
    background-image: url(${menu});
    width: 60px;
  }
`;
const StyledHeader = styled.header`
  height: 90px;
  display: flex;
  align-items: center;
  color: #393B3A;
  position: ${props => props.position};
  width: 100%;

  .title {
    font-size: ${props => props.fontSize || '27px'};
    font-family: 'Abril Fatface', cursive;
    color: ${props => props.color || '#393B3A'};
    margin-left: 30px;
    font-weight: 300;
    letter-spacing: .5px;
    padding-right: 30px;
    z-index: 100;

  }
  .title:hover {
    color: #5CD3CA;
    font-size: 30px;
  }
  a,
  span {
    color: ${props => props.color || "black"};
  }
  @media(max-width: 900px){
    background-color: ${props => props.background || 'hsl(0, 0%, 14%)'};
    margin-bottom: 3%;
    .title {
    color: white;
    padding-right: 10px;
    margin-left: 20px;
    }
  }
`;


class Header extends React.Component {
  state = {
    open: false,
    showLogin: false,
    disabled: true,
    keyword: ""
  };

  modalHandler = val => {
    this.setState({ keyword: val });
    if (val === "login") {
      return this.toggleModal();
    } else {
      return this.toggleSignUp();
    }
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { showLogin: !prevState.showLogin };
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
          keyword={this.state.keyword}
          onClose={this.toggleModal}
          disabled={this.state.disabled}
          showLogin={this.state.showLogin}
          onClick={() => this.setState({ disabled: !this.state.disabled })}
        />
      );
    }
  };

  menu = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };
    

  handleClick = () => {
    return this.props.history.push('/');
  };

  render() {
    return (
      <StyledHeader {...this.props} >
        <MenuButton onClick={this.menu} />
        {this.props.title ?
            this.props.title
        :
        <Logo newLogo={this.props.newLogo} onClick={this.handleClick} />
        }
        {this.props.children}
        <NavBar
          open={this.state.open}
          logout={this.logout}
          toggleMenu={this.menu}
          toggle={this.modalHandler}
          render={this.props.Button}
          background={this.props.backgroundColor ? true : false}
          {...this.props}
        />

        {this.showModal()}
      </StyledHeader>
    );
  }
}

export default withRouter(Header);
