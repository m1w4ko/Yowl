import { useState } from "react";
import "./logincard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logincard = ({ setPage }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                email,
                password,
            });

            // Stocker le token et le nom d'utilisateur dans le Local Storage
            const { token, user } = response.data;
            localStorage.setItem("Token", token);
            localStorage.setItem("user_id", user.id);

            setMessage(response.data.message);
            navigate(`/`)
        } catch (error) {
            setMessage("login failed");
        }
    };


    const handeChangePage = () => {
        setPage('register')
    }

    const handleChangePage = () => {
        setPage('reset')
    }

    const googleAuth = ()=> {
        window.location = "http://localhost:3000/api/passport/auth/google";  
      }
    

    return (
        <><div className="div-form">
            <h3>Login</h3>
            <hr className="line" />
            <form method="POST" className="form" onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {message && <p className="error-message">{message}</p>}
                <p onClick={handleChangePage} className="reset-link">Reset your password</p>
                <button type="submit" className="subco">Connexion</button>
                <div className="google-signin-container">
                <button className="google-signin-btn">
                <img onClick={googleAuth} src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png" alt="Google Logo" className="google-logo" />
                </button>
            </div>
            </form>
            
        </div>

            <div className="Register">
                <h3>Or register...</h3>
                <button onClick={handeChangePage} className="create" type="submit">Create an account</button>
            </div>
            
            </>
    );
};

export default Logincard;
