import React from 'react'
import styled from 'styled-components'
import Input from './Input'
import {StyledBtn} from './buttons/Button'
import {addZip, addStylistName} from '../ducks/actions/action_creators'
import {Link} from 'react-router-dom'
import location from './assets/location.png'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

const Container = styled.div `
    padding: 10px; 
    width: 70%;
    height: 14px;
    color: white;
    display: flex;
    justify-content: space-between;
    background-color: rgba(15, 15, 15, 0.753);
    z-index: 10;
    align-items: center;
    font-family:  'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    position: absolute;
    margin-top: 3%;

    a {
      letter-spacing: 1px;
    font-size: 12px;
    text-transform: uppercase;
    font-family: 'Thasadith';
    color: white;

    }
    h6 {
        font-weight: lighter;
    }
    @media(max-width: 1200px){
      input {
        height: 35px;
      
      }
      a {
        font-size: 8px;
      }
      font-size: 10px;     
    }
    @media(max-width: 768px){
      display: none;
    }  


    
    
`
const InputWrapper = styled.div `
  display: flex;
  @media (max-width: 500px ){
      #button {display: none;}
      width: 90%;
    }

`

const StyledInput = styled(Input)`
 @media(max-width: 768px){
   width: 100%;
 }
`

const LinkBox = (props) => {
    const {addStylistName, addZip} = props
    const submit = (e) => {
      e.preventDefault()
      return props.history.push('/search')
    }
    return (
        <>
          <h1> {`Discover & book beauty and barber appointments.`}</h1>
            <InputWrapper onSubmit={(e) => submit(e)}>
              <Input
                border='none'
                onChange={e => addStylistName(e.target.value)}
                name="name"
                placeholder="Search by stylist name"
                />
              <StyledInput
                display='inline'
                border='none'
                size="20px"
                positionX="6px"
                image={location}
                onChange={e => addZip(e.target.value)}
                placeholder="Enter zipcode"
                />
              <Link to="/search">
                <StyledBtn id='button' name='Search' width='100px' height='100%'/>
              </Link><br/>
              </InputWrapper>
                <Container>
             <h6>Popular Searches </h6>
             
        <a href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=uWYAXLe6FtKwzwLv1LdA&q=hair+cuts&oq=hair+cuts&gs_l=img.3..0l4j0i10j0l4j0i10.5617.7012..7331...0.0..0.98.187.2......1....1..gws-wiz-img.......0i10i67j0i67.0J0ci9N9uiM'>Haircut</a>
            <a href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=wmYAXOOfAoOyzwLWx4iYAg&q=barber&oq=barber&gs_l=img.3..0i67l3j0j0i67l4j0j0i67.64825.66958..67110...0.0..0.105.1342.12j2......1....1..gws-wiz-img.....0..35i39j0i10i67.M1iKbUSzHmM'>Barber</a>
            <a href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=EWcAXOJvw-rOAv-ShfAB&q=weaves+and+extensions&oq=weaves+and+ext&gs_l=img.3.0.0j0i24l2.10882.13717..14848...0.0..1.112.1666.10j7......2....1..gws-wiz-img.....0..35i39j0i67j0i10j0i8i30.AGky8mbGUJ0'>{`Weaves & Extensions`}</a>
            <a href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=BmcAXPmeF82hzwK_sreQAw&q=nail&oq=nail&gs_l=img.3..35i39l2j0i67l2j0j0i67j0j0i67j0j0i67.7876.9306..9519...0.0..0.107.866.6j3......1....1..gws-wiz-img.....0.tXoBYCzVkLE'>Nails</a>
            <a href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=IGcAXNeLO4P6zgLn57L4AQ&q=makeup+makeover&oq=makeup+make&gs_l=img.3.1.0l10.7631.13340..15391...0.0..1.103.1226.11j2......2....1..gws-wiz-img.....0..0i67j0i8i30j35i39._VYhPAdqHY8'>Makeup</a>
            <a href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=MWcAXIz6H8yZzwKsroqIAQ&q=hair+color&oq=hair+color&gs_l=img.3..0l9j0i67.10405.11421..11577...0.0..0.151.1009.6j4......1....1..gws-wiz-img.......35i39j0i10.KO05d_lqkT8'>Color</a>
            </Container>

    </>
    )
}
const mapStateToProps = (state) => {
    return {
        zipcode: state.zipcode,
        stylistName: state.stylistName
    }
}

const bindActionCreators = {addZip, addStylistName}
export default withRouter(connect(mapStateToProps, bindActionCreators)(LinkBox))