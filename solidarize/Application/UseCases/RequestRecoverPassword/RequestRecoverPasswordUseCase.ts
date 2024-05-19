import Handler from "../Handlers";
import PostRecoverPasswordHandler from "./Handlers/PostRecoverPasswordHandler";
import IRequestRecoverPasswordUseCase from "./IRequestRecoverPasswordUseCase";
import RequestRecoverPasswordRequest from "./RequestRecoverPasswordRequest";

export default class RequestRecoverPasswordUseCase implements IRequestRecoverPasswordUseCase{
    private handler: Handler<RequestRecoverPasswordRequest>;

    constructor(postRecoverPasswordHandler: PostRecoverPasswordHandler){
        this.handler=postRecoverPasswordHandler;
    }
    
    public async Execute(request: RequestRecoverPasswordRequest): Promise<void> {
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