export default class ValidateItensItem {
    constructor(name: string, valid: boolean, message:string = "") {
        this.Name = name;
        this.Valid = valid;
        this.Message = message
    }
    public Name: string;
    public Valid: boolean;
    public Message: string | undefined;
}