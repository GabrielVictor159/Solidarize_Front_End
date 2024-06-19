import ConfirmRecoverPasswordRequest from "./ConfirmRecoverPasswordRequest";
import PostNewPasswordHandler from "./Handlers/PostNewPasswordHandler";
import IConfirmRecoverPasswordUseCase from "./IConfirmRecoverPasswordUseCase";

export default class ConfirmRecoverPasswordUseCase implements IConfirmRecoverPasswordUseCase{
    
    private handler:PostNewPasswordHandler;

    constructor(postNewPasswordHandler: PostNewPasswordHandler){
        this.handler= postNewPasswordHandler;
    }

    public async Execute(request: ConfirmRecoverPasswordRequest): Promise<void> {
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