
export default class User{
    private CompanyName?:string;
    private Images?: string[];
    private Icon?:string;
    private Description?:string;
    private LegalNature?:string;
    private LocationX?:string;
    private LocationY?:string;
    private LastAcessDate?:Date;
    private CNPJ?:string;
    private Address?:string;
    private Email?:string;
    private Id?:string;
    
    constructor(data:any)
    {
        this.$CompanyName = data.CompanyName;
        this.$Images = data.Images;
        this.$Icon = data.Icon;
        this.$Description = data.Description;
        this.$LegalNature = data.LegalNature;
        this.$LocationX = data.LocationX;
        this.$LocationY = data.LocationY;
        this.$LastAcessDate = new Date(data.LastAccessDate);
        this.$CNPJ = data.CNPJ;
        this.$Address = data.Address;
        this.$Email = data.Email;
        this.$Id = data.Id; 
    }
     /**
     * Getter $CompanyName
     * @return {string | undefined}
     */
     public get $CompanyName(): string | undefined {
        return this.CompanyName;
    }

    /**
     * Getter $Images
     * @return {string[] | undefined}
     */
    public get $Images(): string[] | undefined {
        return this.Images;
    }

    /**
     * Getter $Icon
     * @return {string | undefined}
     */
    public get $Icon(): string | undefined {
        return this.Icon;
    }

    /**
     * Getter $Description
     * @return {string | undefined}
     */
    public get $Description(): string | undefined {
        return this.Description;
    }

    /**
     * Getter $LegalNature
     * @return {string | undefined}
     */
    public get $LegalNature(): string | undefined {
        return this.LegalNature;
    }

    /**
     * Getter $LocationX
     * @return {string | undefined}
     */
    public get $LocationX(): string | undefined {
        return this.LocationX;
    }

    /**
     * Getter $LocationY
     * @return {string | undefined}
     */
    public get $LocationY(): string | undefined {
        return this.LocationY;
    }

    /**
     * Getter $LastAcessDate
     * @return {Date | undefined}
     */
    public get $LastAcessDate(): Date | undefined {
        return this.LastAcessDate;
    }

    /**
     * Getter $CNPJ
     * @return {string | undefined}
     */
    public get $CNPJ(): string | undefined {
        return this.CNPJ;
    }

    /**
     * Getter $Address
     * @return {string | undefined}
     */
    public get $Address(): string | undefined {
        return this.Address;
    }

    /**
     * Getter $Email
     * @return {string | undefined}
     */
    public get $Email(): string | undefined {
        return this.Email;
    }

    /**
     * Getter $Id
     * @return {string | undefined}
     */
    public get $Id(): string | undefined {
        return this.Id;
    }

    /**
     * Setter $CompanyName
     * @param {string | undefined} value
     */
    public set $CompanyName(value: string | undefined) {
        this.CompanyName = value;
    }

    /**
     * Setter $Images
     * @param {string[] | undefined} value
     */
    public set $Images(value: string[] | undefined) {
        this.Images = value;
    }

    /**
     * Setter $Icon
     * @param {string | undefined} value
     */
    public set $Icon(value: string | undefined) {
        this.Icon = value;
    }

    /**
     * Setter $Description
     * @param {string | undefined} value
     */
    public set $Description(value: string | undefined) {
        this.Description = value;
    }

    /**
     * Setter $LegalNature
     * @param {string | undefined} value
     */
    public set $LegalNature(value: string | undefined) {
        this.LegalNature = value;
    }

    /**
     * Setter $LocationX
     * @param {string | undefined} value
     */
    public set $LocationX(value: string | undefined) {
        this.LocationX = value;
    }

    /**
     * Setter $LocationY
     * @param {string | undefined} value
     */
    public set $LocationY(value: string | undefined) {
        this.LocationY = value;
    }

    /**
     * Setter $LastAcessDate
     * @param {Date | undefined} value
     */
    public set $LastAcessDate(value: Date | undefined) {
        this.LastAcessDate = value;
    }

    /**
     * Setter $CNPJ
     * @param {string | undefined} value
     */
    public set $CNPJ(value: string | undefined) {
        this.CNPJ = value;
    }

    /**
     * Setter $Address
     * @param {string | undefined} value
     */
    public set $Address(value: string | undefined) {
        this.Address = value;
    }

    /**
     * Setter $Email
     * @param {string | undefined} value
     */
    public set $Email(value: string | undefined) {
        this.Email = value;
    }

    /**
     * Setter $Id
     * @param {string | undefined} value
     */
    public set $Id(value: string | undefined) {
        this.Id = value;
    }
}