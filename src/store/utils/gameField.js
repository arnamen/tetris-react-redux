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
    else {
        currentElement.isFalling = false;
        const checkedField = checkIfLineFinished(gameField)

        gameField.forEach((cell, index) => {
            cell.type = checkedField[index].type;
        })
    }

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

const checkIfLineFinished = (gameFieldOriginal) => {
    let gameField = cloneDeep(gameFieldOriginal);

    const rowsNum = (gameField.length) / 10;
    const colsNum = (gameField.length) / 20;

    let rowToRemove = -1;
    let removeRow = false;

    for (let i = 0; i < rowsNum && !removeRow; i++) {
        rowToRemove = i;
        removeRow = true;
        for (let j = 0; j < colsNum; j++) {
            //если хоть одна ячейка пустая removeRow будет false
            const index = i * 10 + j;
            removeRow = removeRow && gameField[index].type !== 'empty';
            
        }
    }
    if(removeRow){
        //удалить собранную сроку
        for (let i = 0; i < colsNum; i++) {
            const index = rowToRemove * 10 + i;
            gameField[index].type = 'empty';
        }

        //сместить все верхние ячейки вниз
        const lastIndex = rowToRemove * 10 + colsNum;
        for (let i = lastIndex - 1; i >= 10; i--) {
            gameField[i].type = gameField[i-10].type;
            
        }
        gameField = checkIfLineFinished(gameField) //проверить ещё раз (1 прогон 1 проверка)
    }
    return gameField;
}
