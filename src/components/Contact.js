import React from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedinIn,
  faInstagram,
  faXTwitter,
  faDiscord,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
  return (
    <section className="contact-broad">
      <div className="contact-head">
        <h1>Contact Us</h1>
        <p>We are a group of students from IIT Indore passionate about building smart AI tools for photo & video editing.</p>
      </div>

      <div className="team-section">
        <div className="team-card">
          <h3>Saharsh</h3>
          <p>Backend Developer</p>
          <div className="icons">
            <a href="mailto:ee240002063@iiti.ac.in"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="https://www.linkedin.com/in/saharsh-chokhandre-a0748121a/"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="https://github.com/Saharsh525"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
        </div>
        <div className="team-card">
          <h3>Sreyan</h3>
          <p>Backend Developer</p>
          <div className="icons">
            <a href="mailto:ep240051018@iiti.ac.in"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="https://www.linkedin.com/in/sreyan-reddy-regatte-865849314/"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="https://github.com/SreyanReddy"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
        </div>
        <div className="team-card">
          <h3>Abhishek</h3>
          <p>Backend Developer</p>
          <div className="icons">
            <a href="mailto:mems240005038@iiti.ac.in"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="https://www.linkedin.com/in/rathod-abhishek-349617367/"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="https://github.com/Abhishek1175"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
        </div>
        <div className="team-card">
          <h3>Vikram</h3>
          <p>Backend Developer</p>
          <div className="icons">
            <a href="mailto:cse240001078@iiti.ac.in"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="https://www.linkedin.com/in/velpula-vikram-varma-3137aa339/"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="https://github.com/vikky737"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
        </div>
        <div className="team-card">
          <h3>Pankaj</h3>
          <p>Frontend Developer</p>
          <div className="icons">
            <a href="mailto:ee240002048@iiti.ac.in"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="https://www.linkedin.com/in/pankaj-kumar-yadav-110037331/"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="https://github.com/Pankajydv123"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
        </div>
      </div>

      <div className="general-links">
        <h2>Connect With Us</h2>
        <div className="social-icons">
          <a href="https://example.com"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://example.com"><FontAwesomeIcon icon={faXTwitter} /></a>
          <a href="https://example.com"><FontAwesomeIcon icon={faDiscord} /></a>
          <a href="https://example.com"><FontAwesomeIcon icon={faYoutube} /></a>
          <a href="https://example.com"><FontAwesomeIcon icon={faPhone} /></a>
        </div>
      </div>

      <div className="contact-footer-note">
        <p>We're always open to collaborations, feedback, or just a friendly chat. Reach out anytime.</p>
        <p><em>“We don’t just build tools — we build the future of creativity.”</em></p>
      </div>
    </section>
  );
}
