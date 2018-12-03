
import StripeCheckout from 'react-stripe-checkout'
import React, { Component } from 'react'
import close from '../assets/close.png'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Login from '../login/modal/login/Login'
import '../login/modal/login/login.css'
import './stripe.css'
import axios from 'axios';
import { addAppointment, getUserInfo } from '../../ducks/actions/action_creators'



const bodyStyle = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1496671431883-c102df9ae8f9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=175b0b8669665379bd86e8c1e0d4df3b&auto=format&fit=crop&w=500&q=60)',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    backgroundSize: '100%'
}

const book = {
    display: 'flex',
    width: '100%'
}
const heading = {
    textAlign: 'center',
    marginBottom: '5%',
    fontSize: '12px'
}
const paymentModal = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '70%',
    width: '90%'
}
class TakeMoney extends Component {
    constructor(props){
        super(props)

        this.state = {
            complete:false,
            showLogin: false,
            showSignUp: false,
            customer_id: null

        }

    }

    componentDidMount = () => {
        axios.get('/checkSession')
        .then((res) => {
            this.props.getUserInfo(res.data)
        })


    }
   
    toggleLogin = () => {
        this.setState(prevState => {
            return {
                showLogin: !prevState.showLogin
            }
        })
    }

    toggleSignUp = () => {
        this.setState(prevState => {
            return {
                showSignUp: !prevState.showSignUp
            }
        })
    }

    showModal = () => {
        if(this.state.showLogin){
            return (
                <Login onClose={this.toggleLogin} showLogin={this.state.showLogin}/>
            )
        } else {
            if(this.state.showSignUp){
                return (
                    <Login onClose={this.toggleSignUp} />
                )
            }
        }
    }

  onToken = (stripeToken) => {
     axios.post(`/save-stripe-token`, { stripeToken, email: this.props.userInfo.email })
     .then(() => {
        return this.appointment()
       
     })
}

appointment = () => {
    axios.post(`/api/appointments/${this.props.business_id}`, 
    {service_id: this.props.service_id, 
     calendar_id: this.props.calendar_id, 
     client_id: this.props.userInfo.user_id,
    token:  `${this.props.calendar_id}${this.props.userInfo.user_id}`})
    .then(() => {
            axios.post('/sendEmail', 
            { email: this.props.userInfo.email, 
            full_name: this.props.userInfo.full_name, 
            stylist_name: this.props.stylist_name, 
            month_name: this.props.month_name,
            day:  this.props.day, 
            time: this.props.appointment_time })
     })
         .then(() => {
              return this.props.history.push(`/dashboard/${this.props.userInfo.user_type}/${this.props.userInfo.user_id}`)
                
                
            
            
        })
        alert(`Appointment booked with ${this.props.stylist_name}`)  
}

        


       

  render() {
console.log(this.props.calendar_id )
    return (
      <div className='App'>

      {this.showModal()}
      <StripeCheckout 
        
        token={this.onToken}
        stripeKey="pk_test_NefMV9t3i0NKeHNolVvWb4Zb"
        >
         <button className="Stripe-Button">
        Select
      </button> 
        
      </StripeCheckout>
    
       </div>
    )
  }
}
export function mapStateToProps(state){
  const {full_name, profession, description, email, website, time, appointment, stylist_name, userInfo} = state
  return {
     full_name,
      profession, 
      description,
      email,
      website,
      time,
      appointment,
      full_name,
      stylist_name,
      userInfo,



  }
}


const bindActionCreators = {addAppointment, getUserInfo}
export default withRouter(connect(mapStateToProps, bindActionCreators)(TakeMoney))
