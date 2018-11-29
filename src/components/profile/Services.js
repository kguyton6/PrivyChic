import React, {Component} from 'react'
import axios from 'axios';
import './profile.css'
import Appointment from '../forms/Appointment'
import {Link} from 'react-router-dom'
import TakeMoney from '../stripe/TakeMoney';
import {getUserInfo} from '../../ducks/actions/action_creators'
import {connect} from 'react-redux'
import Login from '../login/modal/login/Login'

const serviceList = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    borderBottomColor: '#D0D5D4',
    marginTop: '1%'

}
const goBack = {
    fontSize: '14px',
    color: 'black',
    cursor:'pointer',


}
const menuStyle = {
    width: '90%',
    height: '60px',
    fontSize: '14px'

}

const buttonStyle = {
    padding: '5px 20px',
    marginBottom: '5%',

    float: 'right',
    backgroundColor: '#5CD3CA',
    color: 'white'
}
const listElement = {
    height: '50px'
    
}
const title = {
    height: '40px',
    fontWeight: 'bold',
    textDecoration: 'underline',
    margin: '3%',
    marginLeft: '10%' 
}
class Services extends Component {
    constructor(props){
        super(props)

        this.state = {
            services: [],
            availibleTimes: [],
            service_id: null,
            showServices: true

        }
    }
            // componentWillMount = () => {
            //     axios.get('/checkSession')
            //     .then((res) => {
            //         if(res.data){
            //             this.props.userInfo(res.data)
            //         } else {
            //             return false
            //         }
            //     })
            // }

            showTimes = (id) => {
                this.setState({showServices: false, service_id: id})
                       return this.props.showAvailability()
                
            }

        //     availability = (service_id) => {
        //     if(this.state.showServices === false){ 
                
               
        // }
    
// }
        showServices = () => {
            // if(this.state.showServices === true){
            let services = this.props.services
            let service = []
            for(let i in services){
                service.push(
                    <div key={i} style={menuStyle}>          
                        <ul style={serviceList}>
                            <li style={listElement} id='service_name'>{services[i].service_name}</li>
                            <li style={listElement} id='description'>{services[i].description}</li>
                            <li style={listElement} id='price'>{services[i].price}</li>
                            <li style={listElement} id='duration'>{services[i].duration}</li>
                        </ul>
                        <button style={buttonStyle} onClick={() => this.showTimes(services[i].service_id)}>Select</button>
                    </div>
                )
            }
            return service
        
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
                    <TakeMoney business_id={availability[i].business_id} id={availability[i].id} service_id={this.state.service_id}/>
                </div>
               )
               console.log(time)
            }
            return time
        } 
        
  
    
       
    render(){
        console.log(this.props.userInfo)

        return (

            
            <React.Fragment>
                {/* {this.showTimes()} */}
            {this.state.showServices === true ?
            <div className='services'>
            {this.showServices()} 
            </div>:
            <div className='wrapper'>
                        <span onClick={this.showServiceTitles} style={goBack}>{`< Go Back `}</span>
                        <span className='current-month'>December</span>

            <div className='availability-list'>
            {this.availability()}
            </div>
            CLIENTS REQUIRED TO PROVIDE CREDIT CARD TO BOOK
            </div>
        }
        </React.Fragment>



        )
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

const bindActionCreators = {getUserInfo}

export default connect(mapStateToProps, bindActionCreators)(Services)