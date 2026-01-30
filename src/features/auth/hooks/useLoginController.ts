import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { zod4Resolver } from "mantine-form-zod-resolver";

import { useNavigate } from "react-router-dom";
import { LoginDto, LoginSchema } from "../validation/login.schema";
import { useSiginIn } from "./authQuery";
import { setAuthSession } from "../../../utils/auth.storage";

export const useLoginController = () => {
  const navigate = useNavigate();

  const login = useSiginIn()

  const form = useForm<LoginDto>({
    initialValues: {
      username: "",
      password: "",
      rememberMe: true,
    },
    validate: zod4Resolver(LoginSchema)
  })

  const onSubmit = form.onSubmit(async (values) => {


    login.mutate(values, {
      onSuccess: (data) => {
        setAuthSession(data, values.rememberMe);
        notifications.show({ message: "Welcome back ✅",color:"green" });
         navigate("/", { replace: true });
      },
      onError: (e) => {
        console.log("error", e)
        notifications.show({
          message: e?.message || "Login failed. Please check your credentials.",
        });
      }
    })

  });


  return {
    navigate,
   onSubmit,
   loading:login.isPending,
   form
  }

}