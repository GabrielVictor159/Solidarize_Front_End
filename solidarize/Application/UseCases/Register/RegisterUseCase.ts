import IRegisterUseCase from "./IRegisterUseCase";
import RegisterRequest from "./RegisterRequest";
import PostRegisterCompanyHandler from './Handlers/PostRegisterCompanyHandler';

export default class RegisterUseCase implements IRegisterUseCase{

    private handler: PostRegisterCompanyHandler;

    constructor(postRegisterCompanyHandler: PostRegisterCompanyHandler){
        this.handler=postRegisterCompanyHandler;
    }
    
    public async Execute(request: RegisterRequest): Promise<void> {
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