import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
 width: 60vw; 
    height: 30vh;
    padding-bottom: 10%;
    border: solid #06D8CC thin;
    padding-top: 5%;
    margin-bottom: 5%;
    margin-top: 10%;
    z-index: 100;
    position: relative;
    line-height: 40px;

h1 {
    text-align: center;
    font-size: 40px;
}
li {
    font-size: 22px;
}

button {
    width: 100px;
    height: 30px;
}
`

const ServiceBox = props => {
    return (
        <Container>
            {props.children}

        </Container>
    )
}

export default ServiceBox