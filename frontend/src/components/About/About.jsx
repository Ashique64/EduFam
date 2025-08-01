import React from "react";
import { FaUsers, FaBullseye, FaEye, FaHandshake, FaChartLine } from "react-icons/fa";
import "./About.scss";

const About = () => {
    return (
        <div className="about" id="about">
            <div className="gradient-overlay"></div>
            <div className="background-grid"></div>

            <div className="about-icons">
                <FaUsers className="icon team" />
                <FaBullseye className="icon mission" />
                <FaEye className="icon vision" />
                <FaHandshake className="icon values" />
                <FaChartLine className="icon growth" />
            </div>

            <div className="container about-container">
                <div className="row about-row">
                    <div className="col-md-12 col-lg-6 about-col-1">
                        <h2 className="about-title">
                            <span className="accent-line me-4"></span>About Us <span className="accent-line ms-4"></span>
                        </h2>
                        <p className="about-description">
                            EduFam is a trusted educational consulting company based in Kerala, India, committed to guiding
                            students toward a successful academic future in Germany. With our student-first approach and
                            in-depth knowledge of the German education system, we provide personalized end-to-end support
                            from course selection and visa assistance to settling in Germany and finding accommodation.
                        </p>
                        <p className="about-description">
                            Our mission is to make global education accessible by simplifying the admission process and
                            offering transparent, ethical guidance every step of the way.
                        </p>
                        <button className="btn btn-learn-more">Learn More About Us</button>
                    </div>
                    <div className="col-md-12 col-lg-6 about-col-2">
                        <img src="/Images/about/img-1.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
