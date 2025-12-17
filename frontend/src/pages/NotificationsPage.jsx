import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getFriendRequests } from "../lib/api.js";

const NotificationsPage = () => {

  const queryClient = useQueryClient();

  const {data : friendRequests , isLoading} = useQuery({
    queryKey : ["friendRequests"],
    queryFn : getFriendRequests 
  })

  const {mutate : acceptRequestMutation , isPending} = useMutation({
    mutationFn : acceptFriendRequest,
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey : ["friendRequests"]})
      queryClient.invalidateQueries({queryKey : ["friends"]});
    }
  })

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];


  return (
    <div>NotificationsPage</div>
  )
}

export default NotificationsPage