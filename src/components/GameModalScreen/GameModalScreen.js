import React from 'react'



import classes from './GameModalScreen.module.css'
import { connect } from 'react-redux'

import Title from '../UI/Title/Title'
import Button from '../UI/Button/Button'
function GameModalScreen(props) {

    let data = <div className={classes.GameModalScreen_notActive}>
        {props.children}
    </div>



    let saveScoreDialog = setSaveScoreDialog(props.userSavedScore, props.score, props.saveScore, props.scoreSaved)

    if (props.gameOver) {
        data = <div className={classes.GameModalScreen}>

            <div className={classes.GameModalScreen_wrapper}>
                <Title>Game Over</Title>
                <Button type='orange'
                    onClick={() => props.restartGame()}> TRY <br /> AGAIN! </Button>
                {saveScoreDialog}
            </div>
            {props.children}
        </div>
    }
    else if (!props.gameStarted) {

        data = <div className={classes.GameModalScreen}>

            <div className={classes.GameModalScreen_wrapper}>
                <Title>START GAME</Title>
                <Button type='orange'
                    onClick={() => props.onGameStart()}> BEGIN! </Button>
            </div>
            {props.children}
        </div>
    }

    return (
        <React.Fragment>
            {data}
        </React.Fragment>
    )
}

const setSaveScoreDialog = (userSavedScore, score, saveScoreFn, scoreSaved) => {

    if (userSavedScore && scoreSaved)
        return <React.Fragment>
            <Title>Score saved successfully</Title>
        </React.Fragment>

    switch (userSavedScore) {
        case null:
            return <React.Fragment>
            <Title>Save score?</Title>
            <Button type='red'
                onClick={() => saveScoreFn(false)}> NO </Button>
            <Button type='green'
                onClick={() => saveScoreFn(true, score)}> YES </Button>
        </React.Fragment>
        case true:
            //в случае нажатия yes появится дополнительный диалог
            //с просьбой ввести имя пользователя
            //после этого в gameManager будут получены данные из input
            //и отправлены в бд
            return <React.Fragment>
            <Title>Write your name</Title>
            <input type='text' className={classes.GameModalScreen_input} id='input_name'></input>
            <Button type='green' 
                onClick={() => saveScoreFn(true, score, true)}> SAVE </Button>
        </React.Fragment>
        case false:
            return <React.Fragment>
            <Title>Score wasn't saved</Title>
        </React.Fragment>
        default:
            break;
    }
}

const mapStateToProps = (state) => {
    return {
        gameOver: state.gameFieldRed.gameOver,
        userSavedScore: state.scoresData.userSavedScore,
        scoreSaved: state.scoresData.scoreSaved
    }
}

export default connect(mapStateToProps)(GameModalScreen);