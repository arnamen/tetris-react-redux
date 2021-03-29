const cloneDeep = require('clone-deep');

const setRotate = (currentElement, rotateDirection, gameField) => {
    const currentElementClone = cloneDeep(currentElement)

    switch (currentElementClone.elementType) {
        case 'I':{
            const center = cloneDeep(currentElementClone.elementPosition[1])
            if(rotateDirection === 'clockwise') return rotate(currentElementClone, center, gameField);
            else return rotateReverse(currentElementClone, center, gameField)
        }

        case 'L':{
            const center = cloneDeep(currentElementClone.elementPosition[1])
            
            if(rotateDirection === 'clockwise') return rotate(currentElementClone, center, gameField);
            else return rotateReverse(currentElementClone, center, gameField)
        }
        
        case 'R':{
            return currentElementClone;
        }

        case 'S':{
            const center = cloneDeep(currentElementClone.elementPosition[0])
            
            if(rotateDirection === 'clockwise') return rotate(currentElementClone, center, gameField);
            else return rotateReverse(currentElementClone, center, gameField)
        }

        case 'T':{
            const center = cloneDeep(currentElementClone.elementPosition[0])
            
            if(rotateDirection === 'clockwise') return rotate(currentElementClone, center, gameField);
            else return rotateReverse(currentElementClone, center, gameField)
        }

        default:{
            const center = cloneDeep(currentElementClone.elementPosition[0])
            
            if(rotateDirection === 'clockwise') return rotate(currentElementClone, center, gameField);
            else return rotateReverse(currentElementClone, center, gameField)
        }
    }
}

const rotate = (currentElement, center, gameField) => {
    if(!gameField) return currentElement;
    let isApplied = true; //проверка на то, можно ли повернуть элемент выбранным образом

    const currentElementOld = cloneDeep(currentElement);
    const elementPosition = currentElement.elementPosition
    elementPosition.map((fragment) => {
        const oldPosition = cloneDeep(fragment)
        
        fragment.positionX = oldPosition.positionY + center.positionX - center.positionY;
        fragment.positionY = center.positionX + center.positionY - oldPosition.positionX;
        //fragment.positionY * 10 - в строке 10 элементов
        if(fragment.positionX + fragment.positionY * 10 > 200 || 
            fragment.positionX + fragment.positionY * 10 < 0  ||
            fragment.positionX < 0 ||
            fragment.positionX >= 10 ||
            gameField[fragment.positionX + fragment.positionY * 10].type !== 'empty') isApplied = false;
        return fragment;
    })

    return isApplied ? currentElement : currentElementOld;

}

const rotateReverse = (currentElement, center, gameField) => {
    if(!gameField) return currentElement;
    let isApplied = true; //проверка на то, можно ли повернуть элемент выбранным образом
    const currentElementOld = cloneDeep(currentElement);
    const elementPosition = currentElement.elementPosition

    elementPosition.map((fragment) => {
        const oldPosition = cloneDeep(fragment)
        
        fragment.positionX = center.positionX + center.positionY - oldPosition.positionY;
        fragment.positionY = oldPosition.positionX + center.positionY - center.positionX;

        if(fragment.positionX + fragment.positionY * 10 > 200 || 
            fragment.positionX + fragment.positionY * 10 < 0  ||
            fragment.positionX >= 10 ||
            gameField[fragment.positionX + fragment.positionY * 10].type !== 'empty') isApplied = false;

        return fragment;
    })

    return isApplied ? currentElement : currentElementOld;;

}


export default setRotate;