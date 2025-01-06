import React, { useState } from "react";
import "./filter.css";

const Filter: React.FC = () => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (value: number) => {
        setRating(value);
    };

    const getStarColor = (value: number) => {
        if (rating >= value) {
            if (rating === 5) return "green";
            if (rating >= 3) return "orange";
            return "red";
        }
        return "gray";
    };

    return (
        <div className="filter-container">
            <div className="filter-header">
                <h3>Filter Companies</h3>
                <p>Choose the criteria to filter companies by:</p>
            </div>
            <form className="filter-form">
                <div className="filter-group">
                    <label htmlFor="company-type">Company Type</label>
                    <select id="company-type" name="company-type">
                        <option value="tech">Tech</option>
                        <option value="health">Health</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Rating</label>
                    <div className="rating-options">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                key={value}
                                className="star"
                                style={{ color: getStarColor(value) }}
                                onClick={() => handleStarClick(value)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <label htmlFor="company-location">Location</label>
                    <input
                        type="text"
                        id="company-location"
                        name="company-location"
                        placeholder="Enter location"
                    />
                </div>
                <button type="submit" className="filter-btn">
                    Apply Filters
                </button>
            </form>
        </div>
    );
};

export default Filter;
