const express = require("express");
const router = express.Router();
const WishList = require("../models/WishList");
const {protect} = require("../middleware/authenticateUser"); // Middleware to check if user is authenticated

// Add a package to the wishlist
router.post("/add", protect, async (req, res) => {
    try {
       
        console.log(req.body);
        const userId = req.user._id;
        const {place,image,price} = req.body;
        let userWishlist = await WishList.findOne({ userId });

        if (!userWishlist) {
            userWishlist = new WishList({ userId, Tours: [] });
        }
       
        // Check if the package already exists in the wishlist
        const exists = userWishlist.Tours.some(tour => tour.place === place);
        if (exists) {
            return res.status(400).json({ message: "Tour already exists in wishlist" });
        }
        console.log(userId);
        userWishlist.Tours.push({ place, image, price });

        await userWishlist.save();
        res.status(201).json({ message: "Tour added to wishlist", wishlist: userWishlist });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// router.get("/:place",protect,async (req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })

// Get user's wishlist
router.get("/:userId", protect, async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);
        const userWishlist = await WishList.findOne({ userId });
        
        if (!userWishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        console.log(userWishlist);
        res.status(200).json(userWishlist.Tours);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Remove an item from the wishlist
router.delete("/remove/:userId/:place", protect, async (req, res) => {
    try {
        const { userId, place } = req.params;

        let userWishlist = await WishList.findOne({ userId });

        if (!userWishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        userWishlist.Tours = userWishlist.Tours.filter(tour => tour.place !== place);

        await userWishlist.save();
        res.status(200).json({ message: "Tour removed from wishlist", wishlist: userWishlist });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;