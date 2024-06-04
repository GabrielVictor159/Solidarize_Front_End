import GetProfileRequest from "./GetProfileRequest";

export default interface IGetProfileUseCase{
    Execute(request:GetProfileRequest):Promise<void>;
}