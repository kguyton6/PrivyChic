import React, {Component} from 'react'
import axios from 'axios';
import './profile.css'
import Appointment from '../forms/Appointment'
import {Link} from 'react-router-dom'
import TakeMoney from '../stripe/TakeMoney';
import {getUserInfo} from '../../ducks/actions/action_creators'
import {connect} from 'react-redux'
import Login from '../login/modal/login/Login'
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
                this.setState(prevState => {
                    return {
                 showAvailable: !prevState.showAvailable,
                 service_id: id
                    }
                })
            }

                showAvailability = () => {
                    if(this.state.showAvailable){
                        return (
                            <Availability service_id={this.state.service_id} goBack={this.showTimes} calendar={this.props.calendar}/>
                        )
                    }
                }
                
            
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