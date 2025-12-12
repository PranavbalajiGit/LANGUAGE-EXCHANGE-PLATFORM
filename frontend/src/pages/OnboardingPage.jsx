import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api.js";

const OnboardingPage = () => {

  const {authUser} = useAuthUser();
  const queryClient = useQueryClient();


  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const {mutate : onboardingMutation , isPending} = useMutation({
    mutationFn : completeOnboarding,
    onSuccess: () => {
      toast.success("Profile Onboarding Successful");
      queryClient.invalidateQueries({queryKey : ["authUser"]});
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  }

  return (
    <div>OnboardingPage</div>
  )
}

export default OnboardingPage