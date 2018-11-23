import {ADD_ADDRESS, ADD_BUSINESS_NAME, ADD_STATE, ADD_CITY, ADD_PICTURE, ADD_DATE, ADD_DESCRIPTION, ADD_EMAIL, ADD_FIRST_NAME, ADD_FULLNAME, ADD_LAST_NAME, ADD_PASSWORD, ADD_PHONE, ADD_ZIP, GET_USER} from '../constants'

export const getUser = user => ({type: GET_USER, payload: user})

export const addFirstName = first_name => ({ type: ADD_FIRST_NAME, payload: first_name })

export const addLastName = last_name => ({ type: ADD_LAST_NAME, payload: last_name })

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

export const addEmail = email => ({ type: ADD_EMAIL, payload: email })

export const addPassword = password => ({ type: ADD_PASSWORD, payload: password })

export const addFullName = full_name => ({ type: ADD_FULLNAME, payload: full_name })

export const addDate = date => ({ type: ADD_DATE, payload: date })

