
// All the functions here get executed after protectRoute. So req.user defined inside that function is used here.

import { messageSetPagination } from "stream-chat/dist/types/utils";
import User from "../models/User.js";

export async function getRecommendedUsers(req , res) {
    try {
        
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUser = await User.find({
            $and : [
                {_id : {$ne : currentUserId}}, // Exclude the Current User
                {$id : {$nin : currentUser.friends}}, // Exclude the friends in recommendation
                {isOnboarded : true}
            ]
        })
        
        res.status(200).json(recommendedUser);

    } catch (error) {
        console.error("Error in Get Recommendation User : " , error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export async function getMyFriends(req , res) {

}
