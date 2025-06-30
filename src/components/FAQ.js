import React from 'react';
import './FAQ.css';

export default function FAQ() {
  return (
    <section className="faq-section">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Here are answers to some common questions about Gen AI Editor.</p>
      </div>

      <div className="faq-list">
        <div className="faq-item">
          <h3>What is Gen AI Editor?</h3>
          <p>
            Gen AI Editor is a smart, AI-powered platform built by IIT Indore students to simplify video and photo editing using cutting-edge tools.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is it free to use?</h3>
          <p>
            Yes, the basic tools are free to use. Advanced features may require login or limited access depending on future updates.
          </p>
        </div>

        <div className="faq-item">
          <h3>What types of editing can I do?</h3>
          <p>
            You can remove backgrounds from full videos, eliminate objects from image frames, enhance visuals, apply filters, and more.
          </p>
        </div>

        <div className="faq-item">
          <h3>Do I need any experience to use this?</h3>
          <p>
            No! Gen AI is designed for everyone — from beginners to professionals. It’s simple, intuitive, and fast.
          </p>
        </div>

        <div className="faq-item">
          <h3>Can I upload and edit long videos?</h3>
          <p>
            Yes. Our backend supports processing full-length videos, although performance may depend on device specs and internet speed.
          </p>
        </div>

        <div className="faq-item">
          <h3>Which AI models power this app?</h3>
          <p>
            We use Robust Video Matting (RVM), Mask2Former, rembg, and other state-of-the-art models for accurate and fast editing.
          </p>
        </div>

        <div className="faq-item">
          <h3>Do I need to install anything?</h3>
          <p>
            No installation is required. The platform is fully browser-based — just visit the site and start editing.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is my data safe?</h3>
          <p>
            Yes. Your files are temporarily processed and deleted after editing. We don’t store user data.
          </p>
        </div>

        <div className="faq-item">
          <h3>How fast is the processing?</h3>
          <p>
            Most tasks complete within seconds to a few minutes depending on video size and processing complexity.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is this app mobile-friendly?</h3>
          <p>
            The platform works on mobile browsers too, but for best results, we recommend using a desktop/laptop.
          </p>
        </div>

        <div className="faq-item">
          <h3>Who built this platform?</h3>
          <p>
            Gen AI Editor is built by a passionate team of students from IIT Indore, driven to democratize content creation through AI.
          </p>
        </div>
      </div>
    </section>
  );
}
