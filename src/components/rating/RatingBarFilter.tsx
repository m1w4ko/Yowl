import { useState, useEffect } from "react";
import { BarFilter } from "./BarFilter";
import { IReviews } from "../../types/IReviews";

interface RatingBarFilterProps {
  setReviewsfilter: (reviews: IReviews[]) => void;
  reviews: IReviews[];
} 

export function RatingBarFilter({setReviewsfilter, reviews}: RatingBarFilterProps) {

  const [selectedRatings, setSelectedRatings] = useState([]);
  const [isChecked, setIschecked]=useState([])


  const total = reviews.length
  const count_1 = (reviews.filter(review => review.rating === 1).length/total)*100;
  const count_2 = (reviews.filter(review => review.rating === 2).length/total)*100;
  const count_3 = (reviews.filter(review => review.rating === 3).length/total)*100;
  const count_4 = (reviews.filter(review => review.rating === 4).length/total)*100;
  const count_5 = (reviews.filter(review => review.rating === 5).length/total)*100;

  // const handleReviews = (e) => {
  //   const rating = parseInt(e.currentTarget.name);
  //   const checked = e.target.checked;
  //   console.log(rating)

  //   if (checked) {
  //     const reviewsFilter = reviews.filter(review => review.rating === parseInt(rating));
  //     setReviewsfilter(reviewsFilter)
  //   } else {
  //     setReviewsfilter(reviews)
  //   }
  // };

  // const handleReviews = (e) => {
  //   const checked = e.target.checked;
  //   const rating = parseInt(e.target.name)

  //   if (checked) {
  //     setIschecked(prevState => {
  //       const updatedState = [...prevState, rating ];
  //       const reviewsFilter = reviews.filter(review => updatedState.includes(review.rating));
  //       setReviewsfilter(reviewsFilter);
  //       return updatedState;
  //     });

  //   } else {
  //     setIschecked(prevState => {
  //       const updatedState = prevState.filter(item => item !== rating);
  //       const reviewsFilter = reviews.filter(review => updatedState.includes(review.rating));
  //       reviewsFilter.length>0 ? setReviewsfilter(reviewsFilter) : setReviewsfilter(reviews)
  //       return updatedState;
  //     });
  //   }
  // };

  useEffect(() => {
    if (selectedRatings.length > 0) {
      const filteredReviews = reviews.filter((review: any) =>
        selectedRatings.includes(review.rating)
      );
      setReviewsfilter(filteredReviews);
    } else {
      setReviewsfilter(reviews);
    }
  }, [selectedRatings, reviews, setReviewsfilter]);

  // Gestion de la sélection des notes
  const handleReviews = (e: any) => {
    const rating = parseInt(e.target.name);
    const isChecked = e.target.checked;

    setSelectedRatings((prev: any) =>
      isChecked ? [...prev, rating] : prev.filter((item: any) => item !== rating)
    );
  };

  return (

    <div className="flex flex-col w-full gap-2">

      <BarFilter number='5' count={Math.round(count_5 * 10) / 10} handleReviews={handleReviews} />
      <BarFilter number='4' count={Math.round(count_4 * 10) / 10} handleReviews={handleReviews} />
      <BarFilter number='3' count={Math.round(count_3 * 10) / 10} handleReviews={handleReviews} />
      <BarFilter number='2' count={Math.round(count_2 * 10) / 10} handleReviews={handleReviews} />
      <BarFilter number='1' count={Math.round(count_1 * 10) / 10} handleReviews={handleReviews} />

    </div>
  );
}
