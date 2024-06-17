import User from "../Login/User";

export default class Shipping{
    public CreationDate?: string;
    public IdUserCreation?: string;
    public IdUserResponse?: string;
    public Description?: string;
    public Name?: string;
    public Id?: string;

    constructor(data:any)
    {
        this.CreationDate = data.CreationDate;
        this.IdUserCreation = data.IdUserCreation;
        this.IdUserResponse = data.IdUserResponse;
        this.Description = data.Description;
        this.Name = data.Name;
        this.Id = data.Id;
    }
    
    public UserCreation?: User;
    public UserResponse?: User;
}