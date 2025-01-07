import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { useNavigate } from "react-router-dom";
import "./categories.css";
import { IRating } from "../types/IRating";

interface ICategory {
  id: number;
  name: string;
}

interface IBusiness {
  id: number;
  name: string;
  category_id: number;
  category: string;
  web: string;
}

interface IRatingCustom extends IRating {
    company_id: number
}

function Categories() {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [businesses, setBusinesses] = useState<IBusiness[] | null>(null);
  const [rating, setRating] = useState<IRatingCustom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBusinesses, setLoadingBusinesses] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`https://truspilote-clone.vercel.app/categories/`);
        const results = await response.json();
        if (results.results && Array.isArray(results.results)) {
          setCategories(results.results);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(`https://truspilote-clone.vercel.app/business/`);
        const results = await response.json();
        if (results.results && Array.isArray(results.results)) {
          setBusinesses(results.results);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Error fetching businesses:", err);
        setError("Failed to load businesses.");
      } finally {
        setLoadingBusinesses(false);
      }
    };

    fetchBusinesses();
  }, []);


  useEffect(() => {
    const fetchBusinessRatingData = async (id: number): Promise<IRating | undefined> => {
      try {
        const response = await fetch(`http://localhost:3000/api/business/rating/${id}`);
        const data = await response.json();
        return data.results[0];
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
  
    const getData = async () => {
      if (businesses) {
        try {
          const results = await Promise.all(
            businesses.map(async (business) => {
              const result = await fetchBusinessRatingData(business.id);
              if (result) {
                return {
                  company_id: business.id,
                  rating: result.rating,
                  reviews_number: result.reviews_number,
                } as IRatingCustom;
              }
            })
          );
          // Filter out any undefined results (if fetch fails for some businesses)
          setRating(results.filter((item): item is IRatingCustom => item !== undefined));
        } catch (error) {
          console.error("Error processing ratings", error);
        }
      }
    };
  
    getData();
  }, [businesses]);

  if (loadingCategories || loadingBusinesses) {
    return <div className="categories-container">Loading...</div>;
  }

  if (error) {
    return <div className="categories-container">{error}</div>;
  }

  const scrollingCategories = categories
    ? [...categories, ...categories, ...categories]
    : [];

  const filteredBusinesses = selectedCategory
    ? businesses?.filter(
        (business) => business.category_id === selectedCategory
      )
    : businesses;

  const findCategory = (id: number) => {
    return (
      categories?.find((category) => category.id === id)?.name || "Unknown"
    );
  };

  return (
    <div className="body">
      <div className="title">
        <h1>Search for businesses!</h1>
      </div>
      <div className="categories-container">
        <p className="scroll-animation"></p>
        <div className="scrolling-boxes">
          {scrollingCategories.map((category, index) => (
            <div
              className={`box ${
                selectedCategory === category.id ? "selected-category" : ""
              }`}
              key={index}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )
              }
              style={{
                backgroundColor: "#3d348b",
              }}
            >
              <h3 className="box-title">
                {category.name || "No category available"}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="business-section">
        {filteredBusinesses?.map((business) => (
          <div key={business.id} className="business-item">
            <h2>{business.name}</h2>
            <p>
              <strong>Category:</strong> {findCategory(business.category_id)}
            </p>
            <div className="card-stars">
              <ReactStars
                edit={false}
                count={5}
                value={rating.find((r) => r.company_id === business.id)?.rating}
                size={24}
                color2={"#ffd700"}
              />
            </div>
            <div className="footer-box">
              <a href={business.web} target="_blank" rel="noopener noreferrer">
                <img src="link.png" alt="Link to website" />{" "}
              </a>
              <button onClick={() => navigate(`/company/${business.id}`)}>
                Learn more <span>&#8594;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
