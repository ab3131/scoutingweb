import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Respond from './pages/Respond';
import Menu from './Menu'

function App() {
  return (
    <>
    <Router>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Respond' element={<Respond />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
