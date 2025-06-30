import React from 'react';
import './TermsOfUse.css';

export default function TermsOfUse() {
  return (
    <section className="terms-section">
      <div className="terms-container">
        <header className="terms-header">
          <h1>📄 Terms of Use</h1>
          <p>
            Please read these terms carefully before using Gen AI Editor. By accessing or using our platform,
            you agree to be bound by these Terms of Use.
          </p>
        </header>

        <div className="terms-block">
          <h2>1. Use of the Platform</h2>
          <p>
            Our tools are intended for educational and personal use only. Users must not exploit or misuse the features
            for unlawful or commercial purposes without permission.
          </p>
        </div>

        <div className="terms-block">
          <h2>2. Content Responsibility</h2>
          <p>
            You are solely responsible for any media you upload or edit on the platform. Do not upload copyrighted,
            offensive, or harmful material.
          </p>
        </div>

        <div className="terms-block">
          <h2>3. No Guarantees</h2>
          <p>
            We aim to provide accurate and helpful editing tools, but we do not guarantee perfection or error-free
            results at all times.
          </p>
        </div>

        <div className="terms-block">
          <h2>4. Termination</h2>
          <p>
            We reserve the right to suspend or terminate access to users who violate these terms or misuse the platform.
          </p>
        </div>

        <div className="terms-block">
          <h2>5. Changes to Terms</h2>
          <p>
            These terms may be updated over time. We encourage you to review this page occasionally for any changes.
          </p>
        </div>

        <p className="terms-footer-note">Last Updated: June 30, 2025</p>
      </div>
    </section>
  );
} 
