import { IHttpClient } from "@/core/network/http.types";
import { LoginDto } from "../validation/login.schema";
import { httpClient } from "@/core/network/axios.adapter";
import { LoginResponse } from "../../../utils/auth.storage";

export class AutheService {
    constructor(private readonly http: IHttpClient) { }

    async login(dto?: LoginDto):Promise<LoginResponse> {
        return this.http.post("/auth/login", dto)
    }

}

export const authService = new AutheService(httpClient)