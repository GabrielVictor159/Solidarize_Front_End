import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";

export default class ConfirmRecoverPasswordRequest{
    constructor(idRequest:string, newPassword:string){
        this.$IdRequest= idRequest;
        this.$NewPassword=newPassword;
    }
    private IdRequest!: string;
    private NewPassword!: string;

    private Logs: string[] = [];
    private ApiBadResponse?: ApiBadResponse | undefined;

    public AddLog(log: string): void {
        this.Logs.push(log);
    }

    public get $IdRequest(): string {
        return this.IdRequest;
    }
    public set $IdRequest(value: string) {
        this.IdRequest = value;
    }
    public get $NewPassword(): string {
        return this.NewPassword;
    }
    public set $NewPassword(value: string) {
        this.NewPassword = value;
    }

    public get $ApiBadResponse(): ApiBadResponse | undefined {
        return this.ApiBadResponse;
    }
    public set $ApiBadResponse(value: ApiBadResponse | undefined) {
        this.ApiBadResponse = value;
    }
    public get $Logs(): string[] {
        return this.Logs;
    }
    public set $Logs(value: string[]) {
        this.Logs = value;
    }
    
}