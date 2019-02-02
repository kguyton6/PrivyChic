import React from 'react'
import { Button, Collapse, Well, Fade, Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './dropdown.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { addPicture, getUserInfo } from '../../ducks/actions/action_creators';
import TakeMoney from '../stripe/TakeMoney'

// const wellStyle = {
//   position: 'absolute',
//   width: '150px',
//    height: '90px',
//   left: '5%',
//   zIndex: '10',
//   fontSize: '10px',
//   top: '10%',
//   fontWeight: 'bold',
//   justifyContent: 'space-evenly',
//    flexDirection: 'column',
//   backgroundColor: 'rgba(226, 226, 226, 0.918)',
//   display: 'flex',
//   bordeRadius: '3px',
// overflowWrap: 'break-word',
//   boxShadow: 'rgba(128, 128, 128, 0.431)',
//   cursor: 'pointer'
// }
// const menuStyle = {
//   cursor: 'pointer',
//   color: 'rgb(56, 56, 56)',
//   fontSize: '18px',
//   textAlign: 'left',
//   letterSpacing: '1px',
//   textIndent: '5px'
// }

class Schedule extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                availability: []
            }
        
    }


  componentDidMount = () => {
    axios.get('/checkSession')
      .then((res) => {
        this.props.getUserInfo(res.data)
      })
      axios.get(`calendar/${this.props.business_id}`)
      .then((res) => {
          this.setState({availability: res.data})
      })
  }
  availability = () => {
    let availability = this.state.availability
    let time = []

   for(let i in availability){
       time.push(
        <div key={availability[i].id} id='timeList'>
        <ul id='time-ul'>
            <li id='day-name'>{availability[i].day_name}</li>
            <li id='day-number'>{`12/${availability[i].day}`}</li>
            <li id='time'>{availability[i].time}</li>
        </ul>
            <TakeMoney stylist_name={this.props.stylist_name} business_id={availability[i].business_id} calendar_id={availability[i].id} service_id={this.props.service_id} month_name={availability[i].month_name} day={availability[i].day} appointment_time={availability[i].time}full_name={this.props.userInfo.full_name}/>
        </div>
       ) 
       console.log(availability[i].id)
    }
    return time
} 


render(){
   return ( 
   <div id='wrapper'>
 
    <span className='current-month'>December</span>

<div className='availability-list'>
{this.availability()}
    </div>
      <span >CLIENTS REQUIRED TO PROVIDE CREDIT CARD TO BOOK</span>  
    </div>
        




    )
}
}


  

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}
const bindActionCreators = { getUserInfo }
export default connect(mapStateToProps, bindActionCreators)(Schedule)