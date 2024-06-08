import Handler from "../Handlers";
import GetOngsRequest from "./GetOngsRequest";
import GetOngsHandler from "./Handlers/GetOngsHandler";
import IGetOngsUseCase from "./IGetOngsUseCase";

export default class GetOngsUseCase implements IGetOngsUseCase{
    private handler: Handler<GetOngsRequest>;

    constructor(getProfileHandler:GetOngsHandler){
        this.handler = getProfileHandler;
    }
    public async Execute(request: GetOngsRequest): Promise<void> {
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