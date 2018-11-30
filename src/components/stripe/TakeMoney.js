
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
import { addAppointment } from '../../ducks/actions/action_creators'



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
            

        }

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
     .then((response) => {
       console.log(response)
        axios.post(`/api/appointments/${this.props.business_id}`, this.props.service_id, this.props.id)
        .then((res) => {
          if(res.status === 200) {
            axios.post('/sendEmail', this.props.full_name, this.props.calendar.month_name)
            .then(() => {
              this.props.history.push('/dashboard')
            })
            alert('Your appointment has been created')
          }
        })
       })

  }

  // ...

  render() {
console.log(this.props.time)
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
  const {name, profession, description, email, website, time, appointment} = state
  return {
     name,
      profession, 
      description,
      email,
      website,
      time,
      appointment


  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//       addName: name => dispatch ({type: 'ADD_NAME', payload: name }),
//       addProfession: profession => dispatch ({type: 'ADD_PROFESSION', payload: profession }),
//       addDescription: description => dispatch({type: 'ADD_DESCRIPTION', payload: description}),
//       addEmail: email => dispatch({type: 'ADD_EMAIL', payload: email}),
//       addWebsite: website => dispatch({type: 'ADD_WEBSITE', payload: website}),

 
//   }
// }
const bindActionCreators = {addAppointment}
export default connect(mapStateToProps, bindActionCreators)(TakeMoney)
