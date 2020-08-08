import * as actionTypes from '../actions/actionTypes'

const createGameField = () => {
    return [];
}

const createElement = (elementType) => {
    return {
        elementPosition: null,
        elementType: null,
        elementOrientation: null
    }
}

const defaultState = {
    gameField: createGameField(),
    currentElement: createElement()
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ELEMENT:
            console.log('create element')
            return state;
        case actionTypes.MOVE_LEFT:
            console.log('moved left')
            return state;
        case actionTypes.MOVE_RIGHT:
            console.log('moved right')
            return state;
        case actionTypes.GAME_FIELD_UPDATE:
            console.log('game field updated')
            return state;
    
        default:
            return state;
    }
}


export default reducer;