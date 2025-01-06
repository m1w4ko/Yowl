import { useState, useEffect } from "react";
import axios from "axios";
import "./ReviewForm.css";
import { IBusines } from "../types/IBusiness";
import RecentReviews from "../components/RecentReview";
import { Link } from "react-router-dom";

interface ReviewFormProps {
  business: IBusines; 
}
function ReviewForm({business}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const [showAddCompany, setShowAddCompany] = useState(false);
  const [newCompanyTitle, setNewCompanyTitle] = useState("");
  const [newCompanyLink, setNewCompanyLink] = useState("");
  const [newCompanyDescription, setNewCompanyDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  const userID = localStorage.getItem("user_id");
  const token = localStorage.getItem("Token")


  useEffect(() => {
    axios
      .get("http://localhost:3000/api/business")
      .then((response) => {
        if (Array.isArray(response.data.results)) {
          setBusinesses(response.data.results);
        } else {
          console.error(
            "Expected an array of businesses, but received:",
            response.data
          );
          setBusinesses([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching businesses:", error);
        setBusinesses([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/categories")
      .then((response) => {
        if (Array.isArray(response.data.results)) {
          setCategories(response.data.results);
        } else {
          console.error(
            "Expected an array of categories, but received:",
            response.data
          );
          setCategories([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching businesses:", error);
        setCategories([]);
        setLoading(false);
      });
  }, []);


  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleSelectChange = (business: any) => {
    setCompany(business.id);
    setShowDropdown(false);
  };

  const handleCategorySelect = (category: any) => {
    setCategoryId(category.id);
    setCategory(category.name);
    setShowCategoryDropdown(false);
  };

  const handleImageUpload = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append("upload_preset", "ml_default");
    formData.append("cloud_name", "dfddxwawn");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dfddxwawn/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.error) {
        console.error("Cloudinary error:", data.error);
      } else {
        return data.secure_url;
      }
    } catch (error) {
      console.error("Error while uploading image:", error);
      throw error;
    }
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImagePreview(fileReader.result);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!company && !newCompanyTitle) {
      setMessage("Please select or add a company before submitting a review.");
      return;
    }

    try {
      const imageUrl = selectedImage ? await handleImageUpload(selectedImage) : null;
      let companyId = company;
      if (!companyId && newCompanyTitle) {

        const newCompanyData = {
          rating: rating,
          title: title,
          user_id: userID,
          content: details,
          name: newCompanyTitle,
          description: newCompanyDescription,
          web: newCompanyLink,
          image: imageUrl,
          category_id: categoryId,
        };

        console.log("Data sent to backend:", newCompanyData);
        await axios.post(`http://localhost:3000/api/business`, newCompanyData);

        // if (companyResponse.data && companyResponse.data.id) {
        //   companyId = companyResponse.data.id;
        //   console.log("New company added successfully!");
        // } else {
        //   console.log("Error creating new company. Please try again.");
        //   console.error("Response data:", companyResponse.data);
        //   return;
        // }
      }
      else {

        const reviewData = {
          rating: rating,
          title: title,
          content: details,
          business_id: companyId,
          user_id: userID,
          createdAt: new Date().toISOString().split("T")[0],
          category_id: null,
          verified: null,
        };
        console.log(reviewData);
        await axios.post(`http://localhost:3000/api/reviews/${companyId}`, reviewData);
      }


      setMessage("Review submitted successfully!");
      setRating(0);
      setTitle("");
      setDetails("");
      setCompany("");
      setNewCompanyTitle("");
      setNewCompanyLink("");
      setNewCompanyDescription("");
      setSelectedImage(null);
      setCategory("");
      setImagePreview(null);
    } catch (error) {
      setMessage("There was an error submitting your review.");
      console.error("Error submitting review:", error);
    }
  };


  if (!token) {
    return (<div className="etiquette">
      <span className='logrev'>Log in and share your review!</span>
      <Link to="/login" className="logtxt">Login</Link>
      <div className="Img5div"><img src="../avisetoiles.png" className="img5" alt="People trying to create a review" /></div>
    </div>)
  } else {



    return (
      <div className="body-review">
        <div className="review-header1">
          <h2>Create a review !</h2>
          <p>Share your experience and help people make the best choice</p>
          <img src="./team.png" className="teamwork" />
        </div>
        <div className="review-form-wrapper">
          <h2>Start now</h2>
          {loading ? (
            <div>Loading businesses...</div>
          ) : (
            <div className="review-form-container">
              <form className="review-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="company">Choose a company/article or add one :</label>

                  <div className="selectorlogo">
                    {company && (
                      <img
                        src={businesses.find((business) => business.id === company)?.image}
                        alt={
                          businesses.find((business) => business.id === company)?.name ||
                          "Company logo"
                        }
                        className="company-logo"
                      />
                    )}

                    <div className="dropdown-wrapper">

                      <button
                        type="button"
                        className="dropdown-button"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        {company
                          ? businesses.find((business) => business.id === company)
                            ?.name
                          : "Select a company..."}
                      </button>
                      {showDropdown && (
                        <ul className="dropdown-list2">
                          {businesses.length > 0 ? (
                            businesses.map((business) => (
                              <li
                                className="dropdown-item2"
                                key={business.id}
                                onClick={() => handleSelectChange(business)}
                              >
                                {business.name}
                              </li>
                            ))
                          ) : (
                            <li className="dropdown-item2">
                              No companies available
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>


                  <button
                    type="button"
                    className="add-company-btn"
                    onClick={() => setShowAddCompany(!showAddCompany)}
                  >
                    Add a company / article
                  </button>
                </div>

                {showAddCompany && (
                  <div className="new-company-form">
                    <div className="form-group">
                      <label htmlFor="newCompanyTitle">Title of the company/article:</label>
                      <input
                        className="input"
                        type="text"
                        id="newCompanyTitle"
                        value={newCompanyTitle}
                        onChange={(e) => setNewCompanyTitle(e.target.value)}
                        placeholder="Enter title"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="newCompanyLink">Link of the company/article:</label>
                      <input
                        className="input"
                        type="url"
                        id="newCompanyLink"
                        value={newCompanyLink}
                        onChange={(e) => setNewCompanyLink(e.target.value)}
                        placeholder="Enter link"
                      />
                    </div>
                    <div className="form-group">
                      <label>Import a logo :</label>
                      <div className="custom-file-upload">
                        <div className="image-preview">
                          {imagePreview ? (
                            <img src={imagePreview} alt="Preview" />
                          ) : (
                            <img
                              src="https://cdn-icons-png.freepik.com/512/2893/2893432.png"
                              className="img-before"
                              alt="Preview of the company logo chosen"
                            />
                          )}
                        </div>
                        <input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleImageChange}
                        />
                        <button
                          type="button"
                          className="import-btn"
                          onClick={() => document.getElementById('imageUpload').click()}
                        >
                          Import Image
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="newCompanyDescription">Little description of it:</label>
                      <textarea
                        className="textarea"
                        id="newCompanyDescription"
                        rows={4}
                        value={newCompanyDescription}
                        onChange={(e) => setNewCompanyDescription(e.target.value)}
                        placeholder="Enter a short description"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="newCompanyCategory">Assign a category:</label>
                      <div className="dropdown-wrapper">
                        <button
                          type="button"
                          className="dropdown-button"
                          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        >
                          {category || "Select a category..."}
                        </button>
                        {showCategoryDropdown && (
                          <ul className="dropdown-list2">
                            {categories.length > 0 ? (
                              categories.map((cat) => (
                                <li
                                  className="dropdown-item2"
                                  key={cat.id}
                                  onClick={() => handleCategorySelect(cat)}
                                >
                                  {cat.name}
                                </li>
                              ))
                            ) : (
                              <li className="dropdown-item2">No categories available</li>
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label>Rate your experience:</label>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${rating >= star ? "selected" : ""}`}
                        onClick={() => handleStarClick(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title of your review:</label>
                  <input
                    className="input"
                    type="text"
                    id="title"
                    placeholder="Write your title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="details">Give us some details:</label>
                  <textarea
                    className="textarea"
                    id="details"
                    rows={4}
                    placeholder="What did you like/dislike, transparency is the key!"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
              {message && <div className="message">{message}</div>}
            </div>
          )}
        </div>
        <div className="rev-cont">
          {company && (
            <RecentReviews
              id={company}
              businessName={
                businesses.find((business) => business.id === company)?.name
              }
            />
          )}
        </div>
      </div>
    );
  }

}

export default ReviewForm;
