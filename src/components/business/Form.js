// import React, { Component } from 'react'
// import close from '../assets/close.png'
// import './form.css'
// import {connect} from 'react-redux'
// // import {ADD_BUSINESS_NAME, ADD_ADDRESS, ADD_PHONE, ADD_CITY, ADD_ADDRESS, ADD_STATE, ADD_ZIP} from '../../ducks/reducer'


// class Form extends Component {

//     render() {
//         const {addAddress, addZip, addBusinessName,addCity, addPhone, addState} = this.props
//         return (
//             <div className='App'>
//                 <div className='form-modal'>
//                     <form className='form'>
//                     <div className='form-header'>
//                     <span onClick={this.props.onClose}className='form-cancel'>CANCEL</span>
//                     <span className='form-title'>Add Business Info</span>
//                     <span className='form-save'>Next</span>

//                     </div>
//                         {/* <img className='x-close' src={close} onClick={this.props.onClose} width='15px' height='15px' /> */}
//                         <div className='form-input-container1'>
                
//                             <div className='business-inputs'>
//                                 <input placeholder='Business Name' className='business-name' onChange={(e) => addBusinessName(e.target.value)} />
//                                 <input className='phone' placeholder='Phone Number on Profile' onChange={(e) => addPhone(e.target.value)}/>
//                                 <span className='business-location'>Business Location</span>
//                                 <input placeholder='Business Address' className='business-address' onChange={(e) => addAddress(e.target.value)} />
//                                 <input placeholder='City' className='city-input' onChange={(e) => addCity(e.target.value)} />
//                                 <input placeholder='State' className='state-input' onChange={(e) => addState(e.target.value)} />
//                                 <input placeholder='Zip Code' className='zip-input' onChange={(e) => addZip(e.target.value)} />
//                             </div>
//                             {/* <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} />
//                         <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} /> */}
//                         {/* <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} />
//                         <input placeholder='Zip Code' className='zip-input' onChange={(e) => this.email(e.target.value)} /> */}
//                         {/* <textarea placeholder='Description' className='description' onChange={(e) => this.email(e.target.value)} /> */}
//                         {/* <span className='form-forgot-pw'>Forgot your password?</span>
//                         <button className='form-login-button' onClick={this.login}>Sign Up</button> */}
//                         </div>

//                     </form>
//             </div>

//             </div >

//         )
//     }
// }

// export function mapStateToProps(state){
//     const {business_name, phone, address, city, State, zip, description} = state
//     return {
//         business_name,
//         phone, 
//         address,
//         city,
//         State,
//         zip,


//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         addBusinessName: business => dispatch ({type: 'ADD_BUSINESS_NAME', payload: business }),
//         addPhone: phone => dispatch ({type: 'ADD_PHONE', payload: phone }),
//         addAddress: address => dispatch({type: 'ADD_ADDRESS', payload: address}),
//         addCity: city => dispatch({type: 'ADD_CITY', payload: city}),
//         addState: State => dispatch({type: 'ADD_STATE', payload: State}),
//         addZip: zip => dispatch({type: 'ADD_ZIP', payload: zip}),
   
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Form)

