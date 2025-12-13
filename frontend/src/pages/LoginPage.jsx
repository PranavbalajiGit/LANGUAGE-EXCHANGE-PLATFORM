import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api.js";

const LoginPage = () => {

  const [loginData , setLoginData] = useState({
    email : "",
    password : "",
  });

  const queryClient = useQueryClient();

  const {mutate : loginMutation , isPending , error} = useMutation({
    mutationFn : login,
    onSuccess: () => queryClient.invalidateQueries({queryKey : ["authUser"]}),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme = "forest">
      
    </div>
  )
}

export default LoginPage