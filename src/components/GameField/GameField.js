import React from 'react'
import classes from './GameField.module.css'

export default function GameField( props ) {
    return (
        <div className={classes.GameField}>
            {props.children}
        </div>
    )
}
