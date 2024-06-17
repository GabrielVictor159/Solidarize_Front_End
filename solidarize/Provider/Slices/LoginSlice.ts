import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoginResponse {
  Token?: string;
  UserInformation?: {
    CompanyName?: string;
    Images?: string[] | null;
    Icon?: string;
    Description?: string;
    LegalNature?: string;
    LocationX?: string;
    LocationY?: string;
    LastAcessDate?: Date;
    CNPJ?: string;
    Telefone?: string;
    Address?: string;
    Email?: string;
    Id?: string;
  };
}
export type LoginResponse = {
  Token?: string;
  UserInformation?: {
    CompanyName?: string;
    Images?: string[] | null;
    Icon?: string;
    Description?: string;
    LegalNature?: string;
    LocationX?: string;
    LocationY?: string;
    LastAcessDate?: Date;
    CNPJ?: string;
    Telefone?: string;
    Address?: string;
    Email?: string;
    Id?: string;
  }
}
const initialState: ILoginResponse = {
  Token: undefined,
  UserInformation: undefined,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginResponse: (state, action: PayloadAction<ILoginResponse>) => {
      sessionStorage.setItem("loginResponse", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { setLoginResponse } = loginSlice.actions;
export default loginSlice.reducer;