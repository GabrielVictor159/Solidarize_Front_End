import ValidateItensItem from "../Model/Validate/ValidateItensItem";

export const ValidateCompanyName = (companyName: string, addItem?: (value: ValidateItensItem) => void) => {
    let valid = companyName.length >= 4 || "O nome da empresa deve ter pelo menos 4 dígitos.";
    addItem && addItem(new ValidateItensItem(ValidateCompanyName.name,valid===true?true:false,valid!==true?valid:""));
    return valid;
};

export const ValidatePhone = (phone:string,addItem?: (value: ValidateItensItem) => void) =>{
    let valid = phone.length===15 || "O telefone não é valido.";
    addItem && addItem(new ValidateItensItem(ValidatePhone.name,valid===true?true:false,valid!==true?valid:""));
    return valid;
}

export const ValidateEmail = (email:string,addItem?: (value: ValidateItensItem) => void) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = regex.test(email) || "O e-mail não é válido.";
    addItem && addItem(new ValidateItensItem(ValidateEmail.name,valid===true?true:false,valid!==true?valid:""));
    return valid;
}

export const ValidateConfirmPassword =(confirmPasword:string,password:string,addItem?: (value: ValidateItensItem) => void) =>{
    let valid = confirmPasword===password || "As senhas não são iguais";
    addItem && addItem(new ValidateItensItem(ValidateConfirmPassword.name,valid===true?true:false,valid!==true?valid:""));
    return valid;
}

export const ValidateCnpj = (cnpj: string, addItem?: (value: ValidateItensItem) => void) => {
    const cleanedCnpj = cnpj.replace(/\D/g, "");
  
    let valid: string | boolean = "";
  
    if (cleanedCnpj.length !== 14) {
      valid = "CNPJ inválido";
      addItem && addItem(new ValidateItensItem(ValidateCnpj.name, false, valid));
      return valid;
    }
  
    const multiplicador1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const multiplicador2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
    const tempCnpj = cleanedCnpj.substring(0, 12);
    let soma = 0;
    let resto;
  
    for (let i = 0; i < 12; i++) {
      soma += parseInt(tempCnpj[i]) * multiplicador1[i];
    }
  
    resto = soma % 11;
    resto = resto < 2 ? 0 : 11 - resto;
  
    if (resto !== parseInt(cleanedCnpj[12])) {
      valid = "CNPJ inválido";
      addItem && addItem(new ValidateItensItem(ValidateCnpj.name, false, valid));
      return valid;
    }
  
    soma = 0;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cleanedCnpj[i]) * multiplicador2[i];
    }
  
    resto = soma % 11;
    resto = resto < 2 ? 0 : 11 - resto;
  
    valid = resto === parseInt(cleanedCnpj[13]);
  
    if (!valid) {
      valid = "CNPJ inválido";
    }
  
    addItem && addItem(new ValidateItensItem(ValidateCnpj.name, valid === true, valid !== true ? valid : ""));
    return valid;
  };
  

export const ValidateAddress = (address: string, addItem?: (value: ValidateItensItem) => void) => {
    let valid = address.length >= 10 || "O endereço da empresa deve ter pelo menos 10 digítos.";
    addItem && addItem(new ValidateItensItem(ValidateAddress.name,valid===true?true:false,valid!==true?valid:""));
    return valid;
}

export const ValidatePassword = (password: string, addItem?: (value: ValidateItensItem) => void) => {
    let valid = password.length > 8 || "A senha deve ter pelo menos 9 digítos.";
    addItem && addItem(new ValidateItensItem(ValidatePassword.name,valid===true?true:false,valid!==true?valid:""));
    return valid;   
}

export const ValidateDescription = (password: string, addItem?: (value: ValidateItensItem) => void) => {
    let valid = password.length >= 10 || "A descrição deve ter pelo menos 10 digítos.";
    addItem && addItem(new ValidateItensItem(ValidateDescription.name,valid===true?true:false,valid!==true?valid:""));
    return valid;
}


