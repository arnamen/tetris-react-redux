import React from 'react'
import classes from './GameField.module.css'

import L_figure from '../../assets/L/L.png';
import I_figure from '../../assets/I/I.png';
import R_figure from '../../assets/R/R.png';
import S_figure from '../../assets/S/S.png';
import T_figure from '../../assets/T/T.png';

import TetrisBody from '../TetrisBody/TetrisBody';

export default function GameField( props ) {
    
    const nextElemImg = getNextElementImage(props.nextElement)

    return ( 
        <div tabIndex='0' 
        onKeyDown={(event) => {props.onKeyDown(event)}}
        onTouchEnd={(event) => {props.onKeyDown(event)}}
        className={classes.GameField}>

            <div className={classes.GameField_header}><span style={{marginTop: '-1vh'}}>TETRIS</span></div>

            <TetrisBody 
            gameFieldData={props.gameFieldData} 
            restartGame={props.restartGame}
            gameStarted = {props.gameStarted}
            onGameStart = {props.onGameStart}
            />

            <div className={classes.GameField_info_wrapper}> 
                <div className={classes.GameField_score}>SCORE: {props.score}</div>
                <div className={classes.GameField_nextElemInfo}>NEXT: {nextElemImg}</div>
            </div>

        </div>
    )
}

const getNextElementImage = (elemType) => {
    switch (elemType) {
        case 'I':
            return <img className={classes.GameField_elemPreview} src={I_figure} alt={'I_figure'}></img>;
        case 'L':
            return <img className={classes.GameField_elemPreview} src={L_figure} alt={'L_figure'}></img>;
        case 'R':
            return <img className={classes.GameField_elemPreview} src={R_figure} alt={'R_figure'}></img>;
        case 'S':
            return <img className={classes.GameField_elemPreview} src={S_figure} alt={'S_figure'}></img>;
        case 'T':
            return <img className={classes.GameField_elemPreview} src={T_figure} alt={'T_figure'}></img>;
        default:
            return <img className={classes.GameField_elemPreview} src={I_figure} alt={'I_figure'}></img>;
    }
}
