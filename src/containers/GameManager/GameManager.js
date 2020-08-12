import React, { Component } from 'react'

import { MOVE_LEFT, MOVE_RIGHT, SCORE_UPDATE, GAME_FIELD_UPDATE, CREATE_ELEMENT, GAME_FIELD_CREATE, LOWER_ELEMENT, ROTATE_CLOCKWISE, ROTATE_COUNTERCLOCKWISE } from '../../store/actions/actionTypes'
import { connect } from 'react-redux'

import GameInformation from '../../components/GameInfo/GameInfo'
import GameField from '../../components/GameField/GameField'

const ELEMENT_TYPES = ['I','L','R','S','T'];

class GameManager extends Component {

    nextElement = null;

    addElement = (elementType) => {

        this.nextElement = ELEMENT_TYPES[randomInteger(0,ELEMENT_TYPES.length-1)]

        this.props.onCreateElement(elementType);
        if(!this.props.gameOver) this.gameProcess();
        else console.log('game over')
    }
    
    gameProcess = () => {
        const gameProcessInterval = setInterval(() => {

            if(!this.props.currentElement.isFalling) {
                //сохранить элемент как часть игрового поля и прекратить его обработку
                this.addElement(this.nextElement);
                clearInterval(gameProcessInterval);
            } 
            else {
                try {
                    this.props.onLowerElement();
                }
                catch (error) {
                    console.log(error)
                    clearInterval(gameProcessInterval);
                }
            }

        }, 300)
    }
    
    moveLeft = () => {
        this.props.onMoveLeft();
        this.props.onGameFieldUpdate();
    }
    
    moveRight = () => {
        this.props.onMoveRight();
        this.props.onGameFieldUpdate();
    }
    
    rotateClockwise = () => {
        this.props.onRotateClockwise();
        this.props.onGameFieldUpdate();
    }
    
    rotateCounterclockwise = () => {
        console.log('here')
        this.props.onRotateCounterclockwise();
        this.props.onGameFieldUpdate();
    }
    

    keysDispatcher = (event) => {
        if(event.key==='ArrowLeft') this.moveLeft();
        else if(event.key === 'ArrowRight') this.moveRight();
        else if(event.key === 'ArrowUp') this.rotateClockwise();
        else if(event.key === 'ArrowDown') this.rotateCounterclockwise();
    }
    

    componentDidMount(){
        this.props.onGameFieldCreate();
        // this.addElement(ELEMENT_TYPES[randomInteger(0,ELEMENT_TYPES.length-1)]);
        this.addElement('I')
        this.props.onGameFieldUpdate()
    }

    render() {
        return (
            <React.Fragment>
                <GameField 
                onKeyDown={(event) => this.keysDispatcher(event)} 
                gameFieldData={this.props.gameField}
                nextElement={this.nextElement}
                />
            <GameInformation />
            </React.Fragment>
        )
    }
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

const mapStateToProps = (state) => {
    return {
        currentElement: state.gameFieldRed.currentElement,
        gameField: state.gameFieldRed.gameField,
        gameOver: state.gameFieldRed.gameOver,
        score: state.scoreRed.score
    }
}

const mapDispatchToProps = (dispatch) => ({
    onCreateElement: (elemType) => dispatch({
        type: CREATE_ELEMENT,
        elemType: elemType
    }),
    onMoveLeft:() => dispatch({
        type: MOVE_LEFT,
    }),
    onMoveRight:() => dispatch({
        type: MOVE_RIGHT,
    }),
    onRotateClockwise: () => dispatch({
        type: ROTATE_CLOCKWISE
    }),
    onRotateCounterclockwise: () => dispatch({
        type: ROTATE_COUNTERCLOCKWISE
    }),
    onLowerElement: () => dispatch({
        type: LOWER_ELEMENT
    }),
    onScoreUpdate:(score) => dispatch({
        type: SCORE_UPDATE,
        score: score || 'score undefined'
    }),
    onGameFieldCreate:() => dispatch({
        type: GAME_FIELD_CREATE,
    }),
    onGameFieldUpdate:() => dispatch({
        type: GAME_FIELD_UPDATE,
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(GameManager);