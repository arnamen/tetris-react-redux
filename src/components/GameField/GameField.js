import React from 'react'
import classes from './GameField.module.css'

import L_figure from '../../assets/L/L.png';
import I_figure from '../../assets/I/I.png';
import R_figure from '../../assets/R/R.png';
import S_figure from '../../assets/S/S.png';
import T_figure from '../../assets/T/T.png';

import TetrisBody from '../TetrisBody/TetrisBody';
import TetrisElement from "../TetrisElement/TetrisElement";

export default function GameField( props ) {
    const figure_path = L_figure || I_figure || R_figure || S_figure || T_figure;
    const nextElemImg = <img className={classes.GameField_elemPreview} src={figure_path} alt={'L_figure'}></img>

    return (
        <div className={classes.GameField}>
            <div className={classes.GameField_header}><span style={{marginTop: '-1vh'}}>TETRIS</span></div>
            <TetrisBody />
            <div className={classes.GameField_info_wrapper}> 
                <div className={classes.GameField_score}>SCORE: 0</div>
                <div className={classes.GameField_nextElemInfo}>NEXT: {nextElemImg}</div>
            </div>
            <TetrisElement />
        </div>
    )
}
