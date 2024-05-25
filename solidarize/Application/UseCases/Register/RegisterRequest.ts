import { LegalNature } from "@/Domain/Enum/LegalNature";
import ApiBadResponse from "@/Domain/Model/Api/ApiBadResponse";

export default class RegisterRequest {
    public CompanyName: string;
    public Description: string;
    public LegalNature: string;
    public LocationX: number;
    public LocationY: number;
    public CNPJ: string;
    public Address: string;
    public Telefone: string;
    public Email: string;
    public Password: string;
    public Logs: string[] = [];
    public ApiBadResponse?: ApiBadResponse | undefined;

    public AddLog(log: string): void {
        this.Logs.push(log);
    }
    constructor(
        companyName: string,
        description: string,
        legalNature: string,
        locationX: number,
        locationY: number,
        cnpj: string,
        address: string,
        telefone: string,
        email: string,
        password: string
    ) {
        this.CompanyName = companyName;
        this.Description = description;
        this.LegalNature = legalNature;
        this.LocationX = locationX;
        this.LocationY = locationY;
        this.CNPJ = cnpj;
        this.Address = address;
        this.Telefone = telefone;
        this.Email = email;
        this.Password = password;
    }
}