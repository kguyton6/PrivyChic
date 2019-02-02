import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import Login from "./modal/login/Login";
import Logo from "./utils/Logo";
import axios from 'axios'
import NavBar from "./NavBar";
import CustomMenu from './menu/CustomMenu'
import {connect} from 'react-redux'
import {getUserInfo}from '../ducks/actions/action_creators'
const StyledHeader = styled.header`
  height: 90px;
  display: flex;
  align-items: center;
  color: #393b3a;
  position: ${props => props.position};
  width: 100%;

  .title {
    font-size: ${props => props.fontSize || "27px"};
    font-family: "Abril Fatface", cursive;
    color: ${props => props.color || "#393B3A"};
    margin-left: 30px;
    font-weight: 300;
    letter-spacing: 0.5px;
    padding-right: 30px;
    z-index: 100;
  }
  .title:hover {
    color: #5cd3ca;
    font-size: 30px;
  }
  a,
  span {
    color: ${props => props.color || "black"};
  }
  i.search {display: none;}
  @media (max-width: 900px) {
    background-color: ${props => props.background || "hsl(0, 0%, 14%)"};
    margin-bottom: 3%;
    justify-content: space-between;
    padding: 10px;
    color: white;
    .title {
      color: white;
      font-size: 34px;
      margin-left: unset;
    }
    i.search {display: block; color: white; font-size: 60px; }

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
      return { showLogin: !prevState.showLogin,
               open: false };
    });
  };

  toggleSignUp = () => {
    this.setState(prevState => {
      return {
        showLogin: !prevState.showLogin,
        disabled: false,
        open: false
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

  logout = () => {
    axios.get("/api/logout").then(res => {
      if (res.status === 200) {
        this.props.getUserInfo({})
        return this.menu();
      }
    });
  };

  dropdown = () => {
    if (this.state.open) {
      return (
        <CustomMenu
         user={this.props.user}  
          user_type={this.props.user.is_business}        
          open={this.state.open}
          logout={this.logout}
          login={this.toggleModal}
          toggleMenu={this.toggleMenu}
        />
      )}
  }
  menu = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };

  handleClick = () => {
    return this.props.history.push("/");
  };
  handleSearch = () => {
    return this.props.history.push('/search')
  }
  render() {
    return (
      <StyledHeader {...this.props}>
        <i className="material-icons search" onClick={this.handleSearch}>
          search
        </i>
        {this.props.title ? (
          this.props.title
        ) : (
          <Logo newLogo={this.props.newLogo} onClick={this.handleClick} />
        )}
        {this.props.children}
        <NavBar
          open={this.state.open}
          logout={this.logout}
          toggleMenu={this.menu}
          toggle={this.modalHandler}
          render={this.props.Button}
          backgroundColor={this.props.backgroundColor ? true : false}
          {...this.props}
        />
       {this.dropdown()}

        {this.showModal()}
      </StyledHeader>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, {getUserInfo})(Header));
