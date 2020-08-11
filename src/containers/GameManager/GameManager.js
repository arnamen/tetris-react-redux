import React, { Component } from 'react'

import { MOVE_LEFT, MOVE_RIGHT, SCORE_UPDATE, GAME_FIELD_UPDATE, CREATE_ELEMENT, GAME_FIELD_CREATE, LOWER_ELEMENT } from '../../store/actions/actionTypes'
import { connect } from 'react-redux'

import GameInformation from '../../components/GameInfo/GameInfo'
import GameField from '../../components/GameField/GameField'

const ELEMENT_TYPES = ['I','L','R','S','T'];

class GameManager extends Component {

    addElement = (elementType) => {
        this.props.onCreateElement(elementType);
        this.props.onLowerElement();
        if(!this.props.gameOver) this.gameProcess();
        else console.log('game over')
    }
    
    gameProcess = () => {
        const gameProcessInterval = setInterval(() => {

            if(!this.props.currentElement.isFalling) {
                //сохранить элемент как часть игрового поля и прекратить его обработку
                this.addElement(ELEMENT_TYPES[randomInteger(0,ELEMENT_TYPES.length-1)]);
                clearInterval(gameProcessInterval);
            }
            this.props.onLowerElement();

        }, 500)
    }
    
    moveLeft = () => {
        console.log('moved left')
        this.props.onMoveLeft();
        this.props.onGameFieldUpdate();
    }
    
    moveRight = () => {
        console.log('moved right')
        this.props.onMoveRight();
        this.props.onGameFieldUpdate();
    }
    
    keysDispatcher = (event) => {
        if(event.key==='ArrowLeft') this.moveLeft();
        else if(event.key === 'ArrowRight') this.moveRight();
    }
    

    componentDidMount(){
        this.props.onGameFieldCreate();
        let index = randomInteger(0,ELEMENT_TYPES.length-1);
        console.log(index)
        this.addElement(ELEMENT_TYPES[index]);
    }

    render() {
        return (
            <React.Fragment>
                <GameField onKeyDown={(event) => this.keysDispatcher(event)} gameFieldData={this.props.gameField}/>
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