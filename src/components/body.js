import React from 'react';
import './Background.css';
import './Body.css';
import { Link } from 'react-router-dom';
import photo6 from '../Assests/photo6.jpg';
import photo7 from '../Assests/photo7.jpg';
import photo8 from '../Assests/photo8.jpg';
import video1 from '../Assests/video1.jpg';
import video2 from '../Assests/video2.jpg';
import video3 from '../Assests/video3.jpg';

export default function body() {
  return (
    <div className="body-container">
        <div className="bubbles">
            <span style={{ "--i": 11 }}></span>
            <span style={{ "--i": 12 }}></span>
            <span style={{ "--i": 24 }}></span>
            <span style={{ "--i": 10 }}></span>
            <span style={{ "--i": 14 }}></span>
            <span style={{ "--i": 23 }}></span>
            <span style={{ "--i": 18 }}></span>
            <span style={{ "--i": 16 }}></span>
            <span style={{ "--i": 19 }}></span>
            <span style={{ "--i": 20 }}></span>
            <span style={{ "--i": 22 }}></span>
            <span style={{ "--i": 25 }}></span>
            <span style={{ "--i": 18 }}></span>
            <span style={{ "--i": 21 }}></span>
            <span style={{ "--i": 15 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 26 }}></span>
            <span style={{ "--i": 17 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 28 }}></span>
            <span style={{ "--i": 11 }}></span>
            <span style={{ "--i": 12 }}></span>
            <span style={{ "--i": 24 }}></span>
            <span style={{ "--i": 10 }}></span>
            <span style={{ "--i": 14 }}></span>
            <span style={{ "--i": 23 }}></span>
            <span style={{ "--i": 18 }}></span>
            <span style={{ "--i": 16 }}></span>
            <span style={{ "--i": 19 }}></span>
            <span style={{ "--i": 20 }}></span>
            <span style={{ "--i": 22 }}></span>
            <span style={{ "--i": 25 }}></span>
            <span style={{ "--i": 18 }}></span>
            <span style={{ "--i": 21 }}></span>
            <span style={{ "--i": 28 }}></span>
            <span style={{ "--i": 20 }}></span>
            <span style={{ "--i": 26 }}></span>
            <span style={{ "--i": 25 }}></span>
            <span style={{ "--i": 27 }}></span>
            <span style={{ "--i": 28 }}></span>
        </div>
        <div className="content">
          <div class="heading-box">
            <h1>Progen Ai</h1>
            <div className="container1">
              <p id='hye'>Ai Online Photo Editor and Video Editor</p>
              <p id='hey'>A smarter way to edit your photos and videos starts here. Powered by generative AI, this editor helps you enhance visuals, create smooth transitions, and try out effects that add something unique.</p>
            </div>
          </div>

          <div id='image-stacked' className='container2'>
            <div className="container3">
            <img className='image image1' src={photo7} alt="" />
            <img className='image image2' src={photo6} alt="" />
            <img className='image image3' src={photo8} alt="" />
            </div>
            <div className='textcontainer'>
              <h2>AI Image Editor</h2>
              <p>Edit your photo with ease using powerful AI that understands what you need. Whether you're removing distractions, enhancing 
                details, or giving your image a whole new look, everything happens smoothly and quickly. No complex tools—just smart, effortless 
                results that make your photos stand out.</p>
              <Link to="/image_editor">
              <button className="button1">Unleash the AI Touch</button>
              </Link>
            </div>
          </div>
          <div id='image-stacked' className="container4">
            <div className="container5">
              <img className='image image1' src={video1} alt="" />
              <img className='image image2' src={video2} alt="" />
              <img className='image image3' src={video3} alt="" />
            </div>
            <div className='textcontainer'>
              <h2>AI Video Editor</h2>
              <p>Edit your video with ease using powerful AI that adapts to your creative vision. Whether you're cutting unwanted scenes, enhancing 
                visuals, adjusting audio, or adding stylish effects, everything happens smoothly and efficiently. No complicated software—just 
                smart, intuitive tools that help your videos look polished and professional in no time.</p>
              <Link to="/video_editor">
              <button className="button2">Unleash the AI Touch</button>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}
