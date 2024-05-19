import RequestRecoverPasswordRequest from "./RequestRecoverPasswordRequest";

export default interface IRequestRecoverPasswordUseCase{
    Execute(request:RequestRecoverPasswordRequest):Promise<void>;
}