import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//
import './assets/Font/teletoon-lowercase/telelower.ttf'
//
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import gameFieldReducer from './store/reducers/gameFieldReducer'
import scoresDataReducer from './store/reducers/scoresDataReducer'

const rootReducer = combineReducers({
  gameFieldRed: gameFieldReducer,
  scoresData: scoresDataReducer
})

const store = createStore(rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
