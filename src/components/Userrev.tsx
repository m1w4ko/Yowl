import { useEffect, useState } from "react";
import { IBusines } from "../types/IBusiness";
import { IReviews } from "../types/IReviews";
import "./userrev.css";
import axios from "axios";

function Userrev({ review, fetchUser2Data }: {
    review: IReviews;
}) {
    console.log("REVIEW", review)
    const [business, setBusiness] = useState<IBusines | null>(null);
    const formattedDate = new Date(review.createdAt).toLocaleDateString();


    const id = review.business_id

    const deleteReview = () => {
        axios
        .get(`http://localhost:3000/api/reviews/delete/${review.id}`)
        .then((response) => {
          if (response.data.results) {
            console.log(response.data.results)
            fetchUser2Data()
        }
        })
        .catch((error) => {
          console.error("There was an error deleting review:", error);
        });
    }


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

    useEffect(() => {
        fetchBusinessData();
    }, [id]);

    

    return (
        <div className="review-card">
            <div className="review-header">
                <img src={business?.image} alt="Business logo" className="busi" />
                <h3 className="review-title">{business?.name}</h3>
                <button onClick={deleteReview}><img src="https://cdn-icons-png.flaticon.com/512/64/64022.png" alt="bin to delete a review" className="bin" /></button>
            </div>
            <div className="review-content">
                <p className="contenutitre">{review.title}</p>
                <p className="contenu">{review.content}</p>
                <p className="review-date">On {formattedDate}</p>
            </div>
        </div>
    );
}

export default Userrev;
