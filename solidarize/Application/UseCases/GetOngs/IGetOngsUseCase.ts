import GetOngsRequest from "./GetOngsRequest";

export default interface IGetOngsUseCase{
    Execute(request:GetOngsRequest):Promise<void>;
}