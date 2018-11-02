import React, { Component } from 'react';
import './App.css';
import Main from './router/Main';
import { Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers";
import thunk from 'redux-thunk';
import { history } from "./router/history";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react';
const persistConfig = { key: 'root', storage };
const store = createStore(persistReducer(persistConfig, RootReducer), compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
// let store = createStore(persistedReducer)
let persistor = persistStore(store)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <Main />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
