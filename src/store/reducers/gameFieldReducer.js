/* eslint-disable no-unused-vars */
import * as actionTypes from '../actions/actionTypes'
import { createElement, createGameField, updateGameField, moveLeft, moveRight, lowerElement, clearFallingElementPos } from '../utils/utils'
import setRotate from '../utils/rotating';

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
            moveRight(movedElement, updatedField);
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
             const gameStatus = lowerElement(updatedElement,updatedField)

            return {
                ...state,
                gameField: updatedField,
                currentElement: updatedElement,
                gameOver: gameStatus
            };
        
        case actionTypes.ROTATE_CLOCKWISE:{

            let updatedField = cloneDeep(state.gameField)

            updatedField = clearFallingElementPos(state.currentElement, updatedField)
            const rotatedElement = setRotate(state.currentElement, 'clockwise');

            return {
                ...state,
                currentElement: rotatedElement,
                gameField: updatedField
            };
        }

        case actionTypes.ROTATE_COUNTERCLOCKWISE: {
            let updatedField = cloneDeep(state.gameField)

            updatedField = clearFallingElementPos(state.currentElement, updatedField)
            const rotatedElement = setRotate(state.currentElement, 'counterclockwise');

            return {
                ...state,
                currentElement: rotatedElement,
                gameField: updatedField
            };
        }
    
        default:
            return state;
    }
}

export default reducer;