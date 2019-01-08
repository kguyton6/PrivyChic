import React from 'react'
import styled from 'styled-components'
import Input from './Input'
import Button from './buttons/Button'
import {Link} from 'react-router-dom'
import location from './assets/location.png'
import {connect} from 'react-redux'
import {addZip, addStylistName} from '../ducks/actions/action_creators'
import LinkBox from './LinkBox'


const StyledBanner = styled.section `
    background-image: url(${props => props.backgroundImage ||' https://s3.us-east-2.amazonaws.com/styleseat/fezbot2000-365718-unsplash.jpg'});
    background-size: ${props => props.size || '1500px'};
    background-position-y: ${props => props.positionY || '-600px'};
    background-repeat: no-repeat;
    width: ${props => props.width || '60%'};
    padding: 50px;
    height: 400px;
    position: relative;
    text-decoration-color: white;
    align-items: center;
    



    h1 {
        font-size: 48px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: white;
        margin-bottom: 4%;
        margin-top: ${props => props.marginTop ||  '6%'};

    }
   
  
`
const Banner = (props) => {
    return (
        <StyledBanner backgroundImage={props.backgroundImage} size={props.size} positionY={props.positionY} width={props.width}>
            {props.children}
            {/* <Button/> */}
         </StyledBanner>
    )
    }

const mapStateToProps = (state) => {
    return {
        zipcode: state.zipcode,
        stylistName: state.stylistName
    }
}

const bindActionCreators = {addZip, addStylistName}

export default connect(mapStateToProps, bindActionCreators)(Banner )