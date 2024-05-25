import RegisterRequest from "./RegisterRequest";

export default interface IRegisterUseCase{
    Execute(request:RegisterRequest):Promise<void>;
}