const initalState = {
    user: {},
    search: ''
}

const SEARCHFIELD = 'SEARCHFIELD'

export default function reducer (state = initalState, action ) {
    console.log('reducer hit ----->', action)
    switch(action.type) {
        case SEARCHFIELD:
        Object.assign({}, state, { search: action.payload })
        
        default:
        return state
    }
}

export const searchField = search => ({type: SEARCHFIELD, payload: search})