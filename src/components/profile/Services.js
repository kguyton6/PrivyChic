import React, {Component} from 'react'
import './profile.css'
import {getUserInfo} from '../../ducks/actions/action_creators'
import {connect} from 'react-redux'
import Availability from './Availability';
import styled from 'styled-components'

const serviceList = {
    width: '100%',
    display: 'flex',
    marginTop: '1%'

}

const buttonStyle = {
    padding: '0px 10px',
    backgroundColor: '#5CD3CA',
    color: 'white'
}
const Wrapper = styled.div`
    width: 100%;
  overflow: scroll;
`

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
                return this.props.title()
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


        return (

            
            <Wrapper>
                {/* {this.showTimes()} */}
            {!this.state.showAvailable ?

            this.showServices()
        :

            this.showAvailability()
           }
        
        </Wrapper> 



        )
    }
}
const mapStateToProps = (state) => {
    return {

    }
}

const bindActionCreators = {getUserInfo}

export default connect(mapStateToProps, bindActionCreators)(Services)