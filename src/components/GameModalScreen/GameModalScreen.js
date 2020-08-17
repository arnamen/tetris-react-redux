import React from 'react'



import classes from './GameModalScreen.module.css'
import { connect } from 'react-redux'

import Title from '../UI/Title/Title'
import Button from '../UI/Button/Button'
function GameModalScreen(props) {

    let data = <div className={classes.GameModalScreen_notActive}>
        {props.children}
    </div>



    let saveScoreDialog = setSaveScoreDialog(props.userSavedScore, props.score, props.saveScore)

    if (props.gameOver) {
        data = <div className={classes.GameModalScreen}>

            <div className={classes.GameModalScreen_wrapper}>
                <Title>Game Over</Title>
                <Button type='orange'
                    onClick={() => props.restartGame()}> TRY <br /> AGAIN! </Button>
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

                {saveScoreDialog}

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

const setSaveScoreDialog = (userSavedScore, score, saveScoreFn) => {
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
            return <React.Fragment>
            <Title>Score saved!</Title>
            <Button type='green'> SAVED! </Button>
        </React.Fragment>
        case false:
            return <React.Fragment>
            <Title>Score wasn't saved</Title>
            <Button type='red'> OKAY </Button>
        </React.Fragment>
        default:
            break;
    }
}

const mapStateToProps = (state) => {
    return {
        gameOver: state.gameFieldRed.gameOver,
        userSavedScore: state.scoresData.userSavedScore
    }
}

export default connect(mapStateToProps)(GameModalScreen);