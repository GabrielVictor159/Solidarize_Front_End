import axios from 'axios';
import Handler from "@/Application/UseCases/Handlers";
import ApiBadResponse from '@/Domain/Model/Api/ApiBadResponse';
import { json } from 'stream/consumers';
import User from '@/Domain/Model/Login/User';
import PatchCompanyRequest from '../PatchCompanyRequest';

export default class GetMyInformationHandler extends Handler<PatchCompanyRequest> {

    public async ProcessRequest(request: PatchCompanyRequest): Promise<void> {
        request.AddLog("Process reached LoginUseCase GetMyInformationHandler");
        let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
        const response = await axios.get(`${BACK_END_URL}/api/GetMyInformation`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${request.$token}`
            },
            validateStatus: () => true
        })
        request.$UserInformation = new User(response.data);
        if (response.status >= 300 || response.status < 200) {
            if (response.status == 400) {
                let errors = response.data;
                let messagesErrors: any[] = [];
                errors.forEach((error: any) => {
                    messagesErrors.push(error.Message);
                });
                request.$ApiBadResponse = new ApiBadResponse(response.status, messagesErrors);
            }
            else {
                request.$ApiBadResponse = new ApiBadResponse(response.status, [JSON.stringify(response.data)]);
            }
        }
        if (this.sucessor) {
            await this.sucessor.ProcessRequest(request);
        }
    }

}
