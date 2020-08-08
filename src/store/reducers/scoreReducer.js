import * as actionTypes from '../actions/actionTypes'

const defaultState = {
    score: 0
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SCORE_UPDATE:
            console.log('score updated')
            return state;
    
        default:
            return state;
    }
}


export default reducer;