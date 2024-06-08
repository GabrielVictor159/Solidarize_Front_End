import axios from "axios";
import Handler from "../../Handlers";
import GetOngsRequest from "../GetOngsRequest";
import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";
import OngMap from "@/Domain/Model/Map/OngMap";

export default class GetOngsHandler extends Handler<GetOngsRequest>{
    public async ProcessRequest(request: GetOngsRequest): Promise<void> {
        request.AddLog("Process reached GetOngsUseCase GetOngsHandler");

        let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
        const response = await axios.get(`${BACK_END_URL}/api/GetOngs`,{
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

        response.data.Companies.forEach((element: { id: string; icon: string; companyName: string; address: string; description: string; locationX: string; locationY: string; }) => {
            request.Ongs.push(new OngMap(element.id,element.icon,element.companyName, element.address,element.description,element.locationX, element.locationY));
        });

        if (this.sucessor) {
            await this.sucessor.ProcessRequest(request);
        }
    }

}