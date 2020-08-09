import React from 'react'

import classes from './TetrisBody.module.css'

export default function TetrisBody( props ) {

    const cells = createCells();

    return (
        <div className={classes.TetrisBody}>
            {cells}
        </div>
    )
}

const createCells = () => {
    const cells = [];
    for (let i = 0; i < 200; i++) {
        const cell = <div className={classes.cell}></div>;
        cells.push(cell);
    }
    return cells;
}
