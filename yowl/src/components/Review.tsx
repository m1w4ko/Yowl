import "./review.css";
import { useState, useEffect } from "react";
import { IReviews } from "../types/IReviews";
import { ILikes } from "../types/Ilikes";
import { IUsers } from "../types/IUsers";
import axios from "axios";
import ReactStars from "react-stars";

interface ReviewProps {
    reviews: IReviews;
    likes: ILikes | null;
    user: IUsers | null;
}

function Review({ reviews, likes }: ReviewProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(likes?.is_liked || false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("Token"));
    

    const user_id = localStorage.getItem("user_id");
    const review_id = reviews.review_id;

    useEffect(() => {
        const token = localStorage.getItem("Token");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await axios.get(`https://truspilote-clone.vercel.app/api/likes/get_likes_review/${review_id}`);
                
                if (response.data && response.data.results[0].likes_count !== undefined) {

                    setLikeCount(response.data.results[0].likes_count);
                }
            } catch (error) {
                console.error("Error fetching likes count: ", error);
            }
        };

        if (review_id) {
            fetchLikes();
        }
    }, [review_id]);

    useEffect(() => {
        const fetchUserLikeStatus = async () => {
            try {
                const response = await axios.get(`https://truspilote-clone.vercel.app/api/likes/get_likes_user/${user_id}/${review_id}`);
                if (response.data && response.data.results.length > 0) {
                    setIsClicked(true);
                } else {
                    setIsClicked(false);
                }
            } catch (error) {
                console.error("Error fetching user like status: ", error);
            }
        };

        if (user_id) {
            fetchUserLikeStatus();
        }
    }, []);


    const handleLikes = async () => {
        if (!isLoggedIn) return;

        try {
            if (!isClicked) {
                const response = await axios.post("https://truspilote-clone.vercel.app/api/likes/create", {
                    user_id,
                    review_id,
                    is_liked: true,
                    is_disliked: false,
                });

                if (response.status === 200) {
                    console.log("Like créé avec succès !");
                    setIsClicked(true);
                    setLikeCount((prev) => prev + 1);
                }
            } else {
                const response = await axios.post("https://truspilote-clone.vercel.app/api/likes/update", {
                    user_id,
                    review_id,
                    is_liked: false,
                    is_disliked: true,
                });

                if (response.status === 200) {
                    console.log("Like retiré avec succès !");
                    setIsClicked(false);
                    setLikeCount((prev) => Math.max(0, prev - 1));
                }
            }
        } catch (error) {
            console.error("Erreur lors de la gestion des likes : ", error);
        }
    };

    const handleHover = () => {
        if (!isClicked) {
            setIsHovered(true);
        }
    };

    const handleNotHover = () => {
        if (!isClicked) {
            setIsHovered(false);
        }
    };

    const formattedDate = reviews.createdAt 
    ? new Date(reviews.createdAt).toLocaleDateString()
    : "Unknown date";
    return (
        <div className="review-container">
            <div className="review-content">
                <div className="userinfo">
                    <img  src={reviews.avatar} className="image" alt="User avatar" />
                    <h2 className="review-user">
                        {reviews.firstname} {reviews.lastname}
                    </h2>
                    <div className="review-rating">
                        <ReactStars
                            key={reviews?.id}
                            edit={false}
                            count={5}
                            value={reviews?.rating}
                            size={24}
                            color2={"#ffd700"}
                        />
                    </div>
                    <div className="review-feedback">
                        {isLoggedIn && (
                            <div className="likes">
                                <img
                                    src={isClicked || isHovered ? "../coeur.png" : "../coeurgris.png"}
                                    className="coeur"
                                    alt="like button"
                                    onMouseEnter={handleHover}
                                    onMouseLeave={handleNotHover}
                                    onClick={handleLikes}
                                />
                                <p className="like-count">{likeCount}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="head">
                    <h3 className="review-title">{reviews.title}</h3>
                    <p className="review-text">{reviews.content}</p>
                </div>
                <div className="date">
                    <p className="textdate">Experience's date :</p>
                    <p className="text2">{formattedDate}</p>
                </div>
                <hr className="review-divider1" />
            </div>
        </div>
    );
}

export default Review;
