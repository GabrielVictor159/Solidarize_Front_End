export default class OngMap{
    public Id: string;
    public Icon: string;
    public CompanyName: string;
    public Address: string;
    public Description: string;
    public LocationX: string;
    public LocationY: string;
    
    constructor(
        Id: string,
        Icon: string,
        CompanyName: string,
        Address: string,
        Description: string,
        LocationX: string,
        LocationY: string
      ) {
        this.Id = Id;
        this.Icon = Icon;
        this.CompanyName = CompanyName;
        this.Address = Address;
        this.Description = Description;
        this.LocationX = LocationX;
        this.LocationY = LocationY;
      }
    
}