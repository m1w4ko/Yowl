import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
        <div className="footer-footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            Yowl is dedicated to providing authentic and insightful reviews to
            help you make informed decisions. All reviews are written by users
            and remain unaltered. They represent the personal opinions of the
            reviewers and do not reflect the views or endorsements of Yowl.
          </p>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Have questions? We’d love to hear from you.</p>
          <p>Email: support@yowl.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/facebook.png" alt="Facebook" />
            </a>
            <a
              href="https://github.com/EpitechCodingAcademyPromo2025/C-COD-160-BAR-1-1-yowl-paul.hermel"
              target="_blank"
              rel="noopener noreferrer"
            >
            <img src="/github.png" alt="Github" />
            </a>
          </div>
        </div>
        <div className="image-footer">
        <img src="/footerimg.png" alt="people enjoying"/>
        </div>
      </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Yowl. All rights reserved.</p>
        <p>
          <a href="/cdc.pdf" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a href="/chart.pdf" target="_blank" rel="noopener noreferrer">
            Graphic chart
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
