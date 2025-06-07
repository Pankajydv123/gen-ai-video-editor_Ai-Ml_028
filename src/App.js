import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Features from './components/Features';
import Body from './components/body';
// Remove unused Link import
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </>
  );
}

export default App;
