import React, { Component } from 'react';
import './App.css';
import Main from './router/Main';
import { Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers";
import thunk from 'redux-thunk';
import { history } from "./router/history";
const store = createStore(RootReducer, compose(applyMiddleware(thunk),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router history={history}>
            <Main />
          </Router>
      </Provider>
    );
  }
}

export default App;
