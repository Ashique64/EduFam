import React, { useEffect, useRef } from "react";
import { FaBook, FaStar, FaPlane } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.scss";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const countersRef = useRef([]);
    const h1Ref = useRef(null);
    const imgRef = useRef(null);
    const contentItemsRef = useRef([]);
    const heroRef = useRef(null);
    

    const animateCounter = (el, target) => {
        let count = 0;
        const increment = target / 100;
        const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                el.textContent = target;
                clearInterval(interval);
            } else {
                el.textContent = Math.floor(count);
            }
        }, 20);
    };

    const startCounterAnimations = () => {
        countersRef.current.forEach((counter) => {
            if (counter) {
                counter.textContent = "0";
            }
        });

        countersRef.current.forEach((counter) => {
            if (counter) {
                const target = +counter.getAttribute("data-target");
                animateCounter(counter, target);
            }
        });
    };

    const resetElements = () => {
        if (h1Ref.current) {
            gsap.set(h1Ref.current, {
                scale: 0.3,
                opacity: 0,
                transformOrigin: "center center",
            });
        }

        if (imgRef.current) {
            gsap.set(imgRef.current, {
                y: -50,
                opacity: 0,
            });
        }

        contentItemsRef.current.forEach((item) => {
            if (item) {
                gsap.set(item, {
                    x: -30,
                    opacity: 0,
                });
            }
        });

        countersRef.current.forEach((counter) => {
            if (counter) {
                counter.textContent = "0";
            }
        });
    };

    const runAnimation = () => {
        const tl = gsap.timeline();
        
        tl.to(h1Ref.current, {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: 0.2,
        })
        .to(h1Ref.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
        })
        .to(h1Ref.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
        })
        .to(
            imgRef.current,
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
            },
            "-=0.2"
        )
        .to(
            contentItemsRef.current[0],
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
            },
            "-=0.3"
        )
        .to(
            contentItemsRef.current[1],
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
            },
            "-=0.4"
        )
        .to(
            contentItemsRef.current[2],
            {
                x: 0,
                opacity: 1,
                duration: 0.7,
                ease: "back.out(1.2)",
            },
            "-=0.5"
        )
        .to(
            contentItemsRef.current[3],
            {
                x: 0,
                opacity: 1,
                duration: 1.0,
                ease: "power3.out",
                onComplete: () => {
                    setTimeout(() => {
                        startCounterAnimations();
                    }, 100);
                }
            },
            "-=0.3"
        );
    };

    useEffect(() => {

        resetElements();


        ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top 80%", 
            end: "bottom 0%", 
            onEnter: () => {
                resetElements();
                runAnimation();
            },
            onEnterBack: () => {
                resetElements();
                runAnimation();
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="hero" id="hero" ref={heroRef}>
            <div className="gradient-overlay"></div>
            <div className="background-grid"></div>

            <div className="floating-icons">
                <FaBook className="icon book" />
                <FaStar className="icon star" />
                <FaPlane className="icon airplane" />
            </div>

            <div className="hero-container container">
                <div className="hero-row row">
                    <div className="hero-col col-12">
                        <div className="brand-title">
                            <h1 ref={h1Ref}>edufam</h1>
                            <img className="img-1" ref={imgRef} src="/Images/hero/img-2.png" alt="Image-1" />
                        </div>
                        <div className="content">
                            <div className="content-items">
                                <h5 ref={(el) => (contentItemsRef.current[0] = el)}>Empowering Education</h5>
                                <p ref={(el) => (contentItemsRef.current[1] = el)}>
                                    Turn your German study dreams into reality. Complete support from application to arrival
                                    and beyond.
                                </p>
                                <div className="hero-buttons" ref={(el) => (contentItemsRef.current[2] = el)}>
                                    <button className="btn btn-1">Consultation</button>
                                    <button className="btn btn-2">Check Eligibility</button>
                                </div>

                                <div className="stats-container" ref={(el) => (contentItemsRef.current[3] = el)}>
                                    <div className="stat">
                                        <div className="items">
                                            <span
                                                className="counter"
                                                data-target="500"
                                                ref={(el) => (countersRef.current[0] = el)}
                                            >
                                                0
                                            </span>
                                            <span>+</span>
                                        </div>
                                        <p>Students Helped</p>
                                    </div>
                                    <div className="stat">
                                        <div className="items">
                                            <span
                                                className="counter"
                                                data-target="98"
                                                ref={(el) => (countersRef.current[1] = el)}
                                            >
                                                0
                                            </span>
                                            <span>%</span>
                                        </div>
                                        <p>Success Rate</p>
                                    </div>
                                    <div className="stat">
                                        <div className="items">
                                            <span
                                                className="counter"
                                                data-target="10"
                                                ref={(el) => (countersRef.current[2] = el)}
                                            >
                                                0
                                            </span>
                                            <span>+</span>
                                        </div>
                                        <p>Years Experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;