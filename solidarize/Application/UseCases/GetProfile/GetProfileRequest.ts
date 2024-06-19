import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";
import User from "@/Domain/Model/Login/User";

export default class GetProfileRequest{
    constructor(id:string){
        this.Id=id;
    }
    public Id:string;
    public Profile?:User;
    public ApiBadResponse?: ApiBadResponse | undefined;
    public Logs: string[] = [];
    public AddLog(log: string): void {
        this.Logs.push(log);
    }
    
}