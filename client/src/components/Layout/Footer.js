import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h3 className="footer-heading">Shopping Store</h3>
            <p className="footer-description">
              Welcome to our shopping store, where we believe in the power of dressing well and feeling confident. Our mission is to provide high-quality clothing that combines style and comfort. With a wide selection of products, we aim to cater to your fashion needs and help you find the perfect outfit for any occasion.
            </p>
            <div className="footer-icons-container" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="footer-icons">
                <a href="#" className="footer-icon">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#" className="footer-icon">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="#" className="footer-icon">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="#" className="footer-icon">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#" className="footer-icon">
                  <i className="fa fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Message From the CEO</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-heading">Contact Info</h3>
            <ul className="footer-contact">
              <li><i className="fa fa-map-marker"></i>Islamabad, Pakistan</li>
              <li><i className="fa fa-phone"></i>+92 3365613777</li>
              <li><i className="fa fa-envelope"></i>
                <a href="mailto:sagar00001.co@gmail.com" style={{ color: "black" }}>ik2258365@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-text">
          &copy; © 2012 - 2023 All Rights Reserved. | Designed by [IBRM.designer]
        </p>
      </div>
    </footer>
  );
};

export default Footer;
