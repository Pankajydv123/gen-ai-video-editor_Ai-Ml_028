import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Features from './components/Features';
import Body from './components/body';
import ImageEditor from './components/image_editor';
import VideoEditor from './components/video_editor';
import Footer from './components/footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/imageEditor" element={<ImageEditor />} />
          <Route path="/videoEditor" element={<VideoEditor />} />
        </Routes>
      <Footer/>  
    </>
  );
}

export default App; 