import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";

export default class ConfirmRecoverPasswordRequest{
    constructor(idRequest:string, newPassword:string){
        this.IdRequest= idRequest;
        this.NewPassword=newPassword;
    }
    public IdRequest!: string;
    public NewPassword!: string;

    public Logs: string[] = [];
    public ApiBadResponse?: ApiBadResponse | undefined;

    public AddLog(log: string): void {
        this.Logs.push(log);
    }
}