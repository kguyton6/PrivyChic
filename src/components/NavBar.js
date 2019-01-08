import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Button from './buttons/Button'
import search from './assets/search.png'

export const Nav = styled.nav `
    font-size: 1.5rem;
    font-family: Arial, Helvetica, sans-serif;
    align-items: center;
    cursor: pointer;
    right: 3%;
    width: 30%;
    display: flex;
    justify-content: space-evenly;
    position: absolute;

    a {
        color: black;
    }
    @media(max-width: 1200px){
        font-size: 1rem;
    }
`


  const NavBar = props => {
    console.log(props)

    return (

            <Nav >
               {props.children}
             
            </Nav>
  
    )
  }

export default NavBar