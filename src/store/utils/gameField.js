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

export const checkIfLineFinished = (gameFieldOriginal) => {
    let earnedPoints = 0;
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
        earnedPoints = 100;
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
        const result = checkIfLineFinished(gameField);
        gameField = result.gameField; //проверить ещё раз (1 прогон 1 проверка)
        earnedPoints += result.earnedPoints;
    }
    return {gameField, earnedPoints};
}
