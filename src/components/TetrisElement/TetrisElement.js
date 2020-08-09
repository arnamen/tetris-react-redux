import React from 'react'

import classes from './TetrisElement.module.css';

import white_fragment from '../../assets/Fragments-svg/Fragment-1-white.svg';
import yellow_fragment from '../../assets/Fragments-svg/Fragment-2-yellow.svg';
import brown_fragment from '../../assets/Fragments-svg/Fragment-3-brown.svg';
import orange_fragment from '../../assets/Fragments-svg/Fragment-4-orange.svg';
import greenish_fragment from '../../assets/Fragments-svg/Fragment-5-greenish.svg';

export default function TetrisElement( props ) {

    const element = createElement('orange');

    return (
        <div className={classes.TetrisElement}>
            {element}
        </div>
    )
}

const createElement = (fragmentType) => {
    switch (fragmentType) {
        case 'white':
            return <img className={classes.tetrisFragment} src={white_fragment} alt='white_fragment'></img>
        case 'yellow':
            return <img className={classes.tetrisFragment} src={yellow_fragment} alt='yellow_fragment'></img>
        case 'brown':
            return <img className={classes.tetrisFragment} src={brown_fragment} alt='brown_fragment'></img>
        case 'orange':
            return <img className={classes.tetrisFragment} src={orange_fragment} alt='orange_fragment'></img>
        case 'greenish':
            return <img className={classes.tetrisFragment} src={greenish_fragment} alt='greenish_fragment'></img>
        default:
            console.log('unexpected fragment type. default fragmein was created');
            return <img className={classes.tetrisFragment} src={white_fragment} alt='white_fragment'></img>
    }
}
