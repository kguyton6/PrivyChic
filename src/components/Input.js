import React from 'react'
import styled from 'styled-components'
import icon from './assets/icon.svg'

export const StyledInput = styled.input `
        height: ${props => props.height || '40px'};
        width: ${props => props.width || '250px'};
        background-image: url(${props => props.image || icon});
        background-repeat: no-repeat;
        background-size: ${ props => props.size || '25px' };
        background-position-y: 10px;
        background-position-x: ${props => props.positionX };
        text-indent: ${props => props.indent || '25px'};
        border: ${props => props.border };

        @media(max-width: 1200px){
            height: 25px;
            width: 165px;
        }
`


const Input = (props) => {

    return (
        <Input type={props.type} value={props.value} onChange={props.onChange}/>

    )
}
 
    


export default StyledInput