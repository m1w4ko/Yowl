import React, { useState } from "react";
import "./ReviewFilter.css";

const ReviewFilter: React.FC = () => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (value: number) => {
        setRating(value);
    };

    return (
        <div className="filter-container">
            <div className="filter-header">
                <h3>Filter Reviews</h3>
                <p>Refine reviews based on specific criteria:</p>
            </div>
            <form className="filter-form">
                <div className="filter-group">
                    <label>Rating</label>
                    <div className="rating-options">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                key={value}
                                className={`star ${
                                    value <= rating ? "selected" : ""
                                }`}
                                onClick={() => handleStarClick(value)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <label htmlFor="verified">Verified Reviews</label>
                    <input type="checkbox" id="verified" name="verified" />
                </div>
                <div className="filter-group">
                    <label htmlFor="with-replies">With Replies</label>
                    <input type="checkbox" id="with-replies" name="with-replies" />
                </div>

                <div className="filter-group">
                    <label htmlFor="date-range">Date Range</label>
                    <select id="date-range" name="date-range">
                        <option value="all">All Reviews</option>
                        <option value="30-days">Last 30 Days</option>
                        <option value="3-months">Last 3 Months</option>
                        <option value="6-months">Last 6 Months</option>
                        <option value="12-months">Last 12 Months</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="language">Language</label>
                    <select id="language" name="language">
                        <option value="all">All Languages</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                    </select>
                </div>

                <button type="submit" className="filter-btn">Apply Filters</button>
            </form>
        </div>
    );
};

export default ReviewFilter;
