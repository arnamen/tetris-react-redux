const cloneDeep = require('clone-deep');

const setRotate = (currentElement, rotateDirection) => {
    const currentElementClone = cloneDeep(currentElement)
    console.log('[rotate] ', currentElementClone)
    switch (currentElementClone.elementType) {
        case 'I':{
            const center = cloneDeep(currentElementClone.elementPosition[1])
            
            if(rotateDirection === 'clockwise') return rotate(currentElementClone, center);
            else return rotateReverse(currentElementClone, center)
        }

        case 'L':{
            const center = cloneDeep(currentElementClone.elementPosition[0])
            
            if(rotateDirection === 'clockwise') return rotate(currentElementClone, center);
            else return rotateReverse(currentElementClone, center)
        }
        
        case 'R':{
            return currentElementClone;
        }

        case 'S':{
            const center = cloneDeep(currentElementClone.elementPosition[0])
            
            if(rotateDirection === 'clockwise') return rotate(currentElementClone, center);
            else return rotateReverse(currentElementClone, center)
        }

        case 'T':{
            const center = cloneDeep(currentElementClone.elementPosition[0])
            
            if(rotateDirection === 'clockwise') return rotate(currentElementClone, center);
            else return rotateReverse(currentElementClone, center)
        }

        default:{
            const center = cloneDeep(currentElementClone.elementPosition[0])
            
            if(rotateDirection === 'clockwise') return rotate(currentElementClone, center);
            else return rotateReverse(currentElementClone, center)
        }
    }
}

const rotate = (currentElement, center) => {
    const elementPosition = currentElement.elementPosition
    console.log(center)
    elementPosition.map((fragment) => {
        const oldPosition = cloneDeep(fragment)
        
        fragment.positionX = oldPosition.positionY + center.positionX - center.positionY;
        fragment.positionY = center.positionX + center.positionY - oldPosition.positionX;

        return fragment;
    })

    return currentElement;

}

const rotateReverse = (currentElement, center) => {
    const elementPosition = currentElement.elementPosition
    console.log(center)
    elementPosition.map((fragment) => {
        const oldPosition = cloneDeep(fragment)
        
        fragment.positionX = center.positionX + center.positionY - oldPosition.positionY;
        fragment.positionY = oldPosition.positionX + center.positionY - center.positionX;

        return fragment;
    })

    return currentElement;

}


export default setRotate;