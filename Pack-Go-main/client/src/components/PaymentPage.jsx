// import React, { useContext, useEffect } from "react";
// import { AppContext } from "./Context/AppContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import App from "../App";

// const PaymentPage = () => {
//   const {userData} = useContext(AppContext);
//   const navigate = useNavigate();
//   const token = JSON.parse(localStorage.getItem("token"));
//   const {paymentDetails,setPaymentDetails} = useContext(AppContext);
  
//   useEffect(() => {
//     const getPaymentDetails = async () => {
//       if (userData && token) {
//         try {
          
//           const response = await axios.get(
//             `http://localhost:6500/api/wishlist/${userData.user._id}`, // Pass userId dynamically
//             {
//               headers: {
//                 authorization: token ? `Bearer ${token}` : "",
//               },
//             }
//           );
//           console.log(userData);
//           setWishlist(response.data); 
//           console.log(response);
//           console.log(wishlist);
//         } catch (error) {
//           console.error(error);
//           toast.error("Error fetching wishlist");
//         }
//       } else {
//         setTimeout(() => {
//           navigate("/loginpage");
//         }, 1000);
//         toast.error("Please Login to retrieve wishlist");
//       }
//     };
//     getPaymentDetails();
//   }, [navigate, userData]);
//   return (
//     <div style={{margin:"80px"}}>
//       <h1>Payment Page</h1>
//       <p>Proceed with your booking.</p>
//     </div>
//   );
// };

// export default PaymentPage;


import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./Context/AppContext";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PaymentPage = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("token"));

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [travelers, setTravelers] = useState([{ name: "", age: "", gender: "" }]);
  const [contactDetails, setContactDetails] = useState({ phone: "", email: "" });
  const [travelDate, setTravelDate] = useState(new Date());

  useEffect(() => {
    const getSelectedPackage = async () => {
      if (userData && token) {
        try {
          const packageName = new URLSearchParams(location.search).get("destination");
          if (!packageName) {
            toast.error("No package selected!");
            navigate("/wishlist");
            return;
          }

          const response = await axios.get(`http://localhost:6500/api/wishlist/${userData.user._id}`, {
            headers: { authorization: token ? `Bearer ${token}` : "" },
          });

          const packageData = response.data.Tours.find((tour) => tour.place === packageName);
          if (!packageData) {
            toast.error("Package not found!");
            navigate("/wishlist");
            return;
          }

          setSelectedPackage(packageData);
        } catch (error) {
          console.error(error);
          toast.error("Error fetching package details");
        }
      } else {
        setTimeout(() => {
          navigate("/loginpage");
        }, 1000);
        toast.error("Please Login to proceed with payment");
      }
    };

    getSelectedPackage();
  }, [navigate, userData, location.search]);

  const handleAddTraveler = () => {
    setTravelers([...travelers, { name: "", age: "", gender: "" }]);
  };

  const handleTravelerChange = (index, field, value) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index][field] = value;
    setTravelers(updatedTravelers);
  };

  const handleSubmit = async () => {
    if (!contactDetails.phone || !contactDetails.email) {
      toast.error("Please enter contact details!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:6500/api/bookings",
        {
          userId: userData.user._id,
          package: selectedPackage,
          travelers,
          contactDetails,
          travelDate,
        },
        {
          headers: { authorization: token ? `Bearer ${token}` : "" },
        }
      );

      toast.success("Booking successful!");
      navigate("/confirmation");
    } catch (error) {
      console.error(error);
      toast.error("Booking failed!");
    }
  };

  return (
    <div style={{ margin: "80px" }}>
      <h1>Payment Page</h1>
      {selectedPackage ? (
        <div>
          <h2>Booking for: {selectedPackage.place}</h2>
          <img src={selectedPackage.image} alt={selectedPackage.place} style={{ width: "200px", height: "150px" }} />
          <p>Price: {selectedPackage.money}</p>
          
          <h3>Traveler Details</h3>
          {travelers.map((traveler, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Name"
                value={traveler.name}
                onChange={(e) => handleTravelerChange(index, "name", e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={traveler.age}
                onChange={(e) => handleTravelerChange(index, "age", e.target.value)}
                required
              />
              <select
                value={traveler.gender}
                onChange={(e) => handleTravelerChange(index, "gender", e.target.value)}
                required
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          ))}
          <button onClick={handleAddTraveler} style={{ marginBottom: "10px" }}>+ Add Traveler</button>

          <h3>Contact Details</h3>
          <input
            type="text"
            placeholder="Phone Number"
            value={contactDetails.phone}
            onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={contactDetails.email}
            onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
            required
          />

          <h3>Travel Date</h3>
          <DatePicker
            selected={travelDate}
            onChange={(date) => setTravelDate(date)}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
          />

          <button onClick={handleSubmit} style={{ marginTop: "20px", backgroundColor: "green", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
            Proceed to Payment
          </button>
        </div>
      ) : (
        <p>Loading package details...</p>
      )}
    </div>
  );
};

export default PaymentPage;