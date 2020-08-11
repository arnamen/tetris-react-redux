/* eslint-disable no-unused-vars */
import * as actionTypes from '../actions/actionTypes'
import { createElement, createGameField, updateGameField, moveLeft, moveRight, lowerElement } from '../utils/utils'

const cloneDeep = require('clone-deep');

const defaultState = {
    gameField: [],
    currentElement: {},
    gameOver: false
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {

        case actionTypes.CREATE_ELEMENT:
            const newElement = createElement(action.elemType);
            console.log('create element')
            return {
                ...state,
                currentElement: newElement
            };

        case actionTypes.MOVE_LEFT:{
            const updatedField = cloneDeep(state.gameField);
            const movedElement = cloneDeep(state.currentElement);
            moveLeft(movedElement, updatedField);

            return {
                ...state,
                currentElement: movedElement,
                gameField: updatedField
            };
        }

        case actionTypes.MOVE_RIGHT:{
            const updatedField = cloneDeep(state.gameField);
            const movedElement = cloneDeep(state.currentElement);
            const movedElementR = moveRight(movedElement, updatedField);

            return {
                ...state,
                currentElement: movedElement,
                gameField: updatedField
            };
        }

        case actionTypes.GAME_FIELD_CREATE:

            const newGameField = createGameField();
            return {
                ...state,
                gameField: newGameField
            };

        case actionTypes.GAME_FIELD_UPDATE:{
            
            const updatedField = cloneDeep(state.gameField);
            const currentElement = cloneDeep(state.currentElement);
            updateGameField(currentElement, updatedField);

            return {
                ...state,
                gameField: updatedField,
                currentElement: currentElement
            };
        }
        case actionTypes.LOWER_ELEMENT:
             let updatedField = cloneDeep(state.gameField);
             let updatedElement = cloneDeep(state.currentElement);
             const gameStatus = !lowerElement(updatedElement,updatedField)

            return {
                ...state,
                gameField: updatedField,
                currentElement: updatedElement,
                gameOver: gameStatus
            };
        
        default:
            return state;
    }
}

export default reducer;