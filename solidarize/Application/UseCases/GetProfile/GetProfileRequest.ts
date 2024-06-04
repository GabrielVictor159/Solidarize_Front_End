import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";
import User from "@/Domain/Model/Login/User";

export default class GetProfileRequest{
    constructor(id:string){
        this.Id=id;
    }
    private Id:string;
    private Profile?:User;
    private ApiBadResponse?: ApiBadResponse | undefined;
    private Logs: string[] = [];
    public AddLog(log: string): void {
        this.Logs.push(log);
    }
    
        /**
     * Getter $Profile
     * @return {User}
     */
	public get $Profile(): User | undefined {
		return this.Profile;
	}

    /**
     * Setter $Profile
     * @param {User} value
     */
	public set $Profile(value: User) {
		this.Profile = value;
	}
    /**
     * Getter $ApiBadResponse
     * @return {ApiBadResponse }
     */
	public get $ApiBadResponse(): ApiBadResponse |undefined  {
		return this.ApiBadResponse;
	}

    /**
     * Setter $ApiBadResponse
     * @param {ApiBadResponse } value
     */
	public set $ApiBadResponse(value: ApiBadResponse ) {
		this.ApiBadResponse = value;
	}

    /**
     * Getter $Id
     * @return {string}
     */
	public get $Id(): string {
		return this.Id;
	}

    /**
     * Getter $Logs
     * @return {string[] }
     */
	public get $Logs(): string[]  {
		return this.Logs;
	}

    /**
     * Setter $Id
     * @param {string} value
     */
	public set $Id(value: string) {
		this.Id = value;
	}

    /**
     * Setter $Logs
     * @param {string[] } value
     */
	public set $Logs(value: string[] ) {
		this.Logs = value;
	}

}