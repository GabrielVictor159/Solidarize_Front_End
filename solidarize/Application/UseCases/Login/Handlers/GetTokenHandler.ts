import axios from 'axios';
import Handler from "@/Application/UseCases/Handlers";
import LoginRequest from "../LoginRequest";
import ApiBadResponse from '@/Domain/Model/Api/ApiBadResponse';

export default class GetTokenHandler extends Handler<LoginRequest> {

    public async ProcessRequest(request: LoginRequest): Promise<void> {
        request.AddLog("Process reached LoginUseCase GetTokenHandler");
        let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
        const response = await axios.post(`${BACK_END_URL}/api/Login`, {
            Email: request.Email,
            Password: request.Password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            validateStatus: () => true
        })
        request.LoginResponse.Token = response.data.token;
        if (response.status >= 300 || response.status < 200) {
            if (response.status == 400) {
                let errors = response.data;
                let messagesErrors:any[] = [];
                errors.forEach((error:any) => {
                     messagesErrors.push(error.Message);
                 });
                request.ApiBadResponse = new ApiBadResponse(response.status, messagesErrors);
            }
            else {
                request.ApiBadResponse = new ApiBadResponse(response.status, [JSON.stringify(response.data)]);
            }
            return;
        }
        if (this.sucessor) {
            await this.sucessor.ProcessRequest(request);
        }
    }

}
