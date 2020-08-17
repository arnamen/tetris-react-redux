import * as actionTypes from '../actions/actionTypes'

const defaultState = {
    scores: null,
    userSavedScore: null, /* устанавливается в true или false в зависимости от нажатой кнопки при game over */
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SCORES_DONT_SAVE_NEW_SCORE:
            return {
                ...state,
                userSavedScore: false
            };
    case actionTypes.SCORES_SAVE_NEW_SCORE:
        return {
            ...state,
            userSavedScore: true
        };
    case actionTypes.SCORES_GET:
        return state;
    case actionTypes.SCORES_POST:
        return state;
    default:
        return state
    }
}



export default reducer;