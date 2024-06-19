import Handler from "../Handlers";
import GetProfileRequest from "./GetProfileRequest";
import GetProfileHandler from "./Handlers/GetProfileHandler";
import IGetProfileUseCase from "./IGetProfileUseCase";

export default class GetProfileUseCase implements IGetProfileUseCase{
    private handler: Handler<GetProfileRequest>;

    constructor(getProfileHandler:GetProfileHandler){
        this.handler = getProfileHandler;
    }
    public async Execute(request: GetProfileRequest): Promise<void> {
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