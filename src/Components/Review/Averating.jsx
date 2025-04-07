import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import listing_details_1 from "../../Images/avgrating.svg";
const Averating = ({ rating }) => {
    const formattedRating = !isNaN(parseFloat(rating)) ? parseFloat(rating).toFixed(2) : "0";

    // Generate stars based on rating
    const getStars = (rating) => {
      const stars = [];
      const fullStars = Math.floor(rating); // Full stars
      const hasHalfStar = rating % 1 !== 0; // Half star check
  
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          stars.push(<FaStar key={i} className="text-[#33BA33] text-[16px]" />);
        } else if (hasHalfStar && i === fullStars) {
          stars.push(<FaStarHalfAlt key={i} className="text-[#33BA33] text-[16px]" />);
        } else {
          stars.push(<FaRegStar key={i} className="text-gray-400 text-[16px]" />);
        }
      }
  
      return stars;
    };
    return (
      <div className="bg-[#1057A9] text-white rounded-[9px] p-3 flex items-center justify-between w-full">
        {/* Left Side: Text */}
        <div>
          <p className="text-[16px] font-medium">Average Rating</p>
          <p className="text-[20px] font-bold">{formattedRating}</p>
          <div className="flex justify-center gap-1 mt-2">{getStars(formattedRating)}</div>
        </div>
  
        {/* Right Side: Image */}
        <div className="w-[160px] h-[106px]">
          <img
            src={listing_details_1} // Local image
            alt="Reviews"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  };
  
  export default Averating;
  