import User from "./User";

export default class LoginResponse {
    private Token?: string;
    private UserInformation?: User;

    /**
     * Getter $Token
     * @return {string | undefined}
     */
    public get $Token(): string | undefined {
        return this.Token;
    }

    /**
     * Getter $UserInformation
     * @return {User | undefined}
     */
    public get $UserInformation(): User | undefined {
        return this.UserInformation;
    }

    /**
     * Setter $Token
     * @param {string | undefined} value
     */
    public set $Token(value: string | undefined) {
        this.Token = value;
    }

    /**
     * Setter $UserInformation
     * @param {User | undefined} value
     */
    public set $UserInformation(value: User | undefined) {
        this.UserInformation = value;
    }

    public serializeLoginResponse(): any {
        return {
          Token: this.$Token,
          UserInformation: this.$UserInformation ? {
            CompanyName: this.$UserInformation.$CompanyName,
            Images: this.$UserInformation.$Images,
            Icon: this.$UserInformation.$Icon,
            Description: this.$UserInformation.$Description,
            LegalNature: this.$UserInformation.$LegalNature,
            LocationX: this.$UserInformation.$LocationX,
            LocationY: this.$UserInformation.$LocationY,
            LastAcessDate: this.$UserInformation.$LastAcessDate,
            CNPJ: this.$UserInformation.$CNPJ,
            Address: this.$UserInformation.$Address,
            Email: this.$UserInformation.$Email,
            Id: this.$UserInformation.$Id,
            Telefone: this.$UserInformation.$Telefone
          } : undefined
        };
      }
}
