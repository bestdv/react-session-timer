import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import TimeOut from './Pages/TimeOut';
import ErrorPage from './Pages/ErrorPage';

function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/TimeOut">TimeOut</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TimeOut" element={<TimeOut />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
