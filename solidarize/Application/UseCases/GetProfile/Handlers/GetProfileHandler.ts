import axios from "axios";
import Handler from "../../Handlers";
import GetProfileRequest from "../GetProfileRequest";
import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";
import User from "@/Domain/Model/Login/User";

export default class GetProfileHandler extends Handler<GetProfileRequest>{
    public async ProcessRequest(request: GetProfileRequest): Promise<void> {
        request.AddLog("Process reached GetProfileUseCase GetProfileHandler");

        let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
        const response = await axios.post(`${BACK_END_URL}/api/GetProfile`, {
            Id:request.Id
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            validateStatus: () => true
        })

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
            return;
        }

        request.Profile = new User(response.data);
        if (this.sucessor) {
            await this.sucessor.ProcessRequest(request);
        }
    }
    
}