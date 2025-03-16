
// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AppContext } from "../components/Context/AppContext";
// import { toast } from "react-toastify";

// const WishlistPage = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const navigate = useNavigate();
//   const { userData } = useContext(AppContext);

//   useEffect(() => {
//     const fetchWishlist = async () => {


//       if (userData) {
//         const token = userData.user.token;
//         const response = await axios.get("http://localhost:5000/api/wishlist", {
//           headers: {
//             authorization: token ? `Bearer ${token}` : "", // Add Authorization header
//           },
//         }).then((res) => console.log(res.data)).catch((err) => console.log(err));
//       } else {
//         setTimeout(() => {
//           navigate("/loginpage");
//         }, 1000);
//         toast.error("Please Login to retrive wishlist")
//       }

//     };
//     fetchWishlist();
//   }, [navigate]);

//   return (
//     <div style={{ margin: "80px" }}>
//   <h1>Your Wishlist</h1>
//   {userData?.wishlist?.length > 0 ? (
//     <ul>
//       {userData.wishlist.map((item, index) => (
//         <li key={index}>
//           <p>Place: {item.place}</p>
//           <p>Image: {item.image}</p>
//           <p>Price: {item.price}</p>
//         </li>
//       ))}
//     </ul>
//   ) : (
//     <p>No trips saved in your wishlist.</p>
//   )}
// </div>


//   );
// };



// export default WishlistPage;
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../components/Context/AppContext";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    const fetchWishlist = async () => {
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
    fetchWishlist();
  }, [navigate, userData]);

  // Function to remove an item from the wishlist
  const removeFromWishlist = async (place) => {
    try {
      const token = userData.user.token;
      await axios.delete(
        `http://localhost:5000/api/wishlist/remove/${userData.user._id}/${place}`,
        {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      // Update local state after removal
      setWishlist(wishlist.filter((item) => item.place !== place));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Error removing item");
    }
  };

  // Function to navigate to the booking page
  const bookNow = (place) => {
    navigate(`/payment?destination=${place}`);
  };

  return (
    <div style={{ margin: "80px" }}>
      <h1>Your Wishlist</h1>
      {wishlist?.length > 0 ? (
        <ul>
          {wishlist.map((item, index) => (
            <li key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              <img src={item.image} alt={item.place} style={{ width: "150px", height: "100px", objectFit: "cover" }} />
              <p><strong>Image:</strong> {item.image}</p>
              <p><strong>Place:</strong> {item.place}</p>
              <p><strong>Price:</strong> {item.money}</p>
              <button onClick={() => bookNow(item.place)} style={{ marginRight: "10px", backgroundColor: "green", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>Book Now</button>
              <button onClick={() => removeFromWishlist(item.place)} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No trips saved in your wishlist.</p>
      )}
    </div>
  );
};

export default WishlistPage;