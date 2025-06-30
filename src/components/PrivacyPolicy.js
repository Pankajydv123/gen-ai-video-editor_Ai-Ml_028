import React from 'react';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <section className="privacy-section">
      <div className="privacy-container">
        <header className="privacy-header">
          <h1>🔒 Privacy Policy</h1>
          <p>
            We care about your privacy. This page explains how Gen AI Editor handles your data
            and ensures a safe and transparent experience.
          </p>
        </header>

        <div className="privacy-block">
          <h2>1. What We Collect</h2>
          <ul>
            <li>📧 Email (for contact and feedback)</li>
            <li>🖼️ Uploaded media (only for editing, not saved)</li>
            <li>🌐 Browser/device info (for improving features)</li>
          </ul>
        </div>

        <div className="privacy-block">
          <h2>2. How We Use It</h2>
          <p>Your data is used only for AI editing functionality. We never sell or share it.</p>
        </div>

        <div className="privacy-block">
          <h2>3. File Handling</h2>
          <p>All files are deleted after editing. We do not store any photos or videos.</p>
        </div>

        <div className="privacy-block">
          <h2>4. Third-party Tools</h2>
          <p>We may use cloud and analytics services that follow global privacy laws (e.g., GDPR).</p>
        </div>

        <div className="privacy-block">
          <h2>5. Security</h2>
          <p>All data is protected with HTTPS and kept in temporary isolated environments.</p>
        </div>

        <div className="privacy-block">
          <h2>6. Your Rights</h2>
          <p>You may request deletion of any personal data via the Contact page.</p>
        </div>

        <div className="privacy-block">
          <h2>7. Updates</h2>
          <p>This page will be updated if our policy or tools change.</p>
        </div>
        <p className="privacy-footer">Last Updated: June 30, 2025.</p>
      </div>
    </section>
  );
}
