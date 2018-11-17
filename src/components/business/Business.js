import React, { Component } from 'react'
import logo from '../assets/Artboard1.png'
import './business.css'
import { Link } from 'react-router-dom'
import Form from '../business/Form'

class Business extends Component {
    constructor(props) {
        super(props)

        this.state = {
            formModal: false
        }

    }

    toggleModal = () => {
        this.setState(prevState => {
          return {
            formModal: !prevState.formModal
          }
        })
      }


    showModal = () => {
        if (this.state.formModal) {
            return (
                <Form onClose={this.toggleModal}  />
            )
        }

    }

    render() {
        return (
            <div className='Business'>

                <div className='business-header'>
                    <Link to='/'><img src={logo} alt='logo' className='business-logo' width='190px' height='70px' /></Link>
                    <nav className='business-nav'>
                        <span className='business-nav-links'>Pricing</span>
                        <span className='business-nav-links'>Blog</span>
                        <span className='business-nav-links'>Login</span>
                        <span className='business-nav-links'>Sign Up</span>
                        <span className='business-nav-links'>Help</span>
                    </nav>
                </div>
                {this.showModal()}
                <div className='top-business-box'>
                    <div className='business-left-box'>
                        Be Independent. <br />
                        Invest in Yourself.<br />
                        Trust StyleSeat with the rest.
<span className='small-text'>#1 Appointment booking and online scheduling software for independent professionals.</span>
                        <button onClick={this.toggleModal} className='left-box-button'>Try It Now</button>
                        <span className='trial-text'>30 day free trial, no card required</span>
                    </div>
                </div>
                <div className='business-main-box'>
                
                    <div className='main-title'>
                        <span className='bold-text1'>Why PrivyChic?</span>
                        <span className='bold-text2'>Get the freedom to do what you love</span>
                    </div>
                    <div className='boxes'>
                        <div className='outer-box'><span className='box1'>1</span>
                            <span className='box-title'>Get Online</span>
                            <p className='paragraph'>
                                Set up your professional website and let clients know you're available to be booked online. Include your services, business hours and photo gallery.</p>
                        </div>
                        <div className='outer-box'><span className='box1'>2</span>
                            <span className='box-title'>Get Organized</span>
                            <p className='paragraph'>
                                Manage your schedule and client notes. Appointment reminders are sent automatically.</p>
                        </div>
                        <div className='outer-box'><span className='box1'>3</span>
                            <span className='box-title'>Get Booked</span>
                            <p className='paragraph'>
                                Use your new VIP link to promote yourself online through social media, email marketing or by running a promotion. Make it easy for clients to find and book you.</p>
                        </div>
                        <div className='outer-box'><span className='box1'>4</span>

                            <span className='box-title'>Get Paid</span>
                            <p className='paragraph'>
                                Instantly accept credit card payments or set up a no-show late cancellation policy. Get next day payouts directly to your bank account.</p>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default Business