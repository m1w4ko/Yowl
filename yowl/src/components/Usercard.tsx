import "./usercard.css";
import { IUsers } from "../types/IUsers";
import { useState, useEffect } from "react";
import axios from "axios";
import Userrev from "./Userrev";

function Usercard({ user, userrev, fetchUser2Data }: { user: IUsers, userrev: any[], fetchUser2Data: any }) {

    const [avatar, setAvatar] = useState(user?.avatar || "");
    const [firstname, setFirstname] = useState(user?.firstname);
    const [lastname, setLastname] = useState(user?.lastname);
    const [country, setCountry] = useState(user?.country);
    const [successMessage, setSuccessMessage] = useState("");
    const [likesHistory, setLikesCount] = useState(0);
    const [isCardVisible, setIsCardVisible] = useState(false);
    const isScrollable = (userrev?.length || 0) > 2;
    const id = localStorage.getItem("user_id");
    const [isMobile, setIsMobile] = useState(false);



    const fetchUserLikes = async () => {
        try {
            const response = await axios.get(`https://truspilote-clone.vercel.app/likes/get_likes_user/${id}`);
            console.log(response.data);

            if (response.data.results && response.data.results.length > 0) {
                setLikesCount(response.data.results[0].likes_count);
                console.log("like bien fetch !");
            }
            else {
                setLikesCount(0);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des likes: ", error);
        }
    };

    useEffect(() => {
        fetchUserLikes();
    }, [id]);



    const handleUpdate = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/users/user/${id}`, {
                avatar,
                firstname,
                lastname,
                country,
            });

            if (response) {
                setSuccessMessage("Successfully changed!");
                console.error("Your settings are successfully changed !");
            }
        } catch (error) {
            console.error("Request error: ", error);
        }
    };

    const toggleCardVisibility = () => {
        setIsCardVisible(!isCardVisible);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="contenant">
            <div className="first-card">
                <div className="pp">
                    <img src={user?.avatar} alt="avatr picture" className="first-card-image" />
                    <div className="userinfoo">
                        <h2 className="username">Hello {user?.firstname} {user?.lastname}</h2>
                        <p className="catch"><span className="font-bold text-[#8C85CE]">Email:</span>         {user?.email}</p>
                        <p className="catch"><span className="font-bold text-[#8C85CE]">Country:</span>       {user?.country}</p>
                    </div>
                </div>

                <div className="first-card-content">
                    <button className="logout-button" onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                    }}>
                        Log out
                    </button>
                </div>
            </div>
            {isMobile && (
                <>
                    <button id="toggle-card" className="toggle-card-btn" onClick={toggleCardVisibility}>
                        {isCardVisible ? "Hide the section" : "Customize Your Account"}
                    </button>
                    <div className={`sec-card ${isCardVisible ? "" : "hidden"}`}>
                        <h2>Customize your account</h2>
                        <div className="formmm">
                            <form onSubmit={handleUpdate}>
                                <div className="group2">
                                    <label htmlFor="avatar">Change your avatar:</label>
                                    <input type="text" id="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="Enter URL of new avatar" />
                                </div>
                                <div className="group2">
                                    <label htmlFor="firstname">First Name:</label>
                                    <input type="text" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Enter your first name" />
                                </div>
                                <div className="group2">
                                    <label htmlFor="lastname">Last Name:</label>
                                    <input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Enter your last name" />
                                </div>
                                <div className="group2">
                                    <label htmlFor="country">Country:</label>
                                    <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter your country" />
                                </div>
                                <button type="submit" className="btnsub2">
                                    Save Changes
                                </button>
                                {successMessage && (
                                    <div className="success-message">
                                        {successMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </>
            )}

            <div className="third-card">
                <h2 className="third-card-title">Review history</h2>
                <div className="third-card-content">
                    <div className="historic1">
                        <p className="nblikes">{userrev?.length || 0}</p>
                        <p className="details">Reviews</p>
                    </div>
                    <hr className="dividersp" />
                    <div className="historic2">
                        <p className="nblikes">{likesHistory}</p>
                        <p className="details">Likes</p>
                    </div>
                </div>

                <div className={`reviews-detail ${isScrollable ? "scrollable" : ""}`}>
                    {userrev?.map((item, index) => (
                        <Userrev
                            key={index}
                            review={item}
                            fetchUser2Data={fetchUser2Data} />
                    ))}
                </div>

            </div>

            {!isMobile && (
                <>
                <div className="sec-card"> 
                    <h2>Customize your account</h2>
                    <div className="formmm">
                        <form onSubmit={handleUpdate}>
                            <div className="group2">
                                <label htmlFor="avatar">Change your avatar:</label>
                                <input type="text" id="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="Enter URL of new avatar" />
                            </div>
                            <div className="group2">
                                <label htmlFor="firstname">First Name:</label>
                                <input type="text" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Enter your first name" />
                            </div>
                            <div className="group2">
                                <label htmlFor="lastname">Last Name:</label>
                                <input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Enter your last name" />
                            </div>
                            <div className="group2">
                                <label htmlFor="country">Country:</label>
                                <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter your country" />
                            </div>
                            <button type="submit" className="btnsub2">
                                Save Changes
                            </button>
                            {successMessage && (
                                <div className="success-message">
                                    {successMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
                </>
            )}
        </div>
    );
}

export default Usercard;
