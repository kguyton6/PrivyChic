import React from 'react'
import styled from 'styled-components'
import Input from './Input'
import Button, {StyledBtn} from './buttons/Button'
import {Link} from 'react-router-dom'
import location from './assets/location.png'
import {connect} from 'react-redux'
import {addZip, addStylistName} from '../ducks/actions/action_creators'



const StyledBanner = styled.section `
    background-image: url(${props => props.backgroundImage ||' https://s3.us-east-2.amazonaws.com/styleseat/fezbot2000-365718-unsplash.jpg'});
    background-size: ${props => props.size || '115%'};
    background-position-y: ${props => props.positionY || '-400px'};

    background-repeat: no-repeat;
    width: ${props => props.width || '55%'};
    padding: 50px;
    height: 350px;
    position: relative;
    text-decoration-color: white;
    align-items: center;
    h1 {
        font-size: 37px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: white;
        font-weight: 700;
        line-height: 48px;
        margin-bottom: 4%;
        margin-top: ${props => props.marginTop ||  '6%'};

    }
    h3 {
        font-size: 14px;
        font-weight: 500;
        line-height: 21px;
    }
   
  
`
const Banner = (props) => {
    return (
        <StyledBanner {...props}>
            {props.children}
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