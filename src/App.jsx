import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import './App.css';
import Splash from './views/pages/Splash/Splash';
import Navigation from './views/pages/Navigation/Navigation';
import Profile from './views/pages/Profile/Profile';
import Inbox from './views/pages/Inbox/Inbox';
import Home from './views/pages/Home';

function App() {
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

export default Splash(App);
