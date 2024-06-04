import PatchCompanyRequest from "./PatchCompanyRequest";

export default interface IPatchCompanyUseCase{
    Execute(request:PatchCompanyRequest):Promise<void>;
}