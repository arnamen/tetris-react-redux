import * as actionTypes from '../actions/actionTypes'

import axios from '../../axios-tetris'

const defaultState = {
    scores: null,
    userSavedScore: null, /* устанавливается в true или false в зависимости от нажатой кнопки при game over */
    scoreSaved: null, /* устанавливается в true или false после того как пользователь введёт имя */
    loading: false,
    error: null
}

const scoresGetStart = (state, action) => {
    return {
        ...state,
        loading: true
    };
}

const scoresGetSuccess = (state, action) => {
    return {
        ...state,
        error: null,
        scores: action.scores,
        loading: false
    };
}

const scoresGetFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        scores: null,
        loading: false
    };
}

const userSavedScore = (state, action) => {
    return {
        ...state,
        userSavedScore: true
    };
}


const dontSaveNewScore = (state, action) => {
    return {
        ...state,
        userSavedScore: false
    };
}

const saveNewScore = (state, action) => {

    if(isNaN(action.score)) {
        alert('Nope :)');
        return state;
    }
    axios.post('/scoreboard.json', {
        userName: action.userName === '' ? 'Anonymous' : action.userName, 
        score: action.score
    })
    return {
        ...state,
        scoreSaved: true
    };
}

const resetSavedScore = (state, action) => {
    return {
        ...state,
        userSavedScore: null,
        scoreSaved: null
    }
}


const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SCORES_USER_SAVED_SCORE: return userSavedScore(state, action)
        case actionTypes.SCORES_DONT_SAVE_NEW_SCORE: return dontSaveNewScore(state, action);
        case actionTypes.SCORES_SAVE_NEW_SCORE: return saveNewScore(state, action);
        case actionTypes.SCORES_GET_START: return scoresGetStart(state, action);
        case actionTypes.SCORES_GET_SUCCESS: return scoresGetSuccess(state, action);
        case actionTypes.SCORES_GET_FAIL: return scoresGetFail(state, action);
        case actionTypes.SCORES_RESET_SAVED_SCORE: return resetSavedScore(state, action)
        default:
            return state
    }
}



export default reducer;