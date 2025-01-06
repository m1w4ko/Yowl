import "./describing.css";
import { useNavigate } from "react-router-dom";
import { IBusines } from "../types/IBusiness";
import { IReviews } from "../types/IReviews";
import { IUsers } from "../types/IUsers";
import { RatingBarFilter } from "./rating/RatingBarFilter";
import ReactStars from 'react-stars';
import Review from "./Review";
import { useEffect, useState } from "react";
import { IRating } from "../types/IRating";
import { ILikes } from "../types/Ilikes";

interface DescribingProps {
    business: IBusines,
    reviews: IReviews[],
    users?: IUsers | null,
    rating?: IRating | null
    likes?: ILikes[] | null
}

function Description({ business, reviews, rating }: DescribingProps) {

    const navigate = useNavigate();
    const [reviewsFilter, setReviewsfilter] = useState(reviews);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("Token"));
    const [hasReviews, setHasReviews] = useState<boolean>(!!(reviews && reviews.length > 0));
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

    const handleCreateReviewClick = () => {
        navigate('/review');
        window.scrollTo(0, 0);
    };

    const handleshowfilter = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
    }, []);


    console.log("ID", business);


    useEffect(() => {
        if (reviews && reviews.length > 0) {
            setReviewsfilter(reviews);
            setHasReviews(true);
        } else {
            setHasReviews(false);
        }
    }, [reviews]);

    useEffect(() => {
        const token = localStorage.getItem("Token");
        setIsLoggedIn(!!token);
    }, [localStorage.getItem("Token")]);


    return (
        <>
            <div className="container">
                <div className="bloc1">
                    <div className="image-rate">
                        <img src={business.image} className="bloc1-image" alt="logo of the company described" />
                        {reviews && reviews.length > 0 ? (
                            <><p className="note">{rating?.rating}/5</p>
                                <ReactStars key={business?.id} edit={false} count={5} value={rating?.rating} size={24} color2={'#ffd700'} /></>
                        ) : (
                            <p className="no-rating"> </p>
                        )}
                    </div>
                    <div className="bloc1-content">
                        <h2 className="bloc1-title">{business.name}</h2>
                        <a href={business.web} target="_blank" rel="noopener noreferrer">
                            <img src="../link.png" alt="Link to website" className="linkweb" />
                        </a>
                        <p>{business.description}</p>
                        {isLoggedIn && (<button className="bloc1-button" onClick={handleCreateReviewClick}>
                            Create a review
                        </button>
                        )}
                    </div>
                </div>

                <div className="bloc2">
                    <div className="card2-content">
                        <h2 className="bloc2-title">Reviews</h2>

                        <div className="grid-container">
                            <h2 className="bloc-title">Total reviews</h2>
                            <div className="rating">
                                <p className="nb">{rating?.reviews_number}</p>
                            </div>

                            <h2 className="bloc-title">Average rating</h2>
                            <div className="notation">
                                {reviews && reviews.length > 0 ? (
                                    <>
                                        <h2 className="ratee">{rating?.rating}/5</h2>
                                        <div>
                                            <ReactStars edit={false} count={5} value={rating?.rating} size={24} color2={"#ffd700"} />
                                        </div>
                                        <p className="detail">Rating on this year</p>
                                    </>
                                ) : (
                                    <p className="no-rating">No rating for now</p>
                                )}
                            </div>
                            {isMobile && (
                                <button className="filter-button" onClick={handleshowfilter}> Show filters</button>
                            )}

                            <h2 className="bloc-title3">Filter</h2>
                            <div className="filter">
                                <div className={`filter-container ${isFilterVisible ? "block" : "hidden"} md:block`}>
                                    {hasReviews && (
                                        <RatingBarFilter reviews={reviews} setReviewsfilter={setReviewsfilter} />
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                    <hr className="divider" />
                    {isLoggedIn && (<button className="bloc2-button" onClick={handleCreateReviewClick}>
                        Create a review
                    </button>)}

                    <div className="mt-[60px]">
                        {reviews && reviews.length > 0 && (
                            reviewsFilter && reviewsFilter.map((item) => (
                                <div key={item.id}>
                                    <Review reviews={item} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Description;
