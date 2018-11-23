// import {ADD_EMAIL, ADD_PASSWORD, ADD_PHONE, ADD_FIRST_NAME, ADD_LAST_NAME} from '../constants'
// import axios from 'axios'

// const initialState = {
//     user: {},
//     first_name: '',
//     last_name: '',
//     phone: '',
//     email: '',
//     password: '',

// }

// export const GET_USER = 'GET_USER'


// export const getUserInfo = () => {
//     const userInfo = axios.get('/api/getuser').then((res) => {
//         return res.data
//     })
//     return {
//         type: GET_USER,
//         payload: userInfo
//     }
// }


// // export const addFirstName = first_name => ({ type: ADD_FIRST_NAME, payload: first_name })

// // export const addLastName = last_name => ({ type: ADD_LAST_NAME, payload: last_name })


// // export const addPhone = phone => ({ type: ADD_PHONE, payload: phone })

// // export const addEmail = email => ({ type: ADD_EMAIL, payload: email })

// // export const addPassword = password => ({ type: ADD_PASSWORD, payload: password })



// const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_USER:
//             return Object.assign({}, state, { user: action.payload })

//         case ADD_FIRST_NAME:
//             return Object.assign({}, state, { first_name: action.payload })

//         case ADD_LAST_NAME:
//             return Object.assign({}, state, { last_name: action.payload })

//         case ADD_PHONE:
//             return Object.assign({}, state, { phone: action.payload })

//         case ADD_EMAIL:
//             return Object.assign({}, state, { email: action.payload })

//         case ADD_PASSWORD:
//             return Object.assign({}, state, { password: action.payload })

//         default: return state
//     }
// }

// export default userReducer