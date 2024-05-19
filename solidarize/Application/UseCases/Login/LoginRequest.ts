import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";
import LoginResponse from "@/Domain/Model/Login/LoginResponse";

export default class LoginRequest {
    constructor(Email: string, Password: string) {
        this.Email = Email
        this.Password = Password
    }
    private Email: string;
    private Password: string;
    private LoginResponse: LoginResponse = new LoginResponse();
    private ApiBadResponse?: ApiBadResponse | undefined;

    private Logs: string[] = [];

    public AddLog(log: string): void {
        this.Logs.push(log);
    }
    /**
     * Getter $Email
     * @return {string}
     */
	public get $Email(): string {
		return this.Email;
	}

    /**
     * Getter $Password
     * @return {string}
     */
	public get $Password(): string {
		return this.Password;
	}

    /**
     * Getter $Logs
     * @return {string[]}
     */
	public get $Logs(): string[] {
		return this.Logs;
	}

    /**
     * Setter $Email
     * @param {string} value
     */
	public set $Email(value: string) {
		this.Email = value;
	}

    /**
     * Setter $Password
     * @param {string} value
     */
	public set $Password(value: string) {
		this.Password = value;
	}

    /**
     * Setter $Logs
     * @param {string[]} value
     */
	public set $Logs(value: string[]) {
		this.Logs = value;
	}

    public get $LoginResponse(): LoginResponse {
        return this.LoginResponse;
    }
    public set $LoginResponse(value: LoginResponse) {
        this.LoginResponse = value;
    }
    public get $ApiBadResponse(): ApiBadResponse | undefined {
        return this.ApiBadResponse;
    }
    public set $ApiBadResponse(value: ApiBadResponse | undefined) {
        this.ApiBadResponse = value;
    }
    
}