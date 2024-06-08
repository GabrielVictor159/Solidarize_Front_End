
import LoginUseCase from "@/Application/UseCases/Login/LoginUseCase";
import { UseCasesEnum } from "../Enum/UseCasesEnum";
import GetTokenHandler from "@/Application/UseCases/Login/Handlers/GetTokenHandler";
import GetMyInformationHandler from "@/Application/UseCases/Login/Handlers/GetMyInformationHandler";
import RequestRecoverPasswordUseCase from "@/Application/UseCases/RequestRecoverPassword/RequestRecoverPasswordUseCase";
import PostRecoverPasswordHandler from "@/Application/UseCases/RequestRecoverPassword/Handlers/PostRecoverPasswordHandler";
import ConfirmRecoverPasswordUseCase from "@/Application/UseCases/ConfirmRecoverPassword/ConfirmRecoverPasswordUseCase";
import PostNewPasswordHandler from "@/Application/UseCases/ConfirmRecoverPassword/Handlers/PostNewPasswordHandler";
import PostRegisterCompanyHandler from "@/Application/UseCases/Register/Handlers/PostRegisterCompanyHandler";
import RegisterUseCase from "@/Application/UseCases/Register/RegisterUseCase";
import ConfirmRegisterUseCase from "@/Application/UseCases/ConfirmRegister/ConfirmRegisterUseCase";
import PostConfirmRegisterHandler from "@/Application/UseCases/ConfirmRegister/Handlers/PostConfirmRegisterHandler";
import PatchCompanyUseCase from "@/Application/UseCases/PatchCompany/PatchCompanyUseCase";
import PatchCompanyHandler from "@/Application/UseCases/PatchCompany/Handlers/PatchCompanyHandler";
import GetMyInformationHandlerPathCompany from "@/Application/UseCases/PatchCompany/Handlers/GetMyInformationHandler";
import GetProfileUseCase from "@/Application/UseCases/GetProfile/GetProfileUseCase";
import GetProfileHandler from "@/Application/UseCases/GetProfile/Handlers/GetProfileHandler";
import GetOngsUseCase from "@/Application/UseCases/GetOngs/GetOngsUseCase";
import GetOngsHandler from "@/Application/UseCases/GetOngs/Handlers/GetOngsHandler";

export default class UseCaseFactory{
    public Resolve(useCase: UseCasesEnum) : any{
        switch(useCase){
            case UseCasesEnum.Login:{
                return new LoginUseCase(new GetTokenHandler(), new GetMyInformationHandler());
            }
            case UseCasesEnum.RequestRecoverPasswordUseCase:{
                return new RequestRecoverPasswordUseCase(new PostRecoverPasswordHandler());
            }
            case UseCasesEnum.ConfirmRecoverPasswordUseCase:{
                return new ConfirmRecoverPasswordUseCase(new PostNewPasswordHandler());
            }
            case UseCasesEnum.RegisterCompany:{
                return new RegisterUseCase(new PostRegisterCompanyHandler());
            }
            case UseCasesEnum.ConfirmRegisterCompany:{
                return new ConfirmRegisterUseCase(new PostConfirmRegisterHandler());
            }
            case UseCasesEnum.PatchCompany:{
                return new PatchCompanyUseCase(new PatchCompanyHandler(), new GetMyInformationHandlerPathCompany());
            }
            case UseCasesEnum.GetProfile:{
                return new GetProfileUseCase(new GetProfileHandler());
            }
            case UseCasesEnum.GetOngs:{
                return new GetOngsUseCase(new GetOngsHandler());
            }
            default:{
                return undefined;
            }
        }
    }
    
}