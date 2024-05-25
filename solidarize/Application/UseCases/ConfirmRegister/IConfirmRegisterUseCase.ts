import ConfirmRegisterRequest from "./ConfirmRegisterRequest";

export default interface IConfirmRegisterUseCase{
    Execute(request:ConfirmRegisterRequest):Promise<void>;
}