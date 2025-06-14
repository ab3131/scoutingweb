import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Generate from './pages/Generate';
import Menu from './Menu'
import Login from './pages/Login'

function App() {
  return (
    <>
    <Router>
      <Menu />
      <Routes>
        <Route path='/' element={<Generate />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
