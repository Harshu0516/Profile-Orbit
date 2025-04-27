import React from 'react';
import './Contact.css'; // we'll create this for styling

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We would love to hear from you. Please fill out the form below.</p>

      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="5" placeholder="Enter your message" required></textarea>
        </div>

        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
