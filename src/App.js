import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
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
          <Route path="/Contact" element={<Contact />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsOfUse" element={<TermsOfUse />} />
          <Route path="/imageEditor" element={<ImageEditor />} />
          <Route path="/videoEditor" element={<VideoEditor />} />
        </Routes>
      <Footer/>  
    </>
  );
}

export default App; 