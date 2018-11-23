// import {ADD_ADDRESS, ADD_BUSINESS_NAME, ADD_CITY, ADD_DATE, ADD_DESCRIPTION, ADD_FULLNAME, ADD_PICTURE, ADD_ZIP, ADD_STATE} from '../constants'

// const initialState = {
//     business_name: '',
//     description: '',
//     address: '',
//     city: '',
//     State: '',
//     zip: null,
//     picture: '',
//     full_name: '',
//     date: ''
// }


// const businessReducer = (state = initialState, action) => {
//     console.log('reducer hit', action)
//     switch (action.type) {
//         case ADD_BUSINESS_NAME:
//             return Object.assign({}, state, { business_name: action.payload })

//         case ADD_DESCRIPTION:
//             return Object.assign({}, state, { description: action.payload })

//         case ADD_ADDRESS:
//             return Object.assign({}, state, { address: action.payload })

//         case ADD_CITY:
//             return Object.assign({}, state, { city: action.payload })

//         case ADD_STATE:
//             return Object.assign({}, state, { State: action.payload })

//         case ADD_ZIP:
//             return Object.assign({}, state, { zip: action.payload })

//         case ADD_PICTURE:
//             return Object.assign({}, state, { picture: action.payload })


//         case ADD_FULLNAME:
//             return Object.assign({}, state, { full_name: action.payload })

//         case ADD_DATE:
//             return Object.assign({}, state, { date: action.payload })

//         default:
//             return state
//     }

// }
// export default businessReducer