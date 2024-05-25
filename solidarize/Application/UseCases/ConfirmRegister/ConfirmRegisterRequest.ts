import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";

export default class ConfirmRegisterRequest{
    constructor(id:string){
        this.Id=id;
    }
    public Id:string;
    public Logs: string[] = [];
    public ApiBadResponse?: ApiBadResponse | undefined;

    public AddLog(log: string): void {
        this.Logs.push(log);
    }
}