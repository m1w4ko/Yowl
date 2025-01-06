import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CallbackPage(){

    // const dispatch = useDispatch()
    const navigate = useNavigate();


    const findUser = (email, token) => {
      axios
        .put(`http://localhost:3000/api/users/find`, {
          email,
        })
        .then((response) => {
          if (response.data.results.length > 0) {
            console.log("user login successfull");
            localStorage.setItem("user_id", response.data.results[0].id);
            localStorage.setItem("Token", token);
            navigate(`/`)
          } else {
            console.log("register first");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };


    useEffect(() => {
      axios
        .get("http://localhost:3000/api/passport/auth/google/profile")
        .then((response) => {
          if (response.data.results.length > 0) {
            const email = response.data.results[0].email
            const token = response.data.results[0].token
            findUser(email, token);
          } else {
        console.log("Connection with Google failed");
          }
        })
        .catch((err) => console.log(err));
    }, []);
    

    // axios
    // .get('http://localhost:3000/api/passport/auth/google/profile')
    // .then((response) => {
    //   if (response.data.results.length > 0) {
    //     console.log(response.data.results[0]);

    //     // dispatch(setUser({
    //     //     name : response.data.results[0].name,
    //     //     email: response.data.results[0].email
    //     // }))
    //     localStorage.setItem("Token", response.data.results[0].token);
    //     localStorage.setItem("user_id", response.data.results[0].id);
    //     console.log("GOOGLE",response.data.results[0].id)
    //     navigate(`/`)
    //   }
    // })
    // .catch((err) => console.log(err));


    return(
        <div>hello</div>
    )
}

export default CallbackPage;
