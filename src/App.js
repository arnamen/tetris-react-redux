import React, { Component } from 'react'

import GameField from './components/GameField/GameField'
import GameManager from './containers/GameManager/GameManager'
import Layout from './components/Layout/Layout'

export default class App extends Component {
    render() {
        return (
            <Layout>
                <GameField>
                    <GameManager />
                </GameField>
            </Layout>
        )
    }
}
