
export default class User{
    public CompanyName?:string;
    public Images?: string[];
    public Icon?:string;
    public Description?:string;
    public LegalNature?:string;
    public LocationX?:string;
    public LocationY?:string;
    public LastAcessDate?:Date;
    public CNPJ?:string;
    public Address?:string;
    public Email?:string;
    public Id?:string;
    public Telefone?:string;
    
    constructor(data:any)
    {
        this.CompanyName = data.CompanyName;
        this.Images = data.Images;
        this.Icon = data.Icon;
        this.Description = data.Description;
        this.LegalNature = data.LegalNature;
        this.LocationX = data.LocationX;
        this.LocationY = data.LocationY;
        this.LastAcessDate = new Date(data.LastAccessDate);
        this.CNPJ = data.CNPJ;
        this.Address = data.Address;
        this.Email = data.Email;
        this.Id = data.Id; 
        this.Telefone=data.Telefone
    }
    
}