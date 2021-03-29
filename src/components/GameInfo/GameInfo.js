import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Scoreboard from '../../containers/ScoreBoard/ScoreBoard';

import classes from './GameInfo.module.css'

import arrows_up_down from '../../assets/controls/arrows-up-down.png';
import arrows_left_right from '../../assets/controls/arrows-left-right.png';

export default function GameInfo() {
    return (
        <div className={classes.gameInfo_wrapper}> 
            <Tabs>
            <TabList>
                <Tab><span>FAQ</span></Tab>
                <Tab><span>Scoreboard</span></Tab>
            </TabList>

            <TabPanel>
                <ul>
                    <li className={classes.gameInfo_li}>
                        To move element use arrows left and right
                        <img className={classes.gameInfo_arrows_img} src={arrows_left_right} alt='arrows'></img>
                    </li>
                    <li className={classes.gameInfo_li}>
                        To rotate element use arrows up and down
                        <img className={classes.gameInfo_arrows_img} src={arrows_up_down} alt='arrows'></img>
                        
                        </li>
                    <li className={classes.gameInfo_li}>To make element fall quickly press Enter</li>
                </ul>
            </TabPanel>
            <TabPanel>
                <Scoreboard />
            </TabPanel>
        </Tabs>
        </div>
    )
}