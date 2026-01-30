import { UserType } from "../validation/user.schema";

export interface UserApiResponse {
    users: UserType[];
    total: number;
    skip: number;
    limit: number;


}