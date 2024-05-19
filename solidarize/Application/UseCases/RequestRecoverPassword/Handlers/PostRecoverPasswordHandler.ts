import Handler from "@/Application/UseCases/Handlers";
import RequestRecoverPasswordRequest from "../RequestRecoverPasswordRequest";
import axios from "axios";
import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";

export default class PostRecoverPasswordHandler extends Handler<RequestRecoverPasswordRequest>{
    public async ProcessRequest(request: RequestRecoverPasswordRequest): Promise<void> {
        request.AddLog("Process reached RecoverPasswordUseCase PostRecoverPasswordHandler");

        let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
        const response = await axios.post(`${BACK_END_URL}/api/RecoverPassword`, {
            Email: request.$Email
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            validateStatus: () => true
        })
        
        if (response.status >= 300 || response.status < 200) {
            if (response.status == 400) {
                let errors = response.data;
                let messagesErrors:any[] = [];
                errors.forEach((error:any) => {
                     messagesErrors.push(error.Message);
                 });
                request.$ApiBadResponse = new ApiBadResponse(response.status, messagesErrors);
            }
            else {
                request.$ApiBadResponse = new ApiBadResponse(response.status, [JSON.stringify(response.data)]);
            }
            return;
        }
        
        if (this.sucessor) {
            await this.sucessor.ProcessRequest(request);
        }
    }

}