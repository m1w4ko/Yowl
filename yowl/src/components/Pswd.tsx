import axios from "axios";
import "./pswd.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Pswd = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verify, setVerify]= useState(false)
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

console.log(password, confirmPassword, email)

    const verifyToken = () => {
        axios
          .post(`http://localhost:3000/api/auth/verifytoken`, {
            token: token,
          })
          .then((response) => {
            setVerify(true)
            setEmail(response.data.results.email)
            console.log(response.data.results.email);
          })
          .catch((err) => console.log(err));
      };
    
      useEffect(() => {
        verifyToken();
      }, []);
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:3000/api/auth/resetpassword`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password,
              confirmPassword,
              email
            }),
          });
    
          if (response.ok) {
            setPassword("");
            setConfirmPassword("")
            navigate('/login')
          } else {
            console.log("Failed to login.");
          }
        } catch (error) {
          console.log("Error: " + error.message);
        }
      };
    
    

    return (

        verify &&(
        <div className="bodypswd">
          <div className="div-form1">
              <h3>Forgot your password ? </h3>
              <hr className="line1" />
              <form onSubmit={handleSubmit} method="POST" className="form1">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" placeholder="Enter your new password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <label htmlFor="password">Password confirmation</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your new password" required />
                  <button type="submit">Reset</button>
              </form>
          </div>
        </div>
        )

    );
};

export default Pswd;