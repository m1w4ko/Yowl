import { useNavigate } from "react-router-dom";
import "./companycards.css";
import { IBusines } from "../types/IBusiness";
import { IRating } from "../types/IRating";
import { useEffect, useState } from "react";
import ReactStars from 'react-stars';

function Cards({ business }: { business: IBusines }) {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("Token"));
    const [rating, setRating] = useState<IRating | null>(null);

    console.log("RATE", rating)

    const handleButtonClick = (e: any) => {
        e.stopPropagation();
        navigate('/review');
        window.scrollTo(0, 0);
    };

    const handleCardClick = () => {
        navigate(`/company/${business.id}`);
    };

    useEffect(() => {
        const token = localStorage.getItem("Token");
        setIsLoggedIn(!!token);
    }, [localStorage.getItem("Token")]);


    const fetchBusinessRatingData = async () => {
        try {
            const response = await fetch(`"https://truspilote-clone.vercel.app/business/rating/${business.id}`);
            const data = await response.json();
            setRating(data.results[0].rating);
        } catch (error) {
            console.error("Error fetching", error);
        }
    };

    useEffect(() => {
        fetchBusinessRatingData();
    }, [business])

    return (

        <div className="card-link card hover:cursor-pointer" onClick={handleCardClick}>
            <img src={business.image}
                className="card-image" alt="businee image representing the logo"
            />
            <div className="card-content">
                <h2 className="card-title">{business.name}</h2>
                <a href={business.web} target="_blank" rel="noopener noreferrer" onClick={handleButtonClick}>
                    <img src="link.png" alt="Link to website" />
                </a>
                {rating ? (
                    <>
                        <p className="rat">{rating}/5</p>
                        <div className="stars-div">
                            <ReactStars
                                edit={false}
                                count={5}
                                value={rating}
                                size={24}
                                color2={'#ffd700'}
                            />
                        </div>
                    </>
                ) : (
                    <p className="no-rating2">No rating for now</p>
                )}
                {isLoggedIn && (<button className="card-button" onClick={handleButtonClick}>Create a review</button>)}
            </div>
        </div>
    );
}

export default Cards;

