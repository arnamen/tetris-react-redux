import React, { Component } from 'react'

import { MOVE_LEFT, MOVE_RIGHT, SCORE_UPDATE, GAME_FIELD_UPDATE, CREATE_ELEMENT, GAME_FIELD_CREATE, ROTATE_CLOCKWISE, ROTATE_COUNTERCLOCKWISE, MOVE_DOWN, RESTART_GAME } from '../../store/actions/actionTypes'
import { connect } from 'react-redux'

import GameInformation from '../../components/GameInfo/GameInfo'
import GameField from '../../components/GameField/GameField'

const ELEMENT_TYPES = ['I','L','R','S','T'];

class GameManager extends Component {

    nextElement = null;
    gameProcessInterval = null

    addElement = (elementType) => {

        this.nextElement = ELEMENT_TYPES[randomInteger(0,ELEMENT_TYPES.length-1)]

        this.props.onCreateElement(elementType);
        if(!this.props.gameOver) this.gameProcess(500);
    }
    
    gameProcess = (moveDownInterval) => {
        this.props.onGameFieldUpdate()
        this.gameProcessInterval = setInterval(() => {

            if(!this.props.currentElement.isFalling) {
                //сохранить элемент как часть игрового поля и прекратить его обработку
                clearInterval(this.gameProcessInterval);
                this.addElement(this.nextElement);
            } 
            else {
                try {
                    this.props.onMoveDown();
                }
                catch (error) {
                    console.log(error)
                    clearInterval(this.gameProcessInterval);
                }
            }

        }, moveDownInterval)
    }
    
    restartGame = () => {
        this.props.onRestart();
        this.props.onGameFieldCreate();
        setTimeout(() => {
        //создать новый элемент и обрабатывать его падение
        this.addElement(ELEMENT_TYPES[randomInteger(0,ELEMENT_TYPES.length-1)]);

        this.props.onGameFieldUpdate()
        }, 100)
        
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

        this.props.onRotateCounterclockwise();
        this.props.onGameFieldUpdate();
    }
    

    keysDispatcher = (event) => {

        if(this.props.gameOver) return;
        if(event.key === 'Enter') {
            clearInterval(this.gameProcessInterval);
            this.gameProcess(10);
        };
        if(event.key==='ArrowLeft') this.moveLeft();
        else if(event.key === 'ArrowRight') this.moveRight();
        else if(event.key === 'ArrowUp') this.rotateClockwise();
        else if(event.key === 'ArrowDown') this.rotateCounterclockwise();

        if(event.type === 'touchend'){
            const gameField = document.querySelector('.GameOverScreen_GameOverScreen_notActive__Esn-f');
            let touch = event.touches[0] || event.changedTouches[0];
            let x = touch.pageX;
            console.log(x)
            const elementWidth = gameField.offsetHeight*0.4 / 2;
            if(x > elementWidth) this.moveRight();
            else if (x <= elementWidth) this.moveLeft();
            console.log(gameField.offsetHeight)

        }
    }
    
    componentDidMount(){
        this.props.onGameFieldCreate();
        //создать новый элемент и обрабатывать его падение
        this.addElement(ELEMENT_TYPES[randomInteger(0,ELEMENT_TYPES.length-1)]);

        this.props.onGameFieldUpdate()
    }

    render() {
        return (
            <React.Fragment>
                    <GameField 
                    restartGame={this.restartGame}
                    onKeyDown={(event) => this.keysDispatcher(event)} 
                    gameFieldData={this.props.gameField}
                    nextElement={this.nextElement}
                    score={this.props.score}
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
        score: state.gameFieldRed.score
    }
}

const mapDispatchToProps = (dispatch) => ({
    onRestart: () => dispatch({
        type: RESTART_GAME
    }),
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
    onMoveDown: () => dispatch({
        type: MOVE_DOWN
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