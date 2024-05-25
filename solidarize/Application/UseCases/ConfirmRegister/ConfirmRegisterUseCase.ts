import ConfirmRegisterRequest from "./ConfirmRegisterRequest";
import PostConfirmRegisterHandler from "./Handlers/PostConfirmRegisterHandler";
import IConfirmRegisterUseCase from "./IConfirmRegisterUseCase";

export default class ConfirmRegisterUseCase implements IConfirmRegisterUseCase{
    private handler: PostConfirmRegisterHandler;

    constructor(postRegisterCompanyHandler: PostConfirmRegisterHandler){
        this.handler=postRegisterCompanyHandler;
    }
    
    public async Execute(request: ConfirmRegisterRequest): Promise<void> {
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