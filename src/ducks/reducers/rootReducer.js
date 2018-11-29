import {ADD_ADDRESS, ADD_BUSINESS_NAME, ADD_STATE, ADD_CITY, ADD_PICTURE, ADD_DATE, ADD_DESCRIPTION, ADD_FIRST_NAME, ADD_STYLIST_NAME, ADD_LAST_NAME, ADD_PHONE, ADD_ZIP, GET_USER, ADD_TIMES, ADD_APPOINTMENT, ADD_PORTFOLIO, ADD_EMAIL,ADD_PASSWORD, ADD_FULLNAME, SHOW_SERVICES} from '../constants'

import '../actions/action_creators'


const initialState = {
    first_name: '',
    last_name: '',
    business_name: '',
    description: '',
    address: '',
    city: '',
    State: '',
    zipcode: null,
    picture: '',
    phone: '',
    email: '',
    password: '',
    full_name: '',
    date: '',
    userInfo: {},
    time: {},
    appointment: {},
    portfolio: '',
    // displayServices: false
}





 const rootReducer = (state = initialState, action) => {
        console.log('REDUCER HIT: Action ->', action);
        switch (action.type) {
            case SHOW_SERVICES:
            return Object.assign({}, state, {services: action.payload})

            case GET_USER:
            return Object.assign({}, state, {userInfo: action.payload})

            case ADD_PORTFOLIO:
            return Object.assign({}, state, {portfolio: action.payload})
           
            case ADD_FIRST_NAME:
                return Object.assign({}, state, { first_name: action.payload })

            case ADD_LAST_NAME:
                return Object.assign({}, state, { last_name: action.payload })

            case ADD_FULLNAME:
                return Object.assign({}, state, {full_name: action.payload})

            case ADD_BUSINESS_NAME:
                return Object.assign({}, state, { business_name: action.payload })

            case ADD_EMAIL: 
                return Object.assign({}, state, {email: action.payload})

            case ADD_DESCRIPTION:
                return Object.assign({}, state, { description: action.payload })

            case ADD_ADDRESS:
                return Object.assign({}, state, { address: action.payload })

            case ADD_CITY:
                return Object.assign({}, state, { city: action.payload })

            case ADD_STATE:
                return Object.assign({}, state, { State: action.payload })

            case ADD_ZIP:
                return Object.assign({}, state, { zipcode: action.payload })

            case ADD_PICTURE:
                return Object.assign({}, state, { picture: action.payload })

            case ADD_PHONE:
                return Object.assign({}, state, { phone: action.payload })

            case ADD_STYLIST_NAME:
                return Object.assign({}, state, { stylist_name: action.payload })

            case ADD_DATE:
                return Object.assign({}, state, { date: action.payload })
         
           case ADD_TIMES:
            return Object.assign({}, state, {time: action.payload})

            case ADD_APPOINTMENT:
            return Object.assign({}, state, {appointment: action.payload})

            case ADD_PASSWORD: 
            return Object.assign({}, state, {password: action.payload})
            
            default: return state
        }
    }

    
export default rootReducer