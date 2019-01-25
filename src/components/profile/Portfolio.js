import React from 'react'
import styled from 'styled-components'

var Banner = styled.div`
    background-image: url(${props => props.background});
    width: 100vw;
    height: 65vh;
    background-size: 100%;
    background-position-y: -600px;
    position: absolute;
    background-repeat: no-repeat;
    left: 0;
    top: 0;
    z-index: -100;
    color: white;

   .stars {
       position: absolute;
       left: 25%;
        top: 60vh;
        color: white;
   }
`
const Div = styled.div`

    h1 {
        font-size: 38px;
        color: white;
        position: absolute;
        left: 20%;
        top: 55vh;
    }
`


const Portfolio = props => {
    const {background} = props
    return (
        <>
        <Banner background={background} >
        </Banner>
           <Div>
            {props.children}
            </Div>
        </>
    )
}

export default Portfolio