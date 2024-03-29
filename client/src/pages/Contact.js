import React from 'react'
import Layout from '../components/Layout/Layout'
import { TbAddressBook } from 'react-icons/tb';
import { AiOutlineMail } from 'react-icons/ai';
import { AiOutlinePhone } from 'react-icons/ai';
const Contact = () => {
  return (
    <Layout>
  
      <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p>Share Your Query/Critics/Suggestions with Malbus Team.</p>
      <div className="contact-details">
        <p>
          📱 WhatsApp: <a href="tel:+923081245023">+92 3139488824</a>
        </p>
        <p>
          📧 Email: <a href="mailto:info@malbus.com.pk">info@Bonanza.com.pk</a>
        </p>
        <p>
          <span style={{ color: "Black", fontWeight: "bold" }}>Address:</span>
          <br />
          Head Office: At Abbottabad near jadoon Phse 
          <br />
          Outlet: Shop # 254, At DayToady mall
        </p>
        <p>
        <span style={{ color: "Black", fontWeight: "bold" }}>Opening Hours:</span>


          <br />
          Monday - Thursday, 11:00 AM (PST) - 11:00 PM 
          <br />
          Friday - Sunday, 11:00 AM (PST) - 12:00 AM 
        </p>
        <p>
          You can also use live chat to chat with an operator online by talking with us on{" "}
          <a href="https://www.messenger.com/">Facebook Messenger</a>.
        </p>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="5"></textarea>
        </div>
        <div className="form-group">
          <div className="recaptcha">
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
      
    </Layout>
  )
}

export default Contact
