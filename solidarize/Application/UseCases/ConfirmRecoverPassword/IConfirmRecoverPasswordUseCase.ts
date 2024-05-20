import ConfirmRecoverPasswordRequest from "./ConfirmRecoverPasswordRequest";

export default interface IConfirmRecoverPasswordUseCase{
    Execute(request:ConfirmRecoverPasswordRequest):Promise<void>;
}