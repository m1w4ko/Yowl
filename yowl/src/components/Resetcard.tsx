import { useNavigate } from "react-router-dom";
import "./resetcard.css";
import { useState } from "react";

interface Props2 {
  setPage: (page: string) => void;
}

const Resetcard = ({ setPage } :Props2) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
  
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await fetch(`https://truspilote-clone.vercel.app/api/auth/sendtoken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email
          }),
        });
  
        if (response.ok) {
          setEmail("");
          navigate("/");
        } else {
          console.log("Failed to send email.");
        }
      } catch (error) {
        console.log("Error: ");
      }
    };

    
    const handeChangePage = () => {
        setPage('login')
    }


    return (

        <div className="div-form1">
            <h3 className="t1">Forgot your password </h3>
            <p className="text">We'll send you a reset link </p>
            <hr className="line1" />
            <form onSubmit={handleSubmit} method="POST" className="form1">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={(e) => {setEmail(e.target.value);}} placeholder="Enter your email" required />
                <button type="submit" className="btnform2">Reset</button>
                <p onClick={handeChangePage} className="reset">Go back</p>
            </form>
        </div>

    );
};

export default Resetcard;