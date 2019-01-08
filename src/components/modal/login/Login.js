import React, { Component } from "react";
import axios from "axios";
import "./login.css";
import close from "../../assets/close.png";
import { connect } from "react-redux";
import {
  getUserInfo,
  addFullName,
  addEmail,
  addPassword
} from "../../../ducks/actions/action_creators";
import { withRouter } from "react-router";
import styled from "styled-components";
import Button from "../../buttons/Button";
import Input from "../../Input";

const Modal = styled.div`
  width: 350px;
  height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  position: relative;

  input {
    box-shadow: 0 .5px 0 .5px rgb(199, 199, 199);
    width: 80%;
    height: 45px;
    margin: 10px;
  }
  button {
    height: 60px;
  }
  form {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
const Container = styled.div`
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.671);
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalHeader = styled.header `
  display: flex;
  font-size: 1.6rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  position: relative;
  justify-content: space-evenly;
  width: 100%;
  padding-top: 30px;

  img {
    position: absolute;
    right: 3%;
    top:10px;
  }
`

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: true,
      password: "",
      disabled: true
    };
  }

  componentDidMount = () => {
    if(!this.props.disabled){
      this.setState({disabled: false})
    }
  }
  signup = () => {
    let { full_name, email, password } = this.props;
    axios
      .post("/auth/signup", { full_name, email, password: password })
      .then(res => {
        if (res.status === 200) {
          this.props.getUserInfo(res.data);
          console.log(this.props.userInfo);
        }
      });
    this.props.onClose();
  };

  login = () => {
    let { email, password } = this.props;
    axios
      .post("/auth/login", { email: email, password: password })
      .then(res => {
        this.props.getUserInfo(res.data);
        this.props.onClose();
      });
  };

  handleInput = event => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.name
    });
  };

  render() {
    const { onClose, addEmail, addFullName, addPassword } = this.props;
    return (
      <Container>
        <Modal>
          <ModalHeader>
            <span
              onClick={this.props.onClick}
              style={{ color: this.props.disabled ? "grey" : "#2876AD" }}
            >
              Sign Up
            </span>
            <span
              onClick={this.props.onClick}
              style={{ color: this.props.disabled ? "#2876AD" : "grey" }}
            >
              Login
            </span>
          <img
            className="xIcon"
            src={close}
            onClick={onClose}
            width="15px"
            height="15px"
            alt=""
            />
            </ModalHeader>
            <form> 
            {!this.props.disabled ? (
              <Input
                placeholder="Full Name"
                type="text"
                image="none"
                onChange={e => addFullName(e.target.value)}
              />
            ) : null }
            <Input
              placeholder="Email"
              type="text"
              image="none"
              onChange={e => addEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              image="none"
              type="password"
              onChange={e => addPassword(e.target.value)}
            />
           </form>
              <span style={ this.props.disabled ? {color: '#2876AD'} : { display: 'none' } }>Forgot your password?</span>
            <Button width="100%" onClick={this.login}>
              {this.props.disabled ? "Login" : "Sign Up"}
            </Button>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.email,
    password: state.password,
    full_name: state.full_name,
    last_name: state.last_name,
    userInfo: state.userInfo
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     addEmail: email => dispatch({ type: 'ADD_EMAIL', payload: email }),
//     addPassword: password => dispatch({ type: 'ADD_PASSWORD', payload: password }),
//     addFullName: full_name => dispatch({ type: 'ADD_FULLNAME', payload: full_name }),
//     addLastName: last_name => dispatch({ type: 'ADD_LAST_NAME', payload: last_name }),

// }
const bindActionCreators = { getUserInfo, addFullName, addEmail, addPassword };
export default withRouter(
  connect(
    mapStateToProps,
    bindActionCreators
  )(Login)
);
