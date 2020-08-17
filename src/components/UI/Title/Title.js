import React from 'react'

import classes from './Title.module.css'

export default function Title( props ) {
    return (
        <div className={classes.Title}>
            {props.children}
        </div>
    )
}
