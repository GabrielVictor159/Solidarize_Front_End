
import LoginUseCase from "@/Application/UseCases/Login/LoginUseCase";
import { UseCasesEnum } from "../Enum/UseCasesEnum";
import GetTokenHandler from "@/Application/UseCases/Login/Handlers/GetTokenHandler";
import GetMyInformationHandler from "@/Application/UseCases/Login/Handlers/GetMyInformationHandler";
import RequestRecoverPasswordUseCase from "@/Application/UseCases/RequestRecoverPassword/RequestRecoverPasswordUseCase";
import PostRecoverPasswordHandler from "@/Application/UseCases/RequestRecoverPassword/Handlers/PostRecoverPasswordHandler";

export default class UseCaseFactory{
    public Resolve(useCase: UseCasesEnum) : any{
        switch(useCase){
            case UseCasesEnum.Login:{
                return new LoginUseCase(new GetTokenHandler(), new GetMyInformationHandler());
            }
            case UseCasesEnum.RequestRecoverPasswordUseCase:{
                return new RequestRecoverPasswordUseCase(new PostRecoverPasswordHandler());
            }
            default:{
                return undefined;
            }
        }
    }
    
}