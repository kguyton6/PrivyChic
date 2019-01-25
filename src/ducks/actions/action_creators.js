import {ADD_ADDRESS, ADD_BUSINESS_NAME, ADD_STATE, ADD_CITY, ADD_PICTURE, ADD_DATE, ADD_DESCRIPTION,ADD_FIRST_NAME, ADD_STYLIST_NAME, ADD_LAST_NAME, ADD_PHONE, ADD_ZIP, GET_USER, ADD_TIMES, ADD_APPOINTMENT, ADD_EMAIL, ADD_PORTFOLIO, ADD_PASSWORD, ADD_PROFESSION, ADD_FULLNAME, SHOW_SERVICES, GET_INPUT, ADD_STYLIST} from '../constants'

export const getInputValue = keyword => ({type:GET_INPUT, payload: keyword})

export const showServices = services => ({type: SHOW_SERVICES, payload: services})
export const getUserInfo = user => ({type: GET_USER, payload: user})

export const addProfession = profession => ({type: ADD_PROFESSION, payload: profession})

export const addPortfolio = portfolio => ({type: ADD_PORTFOLIO, payload: portfolio})

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

export const addStylist = stylist => ({type: ADD_STYLIST, payload: stylist})