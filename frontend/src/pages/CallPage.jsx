import { useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api.js";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader.jsx";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;


const CallPage = () => {

  const {id:callId} = useParams();
  const [client , setClient] = useState(null);
  const [call , setCall] = useState(null);
  const [isConnecting , setIsConnecting] = useState(true);

  const {authUser , isLoading} = useAuthUser();

  const {data : tokenData} = useQuery({
    queryKey : ["streamtoken"],
    queryFn : getStreamToken,
    enabled : !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if(!tokenData.token  || !authUser || !callId) return;

      try {
        console.log("Initializing Stream Video Client . . . ");

        const user = {
          id : authUser._id,
          name : authUser.fullName,
          image : authUser.profilePic,
        }

        const videoClient = new StreamVideoClient({
          apiKey : STREAM_API_KEY,
          user , 
          token : tokenData.token,
        })
        
        const callInstance = videoClient.call("default" , callId);
        await callInstance.join({create : true});
        console.log("Joined Call Successfully");

        setClient(videoClient);
        setCall(callInstance);

      } catch (error) {
        console.error("Error joining the call : ", error);
        toast.error("Could not join the call. Please try again!");
      }
      finally{
        setIsConnecting(false);
      }
    };

    initCall();
  } , [tokenData , authUser , callId]);

  if(isLoading || isConnecting) return <PageLoader />

  return (
    <div>CallPage</div>
  )
}
export default CallPage