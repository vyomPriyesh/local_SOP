import listing_details_1 from "../../Images/totalreview.svg";
const TotalReviewsCard = ({ totalReviews }) => {
    return (
      <div className="bg-[#1079E0] text-white rounded-[9px] p-3 flex items-center justify-between w-full ">
        {/* Left Side: Text */}
        <div>
          <p className="text-[16px] font-medium">Total Reviews</p>
          <p className="text-[20px] font-bold">{totalReviews}</p>
        </div>
  
        {/* Right Side: Image */}
        <div className="w-[168px] h-[106px]">
          <img
            src={listing_details_1} // Local image
            alt="Reviews"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  };
  
  export default TotalReviewsCard;
  