import React from 'react'

import classes from './Button.module.css'

export default function Button( props ) {

    let className = null;

    switch (props.type) {
        case 'orange':
            className = classes.button
            break;
        case 'green':
            className = classes.buttonYes
            break;
        case 'red':
            className = classes.buttonNo
            break;
        default:
            break;
    }

    return (
        <span className={className} onClick={props.onClick}>
            {props.children}
        </span>
    )
}
