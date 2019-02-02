import React from 'react'
import styled from 'styled-components'

var Banner = styled.div`
    background-image: url(${props => props.background});
    width: 100vw;
    height: 450px;
    background-size: 100%;
    background-position-y: -500px;
    background-repeat: no-repeat;
    z-index: -100;
    color: white;
    margin-bottom: 10%;
    position: relative;

    h1 {
        font-size: 36px;
        color: white;
        position: absolute;
        left: 20%;
        bottom: 20px;
    }
    @media(max-width: 900px){
        background-position-y: -300px;
        h1{font-size: 28px; left: 22%;}
}
@media(max-width: 768px){
        background-position-y: -300px;
        height: 350px;
}
@media(max-width: 500px){
        background-position-y: -100px;
        height: 300px;
        h1 {font-size: 20px; left: 32%;}
}
`

const Portfolio = props => {
    const {background} = props
    return (
        <>
        <Banner background={background} >
        <h1 style={{textTransform: 'uppercase'}}>{props.name}</h1> 
            {props.children}

        </Banner>
        </>
    )
}

export default Portfolio