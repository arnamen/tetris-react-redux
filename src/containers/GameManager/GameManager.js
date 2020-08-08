import React, { Component } from 'react'

import { MOVE_LEFT, MOVE_RIGHT, SCORE_UPDATE, GAME_FIELD_UPDATE, CREATE_ELEMENT } from '../../store/actions/actionTypes'
import { connect } from 'react-redux'

//assets
import background from '../../assets/Mockup/background.jpg'
//

import classes from './GameManager.module.css';

class GameManager extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={classes.GameBoard}>
                    <img src={background} alt='background' className={classes.gameBoard_background}></img>
                </div>
                <div className={classes.Information}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat
                </div>
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