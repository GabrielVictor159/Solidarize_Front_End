import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";
import User from "@/Domain/Model/Login/User";

export default class PatchCompanyRequest {
    public Images:string[] | undefined;
    public Icon:string | undefined | undefined;
    public CompanyName:string | undefined;
    public Description:string | undefined;
    public LegalNature:string | undefined;
    public LocationX:string | undefined;
    public LocationY:string | undefined;
    public CNPJ:string | undefined;
    public Address:string | undefined;
    public Telefone:string | undefined;
    public Password:string | undefined;
    public Logs:string[] = [];
    public ApiBadResponse: ApiBadResponse | undefined;
    public token?: string;
    public UserInformation?:User;

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
}