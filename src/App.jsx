import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Navigation from "./views/pages/Navigation";
import Profile from "./views/pages/Profile";
import Inbox from "./views/pages/Inbox";
import Home from "./views/pages/Home";
import LoadingScreen from "./views/components/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return LoadingScreen();
  } else {
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
