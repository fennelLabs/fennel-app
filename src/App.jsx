import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppContext from './contexts/AppContext';
import RegisterModal from './addons/Modal/RegisterModal';
import { ServiceContextProvider } from './contexts/ServiceContext';
import FennelAppRouter from './FennelAppRouter';
import * as dotenv from 'dotenv';

function App() {
  const modal = RegisterModal();

  return (
    <ServiceContextProvider>
      <Router>
        <AppContext.Provider
          value={{
            ...modal.value
          }}
        >
          <FennelAppRouter />
          {modal.Component}
        </AppContext.Provider>
      </Router>
    </ServiceContextProvider>
  );
}

export default App;
