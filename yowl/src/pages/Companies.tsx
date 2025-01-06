import Description from "../components/Describing";
import { IBusines } from "../types/IBusiness";
import { IRating } from "../types/IRating";
import { IReviews } from "../types/IReviews";
import { ILikes } from "../types/Ilikes";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Company() {

    const { id } = useParams<{ id: string }>(); 
    const [business, setBusiness] = useState<IBusines | null>(null);
    const [reviews, setReviews] = useState<IReviews[] | null>(null);
    const [likes, setLikes] = useState<ILikes[] | null>(null);
    const [rating, setRating] = useState<IRating | null>(null);

    
        const fetchBusinessData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/business/${id}`);
                const data = await response.json();
                console.log(data.results[0]);
                
                setBusiness(data.results[0]);
            } catch (error) {
                console.error("Error fetching", error);
            }
        };

        const fetchBusinessRatingData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/business/rating/${id}`);
                const data = await response.json();
                setRating(data.results[0]);
            } catch (error) {
                console.error("Error fetching", error);
            }
        };

        const fetchReviewsData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/reviews/${id}`);
                const data = await response.json();
                setReviews(data.results);
            } catch (error) {
                console.error("Error fetching", error);
            }
        };

        const fetchLikesData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/likes/get_likes_review/${id}`);
                const data = await response.json();
                setLikes(data.results[0]);
            } catch (error) {
                console.error("Error fetching", error);
            }
        };


        console.log("BUS", business)
        console.log("REV", reviews)
        console.log("LIk", likes)
        console.log("RAT", rating)
    

        useEffect( ()=> {
            fetchBusinessData();
            fetchBusinessRatingData();
            fetchReviewsData();
            fetchLikesData();
        },[id])
  
    
    return (
        <div className="bg-[rgb(246,237,215)] w-full min-h-screen pt-[100px] pb-[200px]">
            {business && (
                <Description business={business} reviews={reviews} likes={likes} rating={rating} users={null}/>
            )}
        </div>
    )
}

export default Company