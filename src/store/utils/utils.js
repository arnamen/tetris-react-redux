const cloneDeep = require('clone-deep');

//эта функция выполняет смещение элемента на 1 строку вниз
//пока он не упадёт вниз
//если создать элемент невозможно (нету места) функция возвращает false что значит game over

export const clearFallingElementPos = (currentElement, gameField) => {
    currentElement.elementPosition.forEach((fragment) => {
        const index = fragment.positionX + (fragment.positionY) * 10;

        if(index < 200) gameField[index].type = 'empty';
    })

    return gameField;
}


export const lowerElement = (currentElement = {}, gameField = []) => {
    let gameOver = false;

    const currentElementCopy = cloneDeep(currentElement);
    const gameFieldCopy = cloneDeep(gameField);
    //проход по массиву с конца в начало
    //чтобы элементы не затирали действия тех,
    //которые стоят перед ними
    clearFallingElementPos(currentElement, gameFieldCopy)
    currentElementCopy.elementPosition.forEach((fragmentData) => {

            const index = fragmentData.positionX + (++fragmentData.positionY) * 10;
            //всего 200 ячеек, если индекс находится дальше
            //значит элемент достиг конца игрового поля
            //или непустой ячейки
            // clearFallingElementPos(currentElement, gameField)
            if(index >= 200 || gameFieldCopy[index].type !== 'empty') {

                //если элемент только создан и больше не может падать
                //завершить игру
                 if(currentElementCopy.justCreated) {
                    gameOver = true;
                    };
                    currentElementCopy.isFalling = false;
                    return gameOver
                }
            else {
                currentElementCopy.justCreated = false;

                gameFieldCopy[index] = {
                type: fragmentData.color
            }
        }
        
    })

    if(currentElementCopy.isFalling){
        Object.keys(currentElementCopy).forEach((key) => {
            currentElement[key] = currentElementCopy[key];
        })
        gameField.forEach((cell, index) => {
            cell.type = gameFieldCopy[index].type;
        })
    }
    else currentElement.isFalling = false;

    return gameOver;
}
//создать X*Y пустых ячеек
export const createGameField = () => {
    const cells = [];
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
                const cell = {
                    type: 'empty'
                };
                cells.push(cell);
        }
    }
    return cells;
}

export const updateGameField = (currentElement = {}, gameField = []) => {
    //проход по массиву с конца в начало
    //чтобы элементы не затирали действия тех,
    //которые стоят перед ними
    for (let i = currentElement.elementPosition.length - 1; i >= 0; i--) {

        const fragmentData = currentElement.elementPosition[i];
        const index = fragmentData.positionX + (fragmentData.positionY) * 10;
        gameField[index] = {
            type: fragmentData.color
        };

    }

}

export const createElement = (elementType) => {
    const elementPosition = setElementPosition(elementType);

    return {
        elementPosition: elementPosition,
        elementType: elementType,
        elementOrientation: 0,
        isFalling: true,
        justCreated: true
    }
}

//фармирование расположения элемента при создании
//для каждого case задаются фрагменты элмента по неким правилам (можно и вручную)
export const setElementPosition = (elementType) => {

    const elementPosition = [];
    switch (elementType) {
        case 'I':
            for (let i = 0; i < 4; i++) {
                elementPosition.push({
                    color: 'yellow',
                    positionX: 4,
                    positionY: i
                })
            }
            return elementPosition;

        case 'L':
            for (let i = 0; i < 4; i++) {
                elementPosition.push({
                    color: 'white',
                    // просто быстрое позиционирование каждого фрагмента (их 4)
                    // с помощью тернарных операторов
                    // для экономии места
                    positionX: i < 3 ? 4 : 5,
                    positionY: i < 3 ? i : i - 1
                })
            }
            return elementPosition

        case 'R':
            for (let i = 0; i < 4; i++) {
                elementPosition.push({
                    color: 'brown',
                    positionX: i < 2 ? i + 4 : i + 2,
                    positionY: i < 2 ? 0 : 1,
                })
            }
            return elementPosition

        case 'S':
            for (let i = 0; i < 4; i++) {
                elementPosition.push({
                    color: 'orange',
                    positionX: i < 2 ? i + 4 : i + 1,
                    positionY: i < 2 ? 0 : 1,
                })
            }
            return elementPosition

        case 'T':
            for (let i = 0; i < 4; i++) {
                elementPosition.push({
                    color: 'greenish',
                    positionX: i < 1 ? i + 4 : i + 2,
                    positionY: i < 1 ? 0 : 1,
                })
            }
            return elementPosition
            
        default: return null;
    }
}

//сдвигает все фрагменты элемента влево на 1 клетку
//при условии что крайний левый фрагмент не находится на позиции 0 по Х
export const moveLeft = (currentElement = {}, gameField = []) => {
    clearFallingElementPos(currentElement, gameField)
    const currentElementBackup = cloneDeep(currentElement);

    for (let i = 0; i < currentElement.elementPosition.length; i++) {
        const index = currentElement.elementPosition[i].positionX + (currentElement.elementPosition[i].positionY - 1) * 10;
        if(currentElement.elementPosition[i].positionX > 0 &&
            gameField[index-1].type === 'empty') {
            //стереть данные о том что в этой ячейке присутствует фрагмент элемента
            gameField[index].type = 'empty'; 

            currentElement.elementPosition[i].positionX--
        }

        else {
            Object.keys(currentElementBackup).forEach((key) => {
                currentElement[key] = currentElementBackup[key];
            })
            return;
        };

    }
    
}

//сдвигает все фрагменты элемента вправо на 1 клетку
//при условии что крайний правый фрагмент не находится на позиции 9 по Х
export const moveRight = (currentElement = {}, gameField = []) => {
    clearFallingElementPos(currentElement, gameField)
    const currentElementBackup = cloneDeep(currentElement);
    
    for (let i = currentElement.elementPosition.length - 1; i >= 0; i--) {
        const index = currentElement.elementPosition[i].positionX + (currentElement.elementPosition[i].positionY - 1) * 10;
        if(currentElement.elementPosition[i].positionX < 9 &&
            gameField[index+1].type === 'empty') {
            //стереть данные о том что в этой ячейке присутствует фрагмент элемента
            gameField[index].type = 'empty'; 

            currentElement.elementPosition[i].positionX++
        }
        else {
            Object.keys(currentElementBackup).forEach((key) => {
                currentElement[key] = currentElementBackup[key];
            })
            return;
        };

    }
   
}