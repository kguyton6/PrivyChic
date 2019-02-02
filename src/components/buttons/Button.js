import React from 'react'
import styled from 'styled-components'

export const BusinessButton = styled.button `
        width: ${props => props.width || '160px'};
        height: ${props => props.height || '45px'};
        color: ${props => props.color || 'white'};
        font-size: ${props => props.fontSize || '20px'};
        background-color: ${ props => props.backgroundColor || '#5CD3CA'};
        border: none;
        margin-top: ${props => props.marginTop};
        @media(max-width: 1200px){
            width: 130px;
            height: 35px;
            font-size: 18px;
        }

`
const Button = (props) => {

    return (

        <button {...props} onClick={props.onClick} >{props.name}</button> 
    )
}
export default Button

export const StyledBtn = styled(Button) `
        width: ${props => props.width || '160px'};
        height: ${props => props.height || '46px'};
        color: ${props => props.color || 'white'};
        font-size: ${props => props.fontSize || '16px'};
        background-color: ${ props => props.backgroundColor || '#5CD3CA'};
        border: none;
        box-sizing: border-box;
        margin-top: ${props => props.marginTop};
        text-transform: uppercase;
        font-family: sans-serif;
        font-weight: bold;
        @media (max-width: 1200px){
            height: 35px;
            font-size: 13px;
        }

        
`


