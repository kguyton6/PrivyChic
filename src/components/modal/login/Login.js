import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  getUserInfo,
} from "../../../ducks/actions/action_creators";
import { withRouter } from "react-router";
import styled from "styled-components";
import {StyledBtn as Button} from "../../buttons/Button";
import Input from "../../Input";
import Modal from '../Modal'


const DynamicText = styled.header `
  display: flex;
  font-size: 1.6rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  position: relative;
  justify-content: space-evenly;
  width: 100%;
  padding-top: 30px;
  cursor: pointer;

  i {
    position: absolute;
    right: 3%;
    top:10px;
    color: lightgrey;
  }
`

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: true,
      password: "",
      disabled: true,
      full_name: '',
      email: '',
      isBusiness: false,
      error: ''

    };
  }

  componentDidMount = () => {
    if(this.props.isBusiness){
      this.setState({isBusiness: true})
    }
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  signup = () => {
    let { full_name, email, password } = this.state;
    axios
      .post("/auth/signup", { full_name, email, password: password })
      .then(res => {
        if (res.status === 200) {
          return this.props.getUserInfo(res.data);
        }
        return this.props.onClose();
      });
  };

  login = () => {
    if(!this.props.disabled){
      return this.signup()
    } else {
    let { email, password } = this.state;
    axios
      .post("/auth/login", { email: email, password: password })
      .then(res => {
        this.props.getUserInfo(res.data);
        this.props.onClose();
      }).catch(err => console.log(err)) 
  };
}


  render() {
    const { onClose } = this.props;
    console.log(this.props)
    return (
     <Modal>

          <DynamicText>
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
          <i
            className='material-icons'
            onClick={onClose}
            >close</i>
            </DynamicText>
            <form> 
            {!this.props.disabled ? (
              <Input
                placeholder="Full Name"
                type="text"
                image="none"
                name='full_name'
                onChange={this.handleChange}
              />
            ) : null }
            <Input
              placeholder="Email"
              type="text"
              image="none"
              name='email'
              onChange={this.handleChange}
            />
            <Input
              placeholder="Password"
              image="none"
              type="password"
              name='password'
              onChange={this.handleChange}
            />
            <span style={{color: 'red', margin: '10px'}}>{this.state.error}</span>
           </form>
              <span style={ this.props.disabled ? {color: '#2876AD'} : { display: 'none' } }>Forgot your password?</span>
            <Button width="100%" onClick={this.login} name=
              {this.props.disabled ? "Login" : "Sign Up"}/>
          </Modal>
    );
  }
}


export default withRouter(
  connect(
    null,
    {getUserInfo}
  )(Login)
);
