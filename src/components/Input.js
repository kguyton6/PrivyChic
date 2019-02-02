import React from "react";
import styled from "styled-components";
import icon from "./assets/icon.svg";
import searchIcon from './assets/search.png'

export const StyledInput = styled.input`
  height: ${props => props.height || "45px"};
  box-sizing: border-box;
  width: ${props => props.width || "250px"};
  background-image: url(${props => props.image || icon});
  background-repeat: no-repeat;
  background-size: ${props => props.size || "25px"};
  background-position-y: ${props => props.y || "12px"};
  background-position-x: ${props => props.positionX};
  text-indent: ${props => props.indent || "25px"};
  border: ${props => props.border || "solid thin #E9ECEB"};
  font-size: 15px;
  ::placeholder {
    color: ${props => props.color || "rgb(190, 190, 190)"};
    font-family: "Abel", sans-serif;
    font-size: 17px;
    letter-spacing: 1px;
    font-weight: lighter;
  }
  @media (max-width: 1200px){
            height: 35px;
            font-size: 13px;
            background-position-y: 5px;
        }

  @media (max-width: 900px) {
    display: ${props => props.display || 'none'};
  }
`;
export const SearchInput = styled.input `
  display: none;
  @media (max-width: 900px){
    display: inline;
    background-image: url(${searchIcon});
    background-repeat: no-repeat;
    background-position-x: 10px;
    background-position-y: 10px;
    background-size: 20px;
  width: 50%;
  height: 40px;
  border-radius: 20px;
  background-color: gray;
  border: transparent;
  color: lightgrey;
  text-indent: 35px;

  ::placeholder {
    color: lightgrey;
    font-size: 18px;
  }
  }
  @media(max-width: 750px){
    display: ${props => props.display || 'none'};
  }

`

const Input = props => {
  return (
    <Input
      onSubmit={props.onSubmit}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default StyledInput;
