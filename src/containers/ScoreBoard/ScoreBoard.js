import React, { Component } from 'react'

import { getScoresData } from '../../store/actions/scoresData'

import ScoresTable from './ScoresTable/ScoresTable';
import { connect } from 'react-redux';

class ScoreBoard extends Component {

    componentDidMount(){
        this.props.onGetScores();
    }    

    render() {
        return (
            <ScoresTable scoresData={this.props.scores}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        scores: state.scoresData.scores,
        loading: state.scoresData.loading,
        error: state.scoresData.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetScores: () => dispatch(getScoresData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard)