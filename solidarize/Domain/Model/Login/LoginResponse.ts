import User from "./User";

export default class LoginResponse {
    public Token?: string;
    public UserInformation?: User;

    public serializeLoginResponse(): any {
        return {
          Token: this.Token,
          UserInformation: this.UserInformation ? {
            CompanyName: this.UserInformation.CompanyName,
            Images: this.UserInformation.Images,
            Icon: this.UserInformation.Icon,
            Description: this.UserInformation.Description,
            LegalNature: this.UserInformation.LegalNature,
            LocationX: this.UserInformation.LocationX,
            LocationY: this.UserInformation.LocationY,
            LastAcessDate: this.UserInformation.LastAcessDate,
            CNPJ: this.UserInformation.CNPJ,
            Address: this.UserInformation.Address,
            Email: this.UserInformation.Email,
            Id: this.UserInformation.Id,
            Telefone: this.UserInformation.Telefone
          } : undefined
        };
      }
}
