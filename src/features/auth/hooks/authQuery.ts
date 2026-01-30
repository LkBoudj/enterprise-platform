import { useMutation } from "@tanstack/react-query";
import { LoginDto } from "../validation/login.schema";
import { authService } from "../services/auth.service";

export const useSiginIn = ()=>{
  return useMutation({
    mutationKey:["login"],
    mutationFn:(dto:LoginDto)=> authService.login(dto)
  })
}