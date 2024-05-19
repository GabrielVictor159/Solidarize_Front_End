
import LoginUseCase from "@/Application/UseCases/Login/LoginUseCase";
import { UseCasesEnum } from "../Enum/UseCasesEnum";
import GetTokenHandler from "@/Application/UseCases/Login/Handlers/GetTokenHandler";
import GetMyInformationHandler from "@/Application/UseCases/Login/Handlers/GetMyInformationHandler";

type UseCaseType = LoginUseCase | undefined;
export default class UseCaseFactory{
    public Resolve(useCase: UseCasesEnum) : UseCaseType{
        switch(useCase){
            case UseCasesEnum.Login:{
                return new LoginUseCase(new GetTokenHandler(), new GetMyInformationHandler());
            }
            default:{
                return undefined;
            }
        }
    }
}