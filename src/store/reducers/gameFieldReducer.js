/* eslint-disable no-unused-vars */
import * as actionTypes from '../actions/actionTypes'
import { createGameField, updateGameField, clearFallingElementPos, checkIfLineFinished } from '../utils/gameField'
import setRotate from '../utils/rotating';
import { createElement, moveLeft, moveRight, moveDown } from '../utils/element';

const cloneDeep = require('clone-deep');

const defaultState = {
    gameField: [],
    currentElement: {},
    gameOver: false,
    score: 0
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

        case actionTypes.MOVE_DOWN:
            let updatedField = cloneDeep(state.gameField);
            let updatedElement = cloneDeep(state.currentElement);
            let gameStatus = moveDown(updatedElement,updatedField)
            let earnedPoints = 0;
            if(!updatedElement.isFalling) {
                const result = checkIfLineFinished(updatedField);
                updatedField = result.gameField;
                earnedPoints = result.earnedPoints;
            };

           return {
               ...state,
               gameField: updatedField,
               currentElement: updatedElement,
               gameOver: gameStatus,
               score: state.score + earnedPoints
           };

        case actionTypes.GAME_FIELD_CREATE:

            const newGameField = createGameField();
            return {
                ...state,
                gameField: newGameField,
                score: 0
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
        
        case actionTypes.ROTATE_CLOCKWISE:{

            let updatedField = cloneDeep(state.gameField)

            updatedField = clearFallingElementPos(state.currentElement, updatedField)
            const rotatedElement = setRotate(state.currentElement, 'clockwise', updatedField);

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
        
        case actionTypes.RESTART_GAME: {
            return {
                ...state,
                gameOver: false
            };
        }

        default:
            return state;
    }
}

export default reducer;