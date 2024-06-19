import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";
import LoginResponse from "@/Domain/Model/Login/LoginResponse";

export default class LoginRequest {
    constructor(Email: string, Password: string) {
        this.Email = Email
        this.Password = Password
    }
    public Email: string;
    public Password: string;
    public LoginResponse: LoginResponse = new LoginResponse();
    public ApiBadResponse?: ApiBadResponse | undefined;

    public Logs: string[] = [];

    public AddLog(log: string): void {
        this.Logs.push(log);
    }
    
}