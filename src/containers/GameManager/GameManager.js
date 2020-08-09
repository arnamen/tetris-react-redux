import React, { Component } from 'react'

import { MOVE_LEFT, MOVE_RIGHT, SCORE_UPDATE, GAME_FIELD_UPDATE, CREATE_ELEMENT } from '../../store/actions/actionTypes'
import { connect } from 'react-redux'

import GameInformation from '../../components/GameInfo/GameInfo'
import GameField from '../../components/GameField/GameField'

class GameManager extends Component {
    render() {
        return (
            <React.Fragment>
                <GameField />
            <GameInformation />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentElement: state.gameFieldRed.currentElement,
        gameField: state.gameFieldRed.gameField,
        score: state.scoreRed.score
    }
}

const mapDispatchToProps = (dispatch) => ({
    onCreateElement: () => dispatch({
        type: CREATE_ELEMENT,
        elemType: 'element type'
    }),
    onMoveLeft:() => dispatch({
        type: MOVE_LEFT,
    }),
    onMoveRight:() => dispatch({
        type: MOVE_RIGHT,
    }),
    onScoreUpdate:(score) => dispatch({
        type: SCORE_UPDATE,
        score: score || 'score undefined'
    }),
    onGameFieldUpdate:(gameField) => dispatch({
        type: GAME_FIELD_UPDATE,
        gameField: gameField || 'game field undefined'
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(GameManager);