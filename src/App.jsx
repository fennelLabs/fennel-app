import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import './App.css';
import Navigation from './views/pages/Navigation/Navigation';
import Profile from './views/pages/Profile/Profile';
import Inbox from './views/pages/Inbox/Inbox';
import Home from './views/pages/Home';

function LoadingMessage() {
  return (
    <div className="splash-screen">
      Wait a moment while we load your app.
      <div className="loading-dot">.</div>
    </div>
  );
}

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  if (loading) { return LoadingMessage(); }
  else {
    return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inbox" element={<Inbox />} />
        </Routes>
        <Outlet />
      </Router>
    );
  }
}

export default App;
