import {ADD_ADDRESS, ADD_BUSINESS_NAME, ADD_STATE, ADD_CITY, ADD_PICTURE, ADD_DATE, ADD_DESCRIPTION,ADD_FIRST_NAME, ADD_STYLIST_NAME, ADD_LAST_NAME, ADD_PHONE, ADD_ZIP, GET_USER, ADD_TIMES, ADD_APPOINTMENT, ADD_EMAIL, ADD_PORTFOLIO, ADD_PASSWORD, ADD_PROFESSION, ADD_FULLNAME, SHOW_SERVICES} from '../constants'
import { Z_FULL_FLUSH } from 'zlib';


export const showServices = services => ({type: SHOW_SERVICES, payload: services})
export const getUserInfo = userInfo => ({type: GET_USER, payload: userInfo})

export const addEmail = email => ({type: ADD_EMAIL, payload: email})

export const addPassword = password => ({type: ADD_PASSWORD, payload: password})

export const addProfession = profession => ({type: ADD_PROFESSION, payload: profession})

export const addPortfolio = portfolio => ({type: ADD_PORTFOLIO, payload: portfolio})

export const addFirstName = first_name => ({ type: ADD_FIRST_NAME, payload: first_name })

export const addLastName = last_name => ({ type: ADD_LAST_NAME, payload: last_name })

export const addFullName = full_name => ({type: ADD_FULLNAME, payload: full_name})

export const addBusinessName = business_name => ({ type: ADD_BUSINESS_NAME, payload: business_name })

export const addDescription = description => ({ type: ADD_DESCRIPTION, payload: description })

export const addAddress = address => ({ type: ADD_ADDRESS, payload: address })

export const addCity = city => ({ type: ADD_CITY, payload: city })

export const addState = State => ({ type: ADD_STATE, payload: State })

export const addZip = zip => ({
    type: ADD_ZIP, payload: zip
})

export const addPicture = picture => ({ type: ADD_PICTURE, payload: picture })

export const addPhone = phone => ({ type: ADD_PHONE, payload: phone })

export const addStylistName = stylist_name => ({ type: ADD_STYLIST_NAME, payload: stylist_name })

export const addDate = date => ({ type: ADD_DATE, payload: date })

export const addTimes = time => ({type: ADD_TIMES, payload: time})

export const addAppointment = appointment => ({type: ADD_APPOINTMENT, payload: appointment})

