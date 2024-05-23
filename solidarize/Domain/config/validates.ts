export const ValidateCompanyName = (companyName: string) => {
    return companyName.length >= 4 || "O nome da empresa deve ter pelo menos 4 dígitos.";
};

export const ValidateCnpj = (cnpj: string) => {
    const cleanedCnpj = cnpj.replace(/\D/g, "");

    if (cleanedCnpj.length !== 14) {
        return false || "CNPJ inválido";
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
    if (resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto !== parseInt(cleanedCnpj[12])) {
        return false || "CNPJ inválido";
    }

    soma = 0;
    for (let i = 0; i < 13; i++) {
        soma += parseInt(cleanedCnpj[i]) * multiplicador2[i];
    }

    resto = soma % 11;
    if (resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    return resto === parseInt(cleanedCnpj[13]) || "CNPJ inválido";
};

export const ValidateAddress =(address:string) =>{
    return address.length >= 10 || "O endereço da empresa deve ter pelo menos 10 digítos.";
}

export const ValidatePassword =(password:string) =>{
    return password.length>8 || "A senha deve ter pelo menos 9 digítos.";
}

export const ValidateDescription =(password:string) =>{
    return password.length>=10 || "A descrição deve ter pelo menos 10 digítos.";
}


