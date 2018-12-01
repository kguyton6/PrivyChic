
import StripeCheckout from 'react-stripe-checkout'
import React, { Component } from 'react'
import close from '../assets/close.png'
// import './profile_form.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {Elements, StripeProvider} from 'react-stripe-elements';
// import CheckoutForm from '../stripe/CheckOutForm';
import Login from '../login/modal/login/Login'
import '../login/modal/login/login.css'
import './stripe.css'
import axios from 'axios';
// import { bindActionCreators } from '../../../../../../Library/Caches/typescript/3.1/node_modules/redux';
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
        this.props.addAppointment(this.props.month_name, this.props.day)
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
     axios.post(`/save-stripe-token`, { stripeToken,  })
     .then((res) => {
         console.log(res)
         this.setState({customer_id: res.data.data.customer.id})
     },
        axios.post(`/api/appointments/${this.props.business_id}`, 
        {service_id: this.props.service_id, 
         calendar_id: this.props.calendar_id, 
        token: this.state.customer_id})
        .then((res) => {
            console.log(res)
        },
            axios.post('/sendEmail', 
            { email: this.props.userInfo.email, 
            full_name: this.props.userInfo.full_name, 
            stylist_name: this.props.stylist_name, 
            month_name: this.props.month_name,
            day:  this.props.day, 
            time: this.props.appointment_time })
            .then((res) => {
                console.log(res) 
                 if(res.status === 200){
                     this.props.history.push('/')
                    }
                    return alert('appointment has been booked')
                }))
        )
             
 } 
    
    

//   [2]._owner.child.pendingProps.children[""0""]._self.props.calendar
//   [2]._owner.child.pendingProps.children[""0""]._owner.stateNode.props
//   [2]._owner.stateNode.props.calendar
//   [2]._owner.pendingProps
//   [""0""]._self.props
  // ...

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
export default connect(mapStateToProps, bindActionCreators)(TakeMoney)
