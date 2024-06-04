import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";
import User from "@/Domain/Model/Login/User";

export default class PatchCompanyRequest {
    private Images:string[] | undefined;
    private Icon:string | undefined | undefined;
    private CompanyName:string | undefined;
    private Description:string | undefined;
    private LegalNature:string | undefined;
    private LocationX:string | undefined;
    private LocationY:string | undefined;
    private CNPJ:string | undefined;
    private Address:string | undefined;
    private Telefone:string | undefined;
    private Password:string | undefined;
    private Logs:string[] = [];
    private ApiBadResponse: ApiBadResponse | undefined;
    private token?: string;
    private UserInformation?:User;

    public AddLog(log:string): void {
        this.Logs.push(log);
    }

    constructor(
        Icon:string | undefined,
        CompanyName:string | undefined | undefined,
        Description:string | undefined,
        LegalNature:string | undefined,
        LocationX:string | undefined,
        LocationY:string | undefined,
        CNPJ:string | undefined,
        Address:string | undefined,
        Telefone:string | undefined,
        Password:string | undefined
    ) {
        this.Icon = Icon
        this.CompanyName = CompanyName
        this.Description = Description
        this.LegalNature = LegalNature
        this.LocationX = LocationX
        this.LocationY = LocationY
        this.CNPJ = CNPJ
        this.Address = Address
        this.Telefone = Telefone
        this.Password = Password

    }


        /**
     * Getter $UserInformation
     * @return {User}
     */
	public get $UserInformation(): User | undefined {
		return this.UserInformation;
	}

    /**
     * Setter $UserInformation
     * @param {User} value
     */
	public set $UserInformation(value: User) {
		this.UserInformation = value;
	}
    /**
     * Getter $Images
     * @return {string[] }
     */
	public get $Images():string[] | undefined  {
		return this.Images;
	}

    /**
     * Getter $Icon
     * @return {string}
     */
	public get $Icon():string | undefined {
		return this.Icon;
	}

    /**
     * Getter $CompanyName
     * @return {string}
     */
	public get $CompanyName():string | undefined {
		return this.CompanyName;
	}

    /**
     * Getter $Description
     * @return {string}
     */
	public get $Description():string | undefined {
		return this.Description;
	}

    /**
     * Getter $LegalNature
     * @return {string}
     */
	public get $LegalNature():string | undefined {
		return this.LegalNature;
	}

    /**
     * Getter $LocationX
     * @return {string}
     */
	public get $LocationX():string | undefined {
		return this.LocationX;
	}

    /**
     * Getter $LocationY
     * @return {string}
     */
	public get $LocationY():string | undefined {
		return this.LocationY;
	}

    /**
     * Getter $CNPJ
     * @return {string}
     */
	public get $CNPJ():string | undefined {
		return this.CNPJ;
	}

    /**
     * Getter $Address
     * @return {string}
     */
	public get $Address():string | undefined {
		return this.Address;
	}

    /**
     * Getter $Telefone
     * @return {string}
     */
	public get $Telefone():string | undefined {
		return this.Telefone;
	}

    /**
     * Getter $Password
     * @return {string}
     */
	public get $Password():string | undefined {
		return this.Password;
	}

    /**
     * Getter $Logs
     * @return {string[] }
     */
	public get $Logs():string[]  {
		return this.Logs;
	}

    /**
     * Getter $ApiBadResponse
     * @return {ApiBadResponse }
     */
	public get $ApiBadResponse(): ApiBadResponse | undefined  {
		return this.ApiBadResponse;
	}

    /**
     * Setter $Images
     * @param {string[] } value
     */
	public set $Images(value:string[] | undefined ) {
		this.Images = value;
	}

    /**
     * Setter $Icon
     * @param {string} value
     */
	public set $Icon(value:string | undefined) {
		this.Icon = value;
	}

    /**
     * Setter $CompanyName
     * @param {string} value
     */
	public set $CompanyName(value:string | undefined) {
		this.CompanyName = value;
	}

    /**
     * Setter $Description
     * @param {string} value
     */
	public set $Description(value:string | undefined) {
		this.Description = value;
	}

    /**
     * Setter $LegalNature
     * @param {string} value
     */
	public set $LegalNature(value:string | undefined) {
		this.LegalNature = value;
	}

    /**
     * Setter $LocationX
     * @param {string} value
     */
	public set $LocationX(value:string | undefined) {
		this.LocationX = value;
	}

    /**
     * Setter $LocationY
     * @param {string} value
     */
	public set $LocationY(value:string | undefined) {
		this.LocationY = value;
	}

    /**
     * Setter $CNPJ
     * @param {string} value
     */
	public set $CNPJ(value:string | undefined) {
		this.CNPJ = value;
	}

    /**
     * Setter $Address
     * @param {string} value
     */
	public set $Address(value:string | undefined) {
		this.Address = value;
	}

    /**
     * Setter $Telefone
     * @param {string} value
     */
	public set $Telefone(value:string | undefined) {
		this.Telefone = value;
	}

    /**
     * Setter $Password
     * @param {string} value
     */
	public set $Password(value:string | undefined) {
		this.Password = value;
	}

    /**
     * Setter $Logs
     * @param {string[] } value
     */
	public set $Logs(value:string[] ) {
		this.Logs = value;
	}

    /**
     * Setter $ApiBadResponse
     * @param {ApiBadResponse } value
     */
	public set $ApiBadResponse(value: ApiBadResponse ) {
		this.ApiBadResponse = value;
	}

        /**
     * Getter $token
     * @return {string}
     */
	public get $token(): string | undefined {
		return this.token;
	}

    /**
     * Setter $token
     * @param {string} value
     */
	public set $token(value: string) {
		this.token = value;
	}
}