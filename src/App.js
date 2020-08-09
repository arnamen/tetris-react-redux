import React, { Component } from 'react'

import GameManager from './containers/GameManager/GameManager'
import Layout from './components/Layout/Layout'

export default class App extends Component {
    render() {
        return (
            <Layout>
                    <GameManager />
            </Layout>
        )
    }
}
