import {StreamChat} from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

if(!apiKey || !apiSecret)
{
    console.error("Stream API key or Secret is Missing");
}

const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("Error Upserting Stream User: " , error);
    }
}

export const generateStreamToken = async (userId) => {
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);

    } catch (error) {
        console.log("Error in Generating Stream Token : ",error);
    }
}