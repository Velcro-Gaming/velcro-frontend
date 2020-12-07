import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from "react-router-dom";

import Router from './screens/Router'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
        <BrowserRouter>
          <Router />
        </BrowserRouter>

      </PersistGate>
    </Provider>
  );
}

export default App;
