// import { useSelector } from "react-redux";
// import ReactStars from "react-rating-stars-component";
import { RatingBarFilter } from "./RatingBarFilter";

export function RatingCard({ reviewsNumber, setReviewsFiltered }) {
  return (
    <div className="flex items-center justify-between  h-[300px]  w-3/4 m-auto ">
      <div className=" flex items-centergap-10 w-3/4">
        <div className="flex items-center p-5 w-full ">
          <div className="flex flex-col gap-2 min-w-48">
            <span className="text-7xl font-bold">
              4,3
            </span>
            {/* <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              value={useSelector((state) => state.rating.value)}
            /> */}
            <span>{reviewsNumber} reviews</span>
          </div>
          <RatingBarFilter setReviewsFiltered={setReviewsFiltered}/>
        </div>
      </div>
      <h2 className="p-20 text-4xl text-right font-bold font-montserrat leading-normal">
        Discover <br></br><span className="text-mygreen">YOWL</span> <br></br>Opinions
      </h2>
    </div>
  );
}
