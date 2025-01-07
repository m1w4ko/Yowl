import { useState } from "react";
import axios from "axios";
import "./registercard.css";

interface Props {
    setPage: (page: string) => void;
  }

const Registercard = ({setPage} : Props) => {
    
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const role = 0;
    const avatar = "https://rugby.vlaanderen/wp-content/uploads/2018/03/Anonymous-Profile-pic.jpg";
    const country = "";
    const lastname = "";

    const handleRegister = async (e: any) => {
        e.preventDefault(); 
        try {
            const response = await axios.post("https://truspilote-clone.vercel.app/auth/register", {
                firstname,
                lastname,
                email,
                password,
                confirmPassword,
                country,
                role,
                avatar,
            });

            setMessage(response.data.message);
            setPage("login");
        } catch (error) {
            setMessage("Registration failed");
        }
    };


    const handeChangePage =  () => {
        setPage('login')
    }
    return (
        <div className="div-form2">
            <h3 className="t2">Register</h3>
            <hr className="line" />
            <form className="form2" onSubmit={handleRegister}>
                <label htmlFor="firstname">First Name</label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Enter your first name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirmPassword">Password Confirmation</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                
                {message && <p className="error-message">{message}</p>}
                <p onClick={handeChangePage} className="link">Already have an account ?</p>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registercard;
