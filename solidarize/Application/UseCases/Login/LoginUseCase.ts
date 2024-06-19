import Handler from "@/Application/UseCases/Handlers";
import GetTokenHandler from "./Handlers/GetTokenHandler";
import ILoginUseCase from "./ILoginUseCase";
import LoginRequest from "./LoginRequest";
import GetMyInformationHandler from "./Handlers/GetMyInformationHandler";

export default class LoginUseCase implements ILoginUseCase{
    private handler: Handler<LoginRequest>;

    constructor(getTokenHandler: GetTokenHandler, getMyInformation: GetMyInformationHandler){
        getTokenHandler.SetSucessor(getMyInformation);
        
        this.handler=getTokenHandler;
    }
    
    public async Execute(request:LoginRequest): Promise<void> {
        try{
            await this.handler.ProcessRequest(request);
        }
        catch(error: any){
            console.error('Erro capturado:', error.message);
        }
        finally{
            console.log(JSON.stringify(request.Logs));
        }
    }

}