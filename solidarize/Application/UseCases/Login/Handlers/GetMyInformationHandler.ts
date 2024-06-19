import axios from 'axios';
import Handler from "@/Application/UseCases/Handlers";
import LoginRequest from "../LoginRequest";
import ApiBadResponse from '@/Domain/Model/Api/ApiBadResponse';
import { json } from 'stream/consumers';
import User from '@/Domain/Model/Login/User';

export default class GetMyInformationHandler extends Handler<LoginRequest> {

    public async ProcessRequest(request: LoginRequest): Promise<void> {
        request.AddLog("Process reached LoginUseCase GetMyInformationHandler");
        let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
        const response = await axios.get(`${BACK_END_URL}/api/GetMyInformation`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${request.LoginResponse.Token}`
            },
            validateStatus: () => true
        })
        request.LoginResponse.UserInformation = new User(response.data);
        if (response.status >= 300 || response.status < 200) {
            if (response.status == 400) {
                let errors = response.data;
                let messagesErrors: any[] = [];
                errors.forEach((error: any) => {
                    messagesErrors.push(error.Message);
                });
                request.ApiBadResponse = new ApiBadResponse(response.status, messagesErrors);
            }
            else {
                request.ApiBadResponse = new ApiBadResponse(response.status, [JSON.stringify(response.data)]);
            }
        }
        if (this.sucessor) {
            await this.sucessor.ProcessRequest(request);
        }
    }

}
