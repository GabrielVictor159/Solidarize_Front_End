import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";

export default class RequestRecoverPasswordRequest{
    constructor(email:string){
        this.Email = email;
    }

    private Email: string;

    private Logs: string[] = [];
    private ApiBadResponse?: ApiBadResponse | undefined;

    public AddLog(log: string): void {
        this.Logs.push(log);
    }

    public get $ApiBadResponse(): ApiBadResponse | undefined {
        return this.ApiBadResponse;
    }
    public set $ApiBadResponse(value: ApiBadResponse | undefined) {
        this.ApiBadResponse = value;
    }
    public get $Email(): string {
        return this.Email;
    }
    public set $Email(value: string) {
        this.Email = value;
    }
    public get $Logs(): string[] {
        return this.Logs;
    }
    public set $Logs(value: string[]) {
        this.Logs = value;
    }
}