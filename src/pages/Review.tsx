import React from "react";
import "./Review.css";
import ReviewForm from "../components/ReviewForm";
// import RecentReviews from "../components/RecentReview";

function Review() {
    return (
        <div className="Review">
            <ReviewForm />
            {/* <RecentReviews /> */}
        </div>
    );
}

export default Review