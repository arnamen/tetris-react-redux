import * as actionTypes from './actionTypes'

import axios from '../../axios-tetris'

const getScoresDataStart = () => {
    return {
        type: actionTypes.SCORES_GET_START
    }
}

const getScoresDataSuccess = (scores) => {
    return {
        type: actionTypes.SCORES_GET_SUCCESS,
        scores: scores
    }
}

const getScoresDataFail = (error) => {
    return {
        type: actionTypes.SCORES_GET_FAIL,
        error: error
    }
}

export const getScoresData = () => {
    return (dispatch) => {
        dispatch(getScoresDataStart());
        axios.get('/scoreboard.json')
        .then((response) => {
            dispatch(getScoresDataSuccess(response.data))
        })
        .catch((error) => {
            dispatch(getScoresDataFail(error))
        });
    }
}
