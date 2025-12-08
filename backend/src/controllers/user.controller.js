
// All the functions here get executed after protectRoute. So req.user defined inside that function is used here.
import FriendRequest from "../models/FriendRequest.js";
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
    try {
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends" , "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in GetMyFriends Controller : ",error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export async function sendFriendRequest(req , res) {
    try {
        const myId = req.user.id;
        const {id : recipientId} = req.params;

        if(myId === recipientId)
        {
            res.status(400).json({message : "You can't send friend request to yourself"});
        }

        const recipient = await User.findById(recipientId);
        if(!recipient)
        {
            res.status(404).json({message : "Recipient Not found"});
        }

        //check if user already a friend
        if(recipient.friends.includes(myId))
        {
            res.status(400).json({message : "You are already friends with this user"});
        }

        //check if request alredy exists
        const existingRequest = await FriendRequest.findOne({
            $or : [
                {sender : myId , recipient : recipientId},
                {sender : recipientId , recipient : myId},
            ],
        })

        if(existingRequest)
        {
            res.status(400).json({message:"A friend request already exists between you and this user"});
        }

        const friendRequest = await FriendRequest.create({
            sender : myId,
            recipient : recipientId
        });

        res.status(201).json(friendRequest);

    } catch (error) {
        console.log("Error in Send FriendRequest Controller : ", error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
}
