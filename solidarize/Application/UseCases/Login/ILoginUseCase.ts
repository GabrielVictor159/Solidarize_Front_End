
import LoginRequest from "./LoginRequest";

export default interface ILoginUseCase{
    Execute(request:LoginRequest):Promise<void>;
}