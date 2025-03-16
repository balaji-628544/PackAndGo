import React, { useContext, useEffect } from "react";
import { AppContext } from "./Context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import App from "../App";

const PaymentPage = () => {
  const {userData} = useContext(AppContext);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const {paymentDetails,setPaymentDetails} = useContext(AppContext);
  
  useEffect(() => {
    const getPaymentDetails = async () => {
      if (userData && token) {
        try {
          
          const response = await axios.get(
            `http://localhost:5000/api/wishlist/${userData.user._id}`, // Pass userId dynamically
            {
              headers: {
                authorization: token ? `Bearer ${token}` : "",
              },
            }
          );
          console.log(userData);
          setWishlist(response.data); 
          console.log(response);
          console.log(wishlist);
        } catch (error) {
          console.error(error);
          toast.error("Error fetching wishlist");
        }
      } else {
        setTimeout(() => {
          navigate("/loginpage");
        }, 1000);
        toast.error("Please Login to retrieve wishlist");
      }
    };
    getPaymentDetails();
  }, [navigate, userData]);
  return (
    <div style={{margin:"80px"}}>
      <h1>Payment Page</h1>
      <p>Proceed with your booking.</p>
    </div>
  );
};

export default PaymentPage;