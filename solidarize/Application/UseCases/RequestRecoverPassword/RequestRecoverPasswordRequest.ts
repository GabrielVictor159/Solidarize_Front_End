import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";

export default class RequestRecoverPasswordRequest{
    constructor(email:string){
        this.Email = email;
    }

    public Email: string;

    public Logs: string[] = [];
    public ApiBadResponse?: ApiBadResponse | undefined;

    public AddLog(log: string): void {
        this.Logs.push(log);
    }

}