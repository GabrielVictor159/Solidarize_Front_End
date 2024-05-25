import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoginResponse 
{
    Token?: string;
    UserInformation?: {
    CompanyName?:string;
    Images?: string[] | null;
    Icon?:string;
    Description?:string;
    LegalNature?:string;
    LocationX?:string;
    LocationY?:string;
    LastAcessDate?:Date;
    CNPJ?:string;
    Address?:string;
    Email?:string;
    Id?:string;
    };
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
        return action.payload;
      },
    },
  });
  
  export const { setLoginResponse } = loginSlice.actions;
  export default loginSlice.reducer;