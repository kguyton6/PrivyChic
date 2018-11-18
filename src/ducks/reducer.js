const initialState = {
    business_name: '',
   description: '',
   address: '',
   city:'',
   State: '',
   zip: null, 
   image_url: '',
   loan_amount: '',
   phone: '',
   rent: null,

}


export const ADD_BUSINESS_NAME = 'ADD_BUSINESS_NAME'
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION'
export const ADD_ADDRESS = 'ADD_ADDRESS'
export const ADD_CITY = 'ADD_CITY'
export const ADD_STATE = 'ADD_STATE'
export const ADD_ZIP = 'ADD_ZIP'
export const ADD_IMAGE = 'ADD_IMAGE'
export const ADD_PHONE = 'ADD_PHONE'
export const ADD_LOAN = 'ADD_LOAN'
export const ADD_RENT = 'ADD_RENT'




const rootReducer = (state = initialState, action) => {
    console.log('REDUCER HIT: Action ->', action );
    switch (action.type) {
        case ADD_BUSINESS_NAME:
        return Object.assign({}, state, {business_name: action.payload })
       
        case ADD_DESCRIPTION:
        return Object.assign({}, state, {description: action.payload})

        case ADD_ADDRESS:
        return Object.assign({}, state, {address: action.payload})

        case ADD_CITY:
        return Object.assign({}, state, {city: action.payload})

        case ADD_STATE:
        return Object.assign({}, state, {State: action.payload})

        case ADD_ZIP:
        return Object.assign({}, state, {zipcode: action.payload})

        case ADD_IMAGE:
        return Object.assign({}, state, {image_url: action.payload})

        case ADD_PHONE:
        return Object.assign({}, state, {phone: action.payload})

        case ADD_LOAN:
        return Object.assign({}, state, {loan_amount: action.payload})

        case ADD_RENT:
        return Object.assign({}, state, {rent: action.payload})

       default: return state
    }
}

export const addBusinessName = business_name => ({ type: ADD_BUSINESS_NAME, payload: business_name })
export const addDescription = description => ({type: ADD_DESCRIPTION, payload: description})

export const addAddress = address => ({type: ADD_ADDRESS, payload: address})

export const addCity = city => ({type: ADD_CITY, payload: city})

export const addState = State => ({type: ADD_STATE, payload: State})

export const addZip = zipcode => ({
    type: ADD_ZIP, payload: zipcode
})

export const addImage = image_url => ({type: ADD_IMAGE, payload: image_url})

export const addPHONE = monthly_PHONE => ({type: ADD_PHONE, payload: monthly_PHONE})

export const addLoan = loan_amount => ({type: ADD_LOAN, payload: loan_amount})

export const addRent = rent => ({type: ADD_RENT, payload: rent})

// export const recommendRent = recommendRent => ({type: RECOMMENDED_RENT, payload: recommendRent  })
export default rootReducer;
