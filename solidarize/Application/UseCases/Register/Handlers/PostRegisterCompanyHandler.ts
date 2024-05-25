import axios from "axios";
import Handler from "../../Handlers";
import RegisterRequest from "../RegisterRequest";
import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";

export default class PostRegisterCompanyHandler extends Handler<RegisterRequest> {
    public async ProcessRequest(request: RegisterRequest): Promise<void> {
        request.AddLog("Process reached RegisterUseCase PostRegisterCompanyHandler");

        let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
        const response = await axios.post(`${BACK_END_URL}/api/RequestRegisterCompany`, {
            companyName: request.CompanyName,
            description: request.Description,
            legalNature: request.LegalNature,
            locationX: request.LocationX.toString(),
            locationY: request.LocationY.toString(),
            cnpj: request.CNPJ,
            address: request.Address,
            telefone: request.Telefone,
            email: request.Email,
            password: request.Password
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