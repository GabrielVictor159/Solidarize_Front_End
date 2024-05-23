export const FormatCnpj = (value: string | undefined) => {
    if (!value) {
        return "";
    }
    const cleanedValue = value.replace(/\D/g, "");
    let formattedValue = cleanedValue.substring(0, 2);
    if (cleanedValue.length > 2) {
        formattedValue += "." + cleanedValue.substring(2, 5);
    }
    if (cleanedValue.length > 5) {
        formattedValue += "." + cleanedValue.substring(5, 8);
    }
    if (cleanedValue.length > 8) {
        formattedValue += "/" + cleanedValue.substring(8, 12);
    }
    if (cleanedValue.length > 12) {
        formattedValue += "-" + cleanedValue.substring(12, 14);
    }
    return formattedValue;
};

export const FormatPhoneNumber = (value: string | undefined) => {
    if (!value) {
        return "";
    }
    
    let cleanedValue = value.replace(/\D/g, "");
    
    if (cleanedValue.length >= 1) {
        cleanedValue = "(" + cleanedValue;
    }
    if (cleanedValue.length >= 3) {
        cleanedValue = cleanedValue.substring(0,3)+ ") " + cleanedValue.substring(3,14);
    }
    if (cleanedValue.length >= 10) {
        cleanedValue = cleanedValue.substring(0,10)+ "-" + cleanedValue.substring(10,14);
    }
    
    return cleanedValue;
};



