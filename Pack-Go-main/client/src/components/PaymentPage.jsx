import React, { useContext, useEffect } from "react";
import { AppContext } from "./Context/AppContext";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const {userData} = useContext(AppContext);
  useEffect(()=>{
    if(!userData){
      toast.error("Please Login");
    }
  },[userData]);
  return (
    <div style={{margin:"80px"}}>
      <h1>Payment Page</h1>
      <p>Proceed with your booking.</p>
    </div>
  );
};

export default PaymentPage;