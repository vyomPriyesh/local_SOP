import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (response = {}, msg = null) => {
  const toastConfig = { autoClose: 3000 };

  const success = response?.success ?? null; // Ensure undefined case handled
  const messageToShow =
    msg || // If msg is provided, show it
    response?.data?.message ||
    response?.message ||
    response?.error?.error_message ||
    response?.error?.message ||
    "Invalid credentials"; // Default message

  if (success) {
    toast.success(messageToShow, toastConfig);
  } else {
    toast.error(messageToShow, toastConfig);
  }
};
