import { useNavigate } from "react-router";

const Button = () => {
  const navigate = useNavigate();
  return (
    <button
      className=" text-white  px-2 py-1 rounded-lg text-[14px] sm:text-[16px] sm:px-4 sm:py-2 lg:px-2 xl:px-4 "
      onClick={() => navigate("/Signin")}
      style={{
        backgroundColor: "var(--primary-color)", // Sirf text jitni width ke liye
        display: "inline-block", // Jitna text hoga utni hi width hogi
      }}
    >
      Sign In
    </button>
  );
};

export default Button;
