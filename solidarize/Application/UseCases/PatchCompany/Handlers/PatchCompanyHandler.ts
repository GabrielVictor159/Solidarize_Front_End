import axios from "axios";
import Handler from "../../Handlers";
import PatchCompanyRequest from "../PatchCompanyRequest";
import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";

export default class PatchCompanyHandler extends Handler<PatchCompanyRequest>{
    
    public async ProcessRequest(request: PatchCompanyRequest): Promise<void> {
        request.AddLog("Process reached PatchCompanyUseCase PatchCompanyHandler");

        let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
        const response = await axios.patch(`${BACK_END_URL}/api/PatchCompany`, {
            companyName: request.$CompanyName,
            Images: request.$Images,
            Icon: request.$Icon,
            Description: request.$Description,
            LegalNature: request.$LegalNature,
            LocationX: request.$LocationX,
            LocationY: request.$LocationY,
            CNPJ: request.$CNPJ,
            Address: request.$Address,
            Telefone: request.$Telefone,
            Password: request.$Password
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": request.$token
            },
            validateStatus: () => true
        })
        console.log(request.$Images);
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
            return;
        }
        
        if (this.sucessor) {
            await this.sucessor.ProcessRequest(request);
        }
    }

}