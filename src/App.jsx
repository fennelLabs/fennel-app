import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Outlet} from 'react-router-dom';
import './App.css';
import Navigation from './views/pages/Navigation';
import Profile from './views/pages/Profile';
import Inbox from './views/pages/Inbox';
import Diagnostics from './views/pages/Diagnostics';
import GenerateKeypair from './views/pages/GenerateKeypair';
import Home from './views/pages/Home';
import LoadingScreen from './views/components/LoadingScreen';
import AppContext from './contexts/AppContext';
import RegisterModal from './addons/Modal/RegisterModal';
import 'bootstrap/dist/css/bootstrap.min.css';

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

function AppRouter() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/diagnostics" element={<Diagnostics />} />
        <Route path="/generate-keypair" element={<GenerateKeypair /> } />
      </Routes>
      <Outlet />
    </Router>
  );
}

function App() {
  const modal = RegisterModal();

  return (
    <AppContext.Provider
      value={{
        ...modal.value
      }}
    >
      <AppLoader>
        <AppRouter />
      </AppLoader>
      {modal.Component}
    </AppContext.Provider>
  );
}

export default App;
