import React, { Component } from 'react'
import { MOVE_LEFT, MOVE_RIGHT, SCORE_UPDATE, GAME_FIELD_UPDATE } from '../../store/actions/actionTypes'
import { connect } from 'react-redux'

class GameManager extends Component {
    render() {
        return (
            <React.Fragment>
                testtest
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        elementPosition: null,
        elementType: null,
        elementOrientation: null,
        gameField: null,
        score: 0
    }
}

const mapDispatchToProps = (dispatch) => ({
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