import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import LoadingScreen from './views/components/LoadingScreen';
import AppContext from './contexts/AppContext';
import RegisterModal from './addons/Modal/RegisterModal';
import {ServiceContextProvider} from './contexts/ServiceContext';
import FennelAppRouter from './FennelAppRouter';

function AppLoader({children}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) return LoadingScreen();
  return children;
}

function App() {
  const modal = RegisterModal();

  return (
    <Router>
      <ServiceContextProvider>
        <AppContext.Provider
          value={{
            ...modal.value
          }}
        >
          <AppLoader>
            <FennelAppRouter />
          </AppLoader>
          {modal.Component}
        </AppContext.Provider>
      </ServiceContextProvider>
    </Router>
  );
}

export default App;
