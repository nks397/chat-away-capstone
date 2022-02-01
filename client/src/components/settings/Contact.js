import React from "react"

function Contact() {
    return(
        <div className="contact-container">
            <div className="contact-info">
                <p>
                    <h1 className="contact-title">Contact Us</h1>
                    <div>
                        <div className="contact-icons">
                            <i title="Our Address" class="fas fa-map-marker-alt"> <span className="span-contact-info"> 3452 Babbling Ave Charleston SC, 29407</span></i> 
                            <i title="Email Us" class="fas fa-envelope"> <span className="span-contact-info"> chataway@gmail.com</span></i>
                            <i title="Call Us" class="fas fa-phone-square"> <span className="span-contact-info"> (843)555-0164</span></i>
                        </div>
                        <div className="social-media-icons">
                            <i title="Follow Us on Twitter @chataway" class="fab fa-twitter-square"></i>
                            <i title="Follow Us on Instagram @chataway"class="fab fa-instagram-square"></i>
                            <i title="Follow Us on Facebook @chataway" class="fab fa-facebook-square"></i>
                        </div>
                        <p>Copyright © 2022 Chat Away</p>
                    </div>
                </p>
            </div>  
        </div>
    )
}

export default Contact