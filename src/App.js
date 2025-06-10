import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Features from './components/Features';
import Body from './components/body';
import Image_editor from './components/image_editor';
import Video_editor from './components/video_editor';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/image_editor" element={<Image_editor />} />
          <Route path="/video_editor" element={<Video_editor />} />
        </Routes>
    </>
  );
}

export default App;
