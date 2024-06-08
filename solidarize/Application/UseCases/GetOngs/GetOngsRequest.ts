import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";
import OngMap from "@/Domain/Model/Map/OngMap";

export default class GetOngsRequest{

	constructor() {
	}

    public Ongs:OngMap[] = []
    public ApiBadResponse?: ApiBadResponse | undefined;
    public Logs: string[] = [];
    public AddLog(log: string): void {
        this.Logs.push(log);
    }
}