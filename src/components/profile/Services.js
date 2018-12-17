import React, {Component} from 'react'
import axios from 'axios';
import './profile.css'
import Appointment from '../forms/Appointment'
import {Link} from 'react-router-dom'
import TakeMoney from '../stripe/TakeMoney';
import {getUserInfo} from '../../ducks/actions/action_creators'
import {connect} from 'react-redux'
import Login from '../modal/login/Login'
import Availability from './Availability';

const serviceList = {
    width: '100%',
    display: 'flex',
    marginTop: '1%'

}

const menuStyle = {
    width: '90%',
    fontSize: '14px'

}

const buttonStyle = {
    padding: '0px 10px',
    backgroundColor: '#5CD3CA',
    color: 'white'
}
const listElement = {
    height: '30px'
    
}

class Services extends Component {
    constructor(props){
        super(props)

        this.state = {
            services: [],
            availibleTimes: [],
            service_id: null,
            showAvailable: false

        }
    }
         
       
            showTimes = (id) => {
                this.setState(prevState => {
                    return {
                 showAvailable: !prevState.showAvailable,
                 service_id: id
                    }
                })
            }

                showAvailability = () => {
                console.log(this.state.service_id)

                    if(this.state.showAvailable){
                        return (
                            <Availability service_id={this.state.service_id} goBack={this.showTimes} stylist_name={this.props.stylist_name}calendar={this.props.calendar} />
                        )
                    }
                }
                
            
        showServices = () => {
            // if(this.state.showServices === true){
            let services = this.props.services
            let service = []
            for(let i in services){
                service.push(
                    <div key={i} >          
                        <ul style={serviceList}>
                            <li  id='service_name'>{services[i].service_name}</li>
                            <li  id='description'>{services[i].description}</li>
                            <li  id='price'>{services[i].price}</li>
                            <li  id='duration'>{services[i].duration}</li>
                        <button style={buttonStyle} id='service-button'onClick={() => this.showTimes(services[i].service_id)}>Select</button>
                        </ul>
                    </div>
                )
            }
            return service
        
    }


  
    
       
    render(){
        console.log(this.props.userInfo)

        return (

            
            <React.Fragment>
                {/* {this.showTimes()} */}
            {!this.state.showAvailable ?
            <div className='services'>
            {this.showServices()} 
            </div>:
             <div className='services'>
            {this.showAvailability()}
           </div>}
        
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