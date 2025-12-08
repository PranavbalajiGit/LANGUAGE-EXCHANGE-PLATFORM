import express from "express"
import { protectRoute } from "../middleware/auth.middleware";
import { getMyFriends, getRecommendedUsers, sendFriendRequest } from "../controllers/user.controller.js";

const router = express.Router();

//Here we need all the routes to be protected . So we use them directly.
router.use(protectRoute);

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id" , sendFriendRequest);

export default router;

