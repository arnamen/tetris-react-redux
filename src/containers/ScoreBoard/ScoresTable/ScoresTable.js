import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ScoresTable.module.css'

const scoreTable = (props) => {

    let tableData = <Spinner />

    if (props.scoresData) {
        const tbodyData = createTable(props.scoresData);

        tableData = 
        <table>
            <thead>
                <tr>
                    <th key={uuidv4()}>User name</th>
                    <th key={uuidv4()}>Score</th>
                </tr>
            </thead>
            <tbody>
                {tbodyData}
            </tbody>
        </table>
    }


    return (
        <div className={classes.wrapper}>
            {tableData}
        </div>
    );
}

const createTable = (scoresData) => {

    const scoresDataArray = Object.keys(scoresData).map((key) => {
        return {
            userName: scoresData[key].userName,
            score: scoresData[key].score,
        }
    })
    const sortedScoresData = scoresDataArray.sort((a, b) => {
        return b.score - a.score;
    })
    
    const tableData = sortedScoresData.map(( scoreDataUnit ) => {
        return <tr key={uuidv4()}>
            <td>{scoreDataUnit.userName}</td>
            <td>{scoreDataUnit.score}</td>
        </tr>
    })

    return tableData

}


export default scoreTable;
