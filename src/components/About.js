import React from 'react';
import './About.css';

export default function About() {
  return (
    <section className="about-fullpage">
      <div className="about-overlay">
        <div className="about-inner">
          <h1 className="main-heading">About Us</h1>
          <p className="sub-heading">Empowering the World to Edit Smarter, Create Faster</p>

          <div className="about-section fade-in">
            <p>
              At <strong>Gen AI Editor</strong>, we're revolutionizing how video and photo editing is done.
              Our platform blends intuitive design with the power of artificial intelligence,
              helping creators produce stunning results with ease.
            </p>
            <p>
              Whether you're removing a video background or cleaning up a photograph, Gen AI is
              here to make advanced editing accessible to all.
            </p>
          </div>

          <div className="mission fade-in">
            <h2>🌟 Our Mission</h2>
            <p>
              We aim to simplify creativity through automation. Editing should be powerful, but never complicated.
              With Gen AI, we’re removing the barriers to professional-level visuals — so anyone can create.
            </p>
          </div>

          <div className="tech-section fade-in">
            <h2>🛠️ Tech Behind the Magic</h2>
            <ul>
              <li>⚛️ React.js frontend for smooth interaction</li>
              <li>🚀 FastAPI backend for blazing speed</li>
              <li>🧠 AI models (RVM, Mask2Former, rembg)</li>
              <li>🎞️ OpenCV + MoviePy for video frame logic</li>
              <li>💻 CPU-deployed via Render</li>
            </ul>
          </div>

          <div className="features fade-in">
            <h2>💡 What You Can Do</h2>
            <ul>
              <li>🎬 Remove backgrounds from full videos</li>
              <li>🖼️ Remove unwanted objects from frames</li>
              <li>✨ Apply smart enhancements in one click</li>
              <li>📂 Upload and export with ease</li>
              <li>🔜 More tools coming soon</li>
            </ul>
          </div>

          <div className="team fade-in">
            <h2>👥 Who We Are</h2>
            <p>
              A small team of developers, designers, and AI nerds passionate about changing how
              creative tools work. We build for speed, simplicity, and real-world impact.
            </p>
          </div>

          <div className="ending-quote fade-in">
            <p><em>We don't just build tools — we build bridges between your idea and the result. 🚀</em></p>
          </div>
        </div>
      </div>
    </section>
  );
}
