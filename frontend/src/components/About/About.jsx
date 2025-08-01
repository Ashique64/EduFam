import React, { useEffect, useRef } from "react";
import { FaUsers, FaBullseye, FaEye, FaHandshake, FaChartLine } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.scss";

const About = () => {
    const aboutRef = useRef(null);
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef([]);
    const buttonRef = useRef(null);
    const imagesRef = useRef([]);
    const iconsRef = useRef([]);

    const resetElement = () => {
        if (containerRef.current) {
            gsap.set(containerRef.current, { opacity: 0, visibility: "hidden" });
        }

        if (titleRef.current) {
            gsap.set(titleRef.current, { y: 50, opacity: 0 });
        }

        descriptionRef.current.forEach((el) => {
            gsap.set(el, { y: 30, opacity: 0 });
        });

        if (buttonRef.current) {
            gsap.set(buttonRef.current, { opacity: 0});
        }

        imagesRef.current.forEach((img, index) => {
            if (img) {
                gsap.set(img, {
                    opacity: 0,
                    transition: "transform 0.3s ease-in-out",
                });
            }
        });

        iconsRef.current.forEach((icon) => {
            if (icon) {
                gsap.set(icon, {
                    scale: 0,
                    rotation: -180,
                    opacity: 0,
                });
            }
        });
    };

    const runAnimation = () => {
        const t2 = gsap.timeline();

        t2.to(containerRef.current, {
            opacity: 1,
            visibility: "visible",
            duration: 0.1,
        });

        t2.to(iconsRef.current, {
            scale: 1,
            rotation: 0,
            opacity: 0.7,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: {
                amount: 0.6,
                from: "random",
            },
        })
        .to(
                imagesRef.current,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.2,
                },
                "-=0.6"
            )
            .to(
                titleRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.4,
                    ease: "power3.out",
                },
                "-=0.4"
            )
            .to(
                descriptionRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.6,
                    ease: "power2.out",
                    stagger: 0.2,
                },
                "-=0.6"
            )
            .to(
                buttonRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.4,
                    ease: "power3.out",
                    stagger: 0.2,

                },
                "-=0.4"
            )
            
    };

    useEffect(() => {
        resetElement();

        ScrollTrigger.create({
            trigger: aboutRef.current,
            start: "top 90%",
            end: "bottom 25%",
            onEnter: () => {
                resetElement();
                runAnimation();
            },
            onEnterBack: () => {
                resetElement();
                runAnimation();
            },
        });

        let floatingAnimations = [];

        const floatingTimeout = setTimeout(() => {
            iconsRef.current.forEach((icon, index) => {
                if (icon) {
                    const animation = gsap.to(icon, {
                        y: Math.random() * 20 - 10,
                        x: Math.random() * 10 - 5,
                        rotation: Math.random() * 20 - 10,
                        duration: 2 + Math.random() * 2,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: index * 0.2,
                    });
                    floatingAnimations.push(animation);
                }
            });
        }, 2000);

        return () => {
            if (ScrollTrigger) ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            if (floatingTimeout) clearTimeout(floatingTimeout);
            floatingAnimations.forEach((animation) => {
                if (animation) animation.kill();
            });
        };
    }, []);

    return (
        <div className="about" id="about" ref={aboutRef}>
            <div className="gradient-overlay"></div>
            <div className="background-grid"></div>

            <div className="about-icons">
                <FaUsers className="icon team" ref={(el) => (iconsRef.current[0] = el)} />
                <FaBullseye className="icon mission" ref={(el) => (iconsRef.current[1] = el)} />
                <FaEye className="icon vision" ref={(el) => (iconsRef.current[2] = el)} />
                <FaHandshake className="icon values" ref={(el) => (iconsRef.current[3] = el)} />
                <FaChartLine className="icon growth" ref={(el) => (iconsRef.current[4] = el)} />
            </div>

            <div className="container about-container" ref={containerRef}>
                <div className="row about-row">
                    <div className="col-md-12 col-lg-6 order-2 order-lg-1 about-col-1">
                        <h2 className="about-title" ref={titleRef}>
                            <span className="accent-line me-4"></span>About Us <span className="accent-line ms-4"></span>
                        </h2>
                        <p className="about-description" ref={(el) => (descriptionRef.current[0] = el)}>
                            EduFam is a trusted educational consulting company based in Kerala, India, committed to guiding
                            students toward a successful academic future in Germany. With our student-first approach and
                            in-depth knowledge of the German education system, we provide personalized end-to-end support
                            from course selection and visa assistance to settling in Germany and finding accommodation.
                        </p>
                        <p className="about-description" ref={(el) => (descriptionRef.current[1] = el)}>
                            Our mission is to make global education accessible by simplifying the admission process and
                            offering transparent, ethical guidance every step of the way.
                        </p>
                        <button className="btn btn-learn-more" ref={buttonRef}>
                            Learn More About Us
                        </button>
                    </div>
                    <div className="col-md-12 col-lg-6 order-1 order-lg-2 about-col-2">
                        <img
                            ref={(el) => (imagesRef.current[0] = el)}
                            className="about-img-2"
                            src="/Images/about/item-2.png"
                            alt=""
                        />
                        <img ref={(el) => (imagesRef.current[1] = el)} src="/Images/about/img-1.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
