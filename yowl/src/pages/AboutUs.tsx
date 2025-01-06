import React, { useState, useEffect } from "react";
import "./aboutus.css";

function AboutUs() {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  const text = "What is Yowl ?";

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 170);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  const [showText, setShowText] = useState(false);

  const handleTextReveal = () => {
    setShowText(true);
  };

  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = {
    Lisa: {
      name: "Lisa Eriksen",
      role: "Project Manager",
      bio: "Lisa is the Project Manager and has been pivotal in coordinating the development process as well as back-end development.",
      image: "/team-lisa.png",
    },
    Paul: {
      name: "Paul Hermel",
      role: "Back-End Developer",
      bio: "Paul is responsible for the server-side logic and database management. He also makes sure that the front-end and the backend are well connected.",
      image: "/team-paul.png",
    },
    Zoé: {
      name: "Zoé Charrier",
      role: "Full Stack Developer",
      bio: "Zoé focuses on both front-end and back-end development, making sure everything works seamlessly and that the website is coherent with the mockups.",
      image: "/team-zoe.png",
    },
    Chloé: {
      name: "Chloé Pons",
      role: "Full Stack Developer",
      bio: "Chloé works across the entire stack, bringing her creativity and technical skills to both front-end and back-end as well as debugging the code itself.",
      image: "/team-chloe.png",
    },
  };

  const handlePopupToggle = (memberKey: any) => {
    setSelectedMember(teamMembers[memberKey]);
  };

  const closePopup = () => {
    setSelectedMember(null);
  };

  return (
    <div className="body">
      <section className="aboutus-header">
        <h1 className="typing-effect">{typedText}</h1>
        <button
          onClick={handleTextReveal}
          style={{
            padding: "10px 20px",
            margin: "20px 0",
            backgroundColor: "#3d348b",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: "'Lexend', sans-serif",
          }}
        >
          Reveal More
        </button>
        <p className={showText ? "animate" : ""}>
          Yowl is a website created in December 2024 by four students at the
          Epitech Coding Academy as a part of learning course. The website was
          created in three weeks. Yowl is a website that invite users to share
          their opinions on different companies and businesses by writing
          review. With the use of different stacks (php, js, react.js, css,
          tailwind), the website puts foward the best reviews and allow you to
          vote for other reviews.
        </p>
      </section>
      <section className="section-aboutus">
        <div className="section2">
          <div className="card-aboutus">
            <h2>Mission</h2>
            <p>
              At Yowl, our mission is to provide a platform where users can
              share honest feedback and reviews to help others make informed
              decisions. We aim to empower businesses and individuals by
              fostering a community of trust, transparency, and valuable
              insights. Through user-generated content and a commitment to
              excellence, we strive to create a space where creativity and
              authentic experiences shape the future of online recommendations.
            </p>
          </div>
          <div className="card-aboutus">
            <h2>Vision</h2>
            <p>
              We envision a world where user reviews and feedback play a pivotal
              role in shaping informed decisions, driving growth, and fostering
              transparency. Our goal is to lead this transformation by providing
              a trusted platform that empowers individuals and businesses to
              connect, share experiences, and create a positive impact through
              authentic, user-driven insights.
            </p>
          </div>
          <div className="card-aboutus">
            <h2>Values</h2>
            <ul>
              <li>
                <strong>Integrity:</strong> We are committed to providing a
                transparent and trustworthy platform where honest reviews drive
                informed decisions.
              </li>
              <li>
                <strong>Innovation:</strong> We continually enhance our platform
                to offer innovative features that empower users to share
                valuable insights.
              </li>
              <li>
                <strong>Community-Centricity:</strong> Our users are at the core
                of everything we do, and we foster a space where everyone’s
                voice is heard.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="aboutus-team">
        <h2>Meet Our Team</h2>
        <p className="paragraph">
          Our Team is made out of 4 people, one project manager and back-end
          developer and three other full-stack web developers.
        </p>
        <p className="click-team">
          Click on the image of the member you want to discover.
        </p>
        <div className="team-photos">
          {Object.keys(teamMembers).map((memberKey) => (
            <div
              key={memberKey}
              className="description"
              onClick={() => handlePopupToggle(memberKey)}
            >
              <img
                src={teamMembers[memberKey].image}
                alt={teamMembers[memberKey].name}
              />
              <p>{teamMembers[memberKey].name}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedMember && (
        <div className="popup">
          <div className="popup-content">
            <h3>{selectedMember.name}</h3>
            <p>
              <strong>Role:</strong> {selectedMember.role}
            </p>
            <p>
              <strong>Bio:</strong> {selectedMember.bio}
            </p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      <section className="contact">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <div className="contact-left">
            <p>
              If you have any questions or concerns, please don't hesitate to
              reach out to us. Our team is dedicated to providing you with the
              best possible support, and we aim to respond to all inquiries
              within 24 hours. Whether you need assistance with using our
              platform or have any technical issues, we are here to help! We
              believe in the power of communication and strive to ensure that
              your experience with us is seamless and enjoyable. Your
              satisfaction is our top priority, and we're always ready to assist
              you in any way we can.
            </p>
            <img src="/aboutus.png" alt="Contact" />
          </div>

          <div className="contact-right">
            <form action="https://formspree.io/f/mjkvdlzn" method="POST">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />

              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                required
              ></textarea>

              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
