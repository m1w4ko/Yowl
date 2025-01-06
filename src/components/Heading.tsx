import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./heading.css";

function Heading() {

  const navigate = useNavigate();
  const image = "./public/yowl.png";
  const image2 = "./public/yowl2.png";
  const [imageToShow, setImageToShow] = useState<string>(image);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(window.innerWidth > 768);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("Token"));

  const updateImage = () => {
    if (window.innerWidth <= 768) {
      setImageToShow(image2);
    } else {
      setImageToShow(image);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
    updateImage();

  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    navigate(`/`)
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setIsLoggedIn(!!token);
  }, [localStorage.getItem("Token")]);

  useEffect(() => {
    updateImage();
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="header h-[100px] w-full bg-[#F6EDD7] sticky">
      <Link to="/"><img className="logo" src={imageToShow} alt="Yowl logo" /></Link>
      <div className={`navbar ${isMenuOpen ? "open" : "hidden"}`}>
        <Link to="/categories" className="btn">Categories</Link>
        <Link to="/review" className="btn">Reviews</Link>
        <Link to="/about-us" className="btn">About us</Link>
        {isLoggedIn && <Link to="/account" className="btn">My account</Link>}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn2">Logout</button>
        ) : (
          <Link to="/login" className="btn2">Login</Link>
        )}
      </div>

      <div className="nav-btn">
        <button className="hamburger" onClick={toggleMenu}>
          <span className="hamburger-icon"></span>
          <span className="hamburger-icon"></span>
          <span className="hamburger-icon"></span>
        </button>
      </div>
    </div>
  );
}

export default Heading;
