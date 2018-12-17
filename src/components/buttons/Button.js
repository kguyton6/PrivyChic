import React from 'react'
import styled from 'styled-components'


const StyledBtn = styled.button `
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
        <>
        <Button onClick={props.onClick} >{props.name}</Button>
        </>
    )
}

export default StyledBtn

