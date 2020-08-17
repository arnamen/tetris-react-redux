import React, { Component } from 'react'

import * as actionTypes from '../../store/actions/actionTypes'
import { connect } from 'react-redux'

import GameInformation from '../../components/GameInfo/GameInfo'
import GameField from '../../components/GameField/GameField'

const ELEMENT_TYPES = ['I','L','R','S','T'];

class GameManager extends Component {

    nextElement = null;
    gameProcessInterval = null
    gameStarted = false;

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
    
    startGame = () => {
        this.gameStarted = true;
        //создать новый элемент и обрабатывать его падение
        this.addElement(ELEMENT_TYPES[randomInteger(0,ELEMENT_TYPES.length-1)]);

        this.props.onGameFieldUpdate()
    }

    restartGame = () => {
        this.props.onResetSavedScore();
        this.props.onRestart();
        this.props.onGameFieldCreate();
        //небольшая задержка перед созданием первого элемента
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
    
    //пофиксить тач
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
            if(!gameField) return; //возможно тач произошел но игра не начата
            let touch = event.touches[0] || event.changedTouches[0];
            let x = touch.pageX;

            const elementWidth = gameField.offsetHeight*0.4 / 2;
            if(x > elementWidth) this.moveRight();
            else if (x <= elementWidth) this.moveLeft();

        }
    } 

    saveScore = (save = true || false, score, scoreAndNameSaved) => {

        if(save && scoreAndNameSaved) {
            const userName = document.getElementById('input_name').value;

            this.props.onSaveNewScore(score,userName)
        }
        else if(save) this.props.onUserSavedNewScore(score)
        else this.props.onDontSaveNewScore();
    }
    

    componentDidMount(){
        this.props.onGameFieldCreate();
    }

    render() {
        return (
            <React.Fragment>
                    <GameField 
                    gameStarted = {this.gameStarted}
                    onGameStart = {() => this.startGame()}
                    restartGame={this.restartGame}
                    onKeyDown={(event) => this.keysDispatcher(event)} 
                    gameFieldData={this.props.gameField}
                    nextElement={this.nextElement}
                    score={this.props.score}
                    saveScore={this.saveScore}
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
        type: actionTypes.RESTART_GAME
    }),
    onCreateElement: (elemType) => dispatch({
        type: actionTypes.CREATE_ELEMENT,
        elemType: elemType
    }),
    onMoveLeft:() => dispatch({
        type: actionTypes.MOVE_LEFT,
    }),
    onMoveRight:() => dispatch({
        type: actionTypes.MOVE_RIGHT,
    }),
    onRotateClockwise: () => dispatch({
        type: actionTypes.ROTATE_CLOCKWISE
    }),
    onRotateCounterclockwise: () => dispatch({
        type: actionTypes.ROTATE_COUNTERCLOCKWISE
    }),
    onMoveDown: () => dispatch({
        type: actionTypes.MOVE_DOWN
    }),
    onScoreUpdate:(score) => dispatch({
        type: actionTypes.SCORE_UPDATE,
        score: score || 'score undefined'
    }),
    onGameFieldCreate:() => dispatch({
        type: actionTypes.GAME_FIELD_CREATE,
    }),
    onGameFieldUpdate:() => dispatch({
        type: actionTypes.GAME_FIELD_UPDATE,
    }),
    onUserSavedNewScore: () => dispatch({
        type: actionTypes.SCORES_USER_SAVED_SCORE,
    }),
    onSaveNewScore: (score, userName) => dispatch({
        type: actionTypes.SCORES_SAVE_NEW_SCORE,
        score: score,
        userName: userName
    }),
    onDontSaveNewScore: () => dispatch({
        type: actionTypes.SCORES_DONT_SAVE_NEW_SCORE,
    }),
    onResetSavedScore: () => dispatch({
        type: actionTypes.SCORES_RESET_SAVED_SCORE
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(GameManager);