import { useState, useEffect } from "react";
import axios from "axios";
import { IReviews } from "../types/IReviews";
import "./RecentReview.css";


interface RecentReviewProps {
  id: number;
  businessName: string;
}


function RecentReviews({ id, businessName }: RecentReviewProps) {
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<IReviews[]>([]);

  useEffect(() => {
    axios
      .get(`https://truspilote-clone.vercel.app/reviews/last/${id}`)
      .then((response) => {
        const fetchedReviews = response.data.results;

        if (Array.isArray(fetchedReviews)) {
          const sortedReviews = fetchedReviews
            .filter((review) => review.createdAt)
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

          setReviews(sortedReviews.slice(0, 3));
        } else {
          console.error("Invalid data format:", response.data.results);
        }
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="recent-reviews-container">
      <h2>Recent Reviews for {businessName}</h2>
      <p className="r-comment">Get inspired and evaluate the other comments</p>
      {loading && <p>Loading reviews...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="reviews-grid">
        {reviews.length > 0
          ? reviews.map((review, index) => (
              <div
                key={index}
                className={`review-card ${
                  index % 2 === 0 ? "odd-card" : "even-card"
                }`}
                style={{ backgroundColor: review.color || "transparent" }}
              >
                <div className="review-header">
                  {review.avatar ? (
                    <img src={review.avatar} className="profile-avatar" />
                  ) : (
                    <div className="profile-placeholder">
                      {review.firstname
                        ? review.firstname.charAt(0).toUpperCase()
                        : "A"}
                    </div>
                  )}
                  <h3>
                    {`${review.firstname || "Anonymous"} ${
                      review.lastname || ""
                    }`.trim()}
                  </h3>
                </div>
                <p className="comment">
                  {review.content || "No comment provided."}
                </p>
              </div>
            ))
          : !loading && <p className="messinfo1">No reviews available yet</p>}
      </div>
    </div>
  );
}

export default RecentReviews;
