import IPatchCompanyUseCase from "./IPatchCompanyUseCase";
import PatchCompanyRequest from "./PatchCompanyRequest";
import PatchCompanyHandler from './Handlers/PatchCompanyHandler';
import GetMyInformationHandler from "./Handlers/GetMyInformationHandler";

export default class PatchCompanyUseCase implements IPatchCompanyUseCase{
    private handler: PatchCompanyHandler;
    constructor(
        patchCompanyHandler: PatchCompanyHandler,
        getMyInformationHandler: GetMyInformationHandler
    ) {
        patchCompanyHandler.SetSucessor(getMyInformationHandler);
        this.handler= patchCompanyHandler;
    }
    public async Execute(request: PatchCompanyRequest): Promise<void> {
        try{
            await this.handler.ProcessRequest(request);
        }
        catch(error: any){
            console.error('Erro capturado:', error.message);
        }
        finally{
            console.log(JSON.stringify(request.$Logs));
        }
    }

}