import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/whishlist/add';


export const uploadData = async (newItem, token,setUserData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/wishList`,
      newItem,
      {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      }
    );

    console.log('Data uploaded:', response.data);

    

    setUserData(prevData => ({
      ...prevData,
      wishlist: response.data.wishlist || [] 
    }));

    return response.data;
  } catch (error) {
    console.error('Error uploading data:', error);
    throw error;
  }
 };

// export const AddwishListData = (newItem,setUserData)=>{
  
//   setUserData((prev) => {
//     const wishlist = Array.isArray(prev.wishlist) ? prev.wishlist : [];

//     // Check if the item already exists in the wishlist
//     const isAlreadyInWishlist = wishlist.some(
//       (item) => item.image === newItem.image && item.price === newItem.price
//     );  

//     if (isAlreadyInWishlist) {
//       console.log("Item already exists in wishlist");
//       return prev; // Return previous state if already present
//     }

//     return {
//       ...prev,
//       wishlist: [...wishlist, newItem], // Add only if not present
//     };
//   });
// }

export const AddwishListData = (newItem, setUserData) => {
  let updatedState;

  setUserData((prev) => {
    const wishlist = Array.isArray(prev?.wishlist) ? prev.wishlist : [];

    const isAlreadyInWishlist = wishlist.some(
      (item) => item.image === newItem.image && item.price === newItem.price
    );

    if (isAlreadyInWishlist) {
      console.log("Item already exists in wishlist");
      updatedState = prev; // Store the updated state
      return prev;
    }

    updatedState = {
      ...prev,
      wishlist: [...wishlist, newItem],
    };

    return updatedState;
  });

  return updatedState; // ✅ Return the updated state manually
};
