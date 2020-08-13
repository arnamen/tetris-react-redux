import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import white_fragment from '../../assets/Fragments-svg/Fragment-1-white.svg';
import yellow_fragment from '../../assets/Fragments-svg/Fragment-2-yellow.svg';
import brown_fragment from '../../assets/Fragments-svg/Fragment-3-brown.svg';
import orange_fragment from '../../assets/Fragments-svg/Fragment-4-orange.svg';
import greenish_fragment from '../../assets/Fragments-svg/Fragment-5-greenish.svg';

import classes from './TetrisBody.module.css'
import GameOverScreen from './GameOverScreen/GameOverScreen';

export default function TetrisBody( props ) {

    const cells = createCells(props.gameFieldData);

    return (
        <GameOverScreen restartGame={props.restartGame}>
            <div className={classes.TetrisBody}>
                {cells}
            </div>
        </GameOverScreen>
    )
}

const createCells = (gameFieldData = []) => {
    const cells = [];
    gameFieldData.forEach((cellData, index) => {
        switch (cellData.type) {
            case 'empty':
                cells.push(
                    <div key={uuidv4()} className={classes.cell}></div>
                )
                break;
            case 'white':
                cells.push(
                    <div key={uuidv4()} className={classes.cell}>
                        <img className={classes.tetrisFragment} src={white_fragment} alt='white fragment'></img>
                    </div>
                )
                break;
            case 'yellow':
                cells.push(
                    <div key={uuidv4()} className={classes.cell}>
                        <img className={classes.tetrisFragment} src={yellow_fragment} alt='yellow fragment'></img>
                    </div>
                )
                break;
            case 'brown':
                cells.push(
                    <div key={uuidv4()} className={classes.cell}>
                        <img className={classes.tetrisFragment} src={brown_fragment} alt='brown fragment'></img>
                    </div>
                )
                break;
            case 'orange':
                cells.push(
                    <div key={uuidv4()} className={classes.cell}>
                        <img className={classes.tetrisFragment} src={orange_fragment} alt='orange fragment'></img>
                    </div>
                )
                break;
            case 'greenish':
                cells.push(
                    <div key={uuidv4()} className={classes.cell}>
                        <img className={classes.tetrisFragment} src={greenish_fragment} alt='greenish fragment'></img>
                    </div>
                )
                break;
            default:
                break;
        }    
    })
    return cells;
}
