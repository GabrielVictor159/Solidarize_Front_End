import axios from "axios";
import Handler from "../../Handlers";
import ConfirmRegisterRequest from "../ConfirmRegisterRequest";
import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";

export default class PostConfirmRegisterHandler extends Handler<ConfirmRegisterRequest>{
    public async ProcessRequest(request: ConfirmRegisterRequest): Promise<void> {
        request.AddLog("Process reached ConfirmRegisterUseCase PostConfirmRegisterHandler");

        let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
        const response = await axios.post(`${BACK_END_URL}/api/ConfirmRegisterCompany`, {
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

        if (this.sucessor) {
            await this.sucessor.ProcessRequest(request);
        }
    }
}