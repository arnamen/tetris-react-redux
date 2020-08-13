import React from 'react'

import classes from './GameOverScreen.module.css'
import { connect } from 'react-redux'

function GameOverScreen( props ) {
    
    let data = <div className={classes.GameOverScreen_notActive}>
        {props.children}
    </div>
 
    if(props.gameOver) {
        data = <div className={classes.GameOverScreen}>
                <div className={classes.GameOverScreen_title}>
                    <span>GAME OVER</span>
                </div>
            <div className={classes.gameOverScreen_buttonWrapper}>
                <span className={classes.gameOverScreen_button}
                onClick={() => props.restartGame()}>
                    TRY <br/> AGAIN!
                    </span>
                </div>
            {props.children}
        </div>
    }
    else if(!props.gameStarted) {
        console.log(props.gameStarted)
        data = <div className={classes.GameOverScreen}>
                <div className={classes.GameOverScreen_title}>
                    START GAME
                </div>
            <div className={classes.gameOverScreen_buttonWrapper}>
                <span className={classes.gameOverScreen_button}
                onClick={() => props.onGameStart()}>
                    BEGIN!
                    </span>
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

const mapStateToProps = (state) => {
    return {
        gameOver: state.gameFieldRed.gameOver
    }
}

export default connect(mapStateToProps)(GameOverScreen);