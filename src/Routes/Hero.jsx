import React from 'react';
import "./Hero.css"
const HeroSection = () => {
    return (
      <div id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <h1>Better Solutions For Your Business Needs</h1>
              <p>We offer customized and innovative solutions to help businesses achieve their goals. Our team of experts work closely with clients to understand their unique needs and develop tailored strategies that deliver results. With a focus on quality, efficiency, and excellence, we are dedicated to helping businesses succeed.</p>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <a href="Company Overview.pdf" className="btn-get-started" target="_blank">View portfolio</a>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGUYdkWT02iXglNuFGDBdQJt7lk-0OBJw1lWveDoQS3g&s" className="img-fluid animated" alt="hero-img" />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroSection;
  