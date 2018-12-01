import React, {Component} from 'react'
import axios from 'axios'
import Griddle from 'griddle-react'
import TakeMoney from '../stripe/TakeMoney'
import './profile.css'

const listElement = {
   fontSize: '12px'
    
}
const serviceList = {
    // width: '100%',
    display: 'flex',
    marginTop: '1%'

}
const goBack = {
    fontSize: '12px',
    color: 'black',
    cursor:'pointer',
    position: 'absolute',
    left: '3%'
}
const required = {
    fontSize: '10px',
    marginTop: '2%'
}

class Availability extends Component {
    constructor(props){
        super(props)

        this.state = {
            availability: []
        }
    }

   

    availability = () => {

        let availability = this.props.calendar
        let time = []

       for(let i in availability){
           console.log(availability)
           time.push(
            <div key={availability[i].id} id='timeList'>
            <ul style={serviceList} id='time-ul'>
                <li style={listElement} id='day-name'>{availability[i].day_name}</li>
                <li style={listElement} id='day-number'>{`12/${availability[i].day}`}</li>
                <li style={listElement} id='time'>{availability[i].time}</li>
            </ul>
                <TakeMoney full_name={this.props.full_name} business_id={availability[i].business_id} id={availability[i].id} service_id={this.state.service_id}/>
            </div>
           )
           console.log(time)
        }
        return time
    } 
    
    
    render(){
        console.log(this.props.calendar)
       return ( 
       <div id='wrapper'>
        <span onClick={this.props.goBack} style={goBack}>{`< Go Back `}</span>
        <span className='current-month'>December</span>

<div className='availability-list'>
    {this.availability()}
        </div>
          <span style={required}>CLIENTS REQUIRED TO PROVIDE CREDIT CARD TO BOOK</span>  
        </div>
            




        )
    }
}

export default Availability