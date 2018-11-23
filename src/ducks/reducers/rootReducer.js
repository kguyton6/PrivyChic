// import { combineReducers } from 'redux'
import axios from 'axios'
import {ADD_ADDRESS, ADD_BUSINESS_NAME, ADD_STATE, ADD_CITY, ADD_PICTURE, ADD_DATE, ADD_DESCRIPTION, ADD_EMAIL, ADD_FIRST_NAME, ADD_FULLNAME, ADD_LAST_NAME, ADD_PASSWORD, ADD_PHONE, ADD_ZIP, GET_USER} from '../constants'


const initialState = {
    first_name: '',
    last_name: '',
    business_name: '',
    description: '',
    address: '',
    city: '',
    State: '',
    zipcode: 0,
    picture: '',
    phone: '',
    email: '',
    password: '',
    full_name: '',
    date: '',
    user: {}

}



// action creators
export const getUserInfo = () => {
    console.log('get user hit')
    const userInfo = axios.get('/api/getuser').then( res => {
        console.log(res.data)
        return res.data
    })
    return {
        type: GET_USER,
        payload: userInfo
    }
}


 const rootReducer = (state = initialState, action) => {
        console.log('REDUCER HIT: Action ->', action);
        switch (action.type) {
            case GET_USER:
                return Object.assign({}, state, {user: action.payload})
            case ADD_FIRST_NAME:
                return Object.assign({}, state, { first_name: action.payload })

            case ADD_LAST_NAME:
                return Object.assign({}, state, { last_name: action.payload })

            case ADD_BUSINESS_NAME:
                return Object.assign({}, state, { business_name: action.payload })

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

            case ADD_EMAIL:
                return Object.assign({}, state, { email: action.payload })

            case ADD_PASSWORD:
                return Object.assign({}, state, { password: action.payload })

            case ADD_FULLNAME:
                return Object.assign({}, state, { full_name: action.payload })

            case ADD_DATE:
                return Object.assign({}, state, { date: action.payload })

            default: return state
        }
    }
export const addFirstName = first_name => ({ type: ADD_FIRST_NAME, payload: first_name })

export const addLastName = last_name => ({ type: ADD_LAST_NAME, payload: last_name })

export const addBusinessName = business_name => ({ type: ADD_BUSINESS_NAME, payload: business_name })
export const addDescription = description => ({ type: ADD_DESCRIPTION, payload: description })

export const addAddress = address => ({ type: ADD_ADDRESS, payload: address })

export const addCity = city => ({ type: ADD_CITY, payload: city })

export const addState = State => ({ type: ADD_STATE, payload: State })

export const addZip = zipcode => ({
    type: ADD_ZIP, payload: zipcode
})

export const addPicture = picture => ({ type: ADD_PICTURE, payload: picture })

export const addPhone = phone => ({ type: ADD_PHONE, payload: phone })

export const addEmail = email => ({ type: ADD_EMAIL, payload: email })

export const addPassword = password => ({ type: ADD_PASSWORD, payload: password })

export const addFullName = full_name => ({ type: ADD_FULLNAME, payload: full_name })

export const addDate = date => ({ type: ADD_DATE, payload: date })



export default rootReducer