/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { LegalNature } from "@/Domain/Enum/LegalNature";
import { FormatCnpj, FormatPhoneNumber } from "@/Domain/config/formats";
import { ValidateAddress, ValidateCnpj, ValidateCompanyName, ValidateConfirmPassword, ValidateDescription, ValidateEmail, ValidatePassword, ValidatePhone } from "@/Domain/config/validates";
import LoginDefault from "@/layouts/Login/loginDefault";
import stylesLogin from "@/styles/pages/Login/login.module.scss";
import styles from "@/styles/pages/Register/register.module.scss";
import { MapEventClick } from "@/Domain/types";
import SelectMapRegion from "@/components/selectMapRegion";
import ValidateItens from "@/Domain/Model/Validate/ValidateItens";
import ValidateItensItem from "@/Domain/Model/Validate/ValidateItensItem";
import { toast } from "react-toastify";
import UseCaseFactory from "@/Domain/Factory/UseCaseFactory";
import { UseCasesEnum } from "@/Domain/Enum/UseCasesEnum";
import RegisterRequest from "@/Application/UseCases/Register/RegisterRequest";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function RegisterIndex() {

  const [companyName, setCompanyName] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [legalNature, setLegalNature] = useState<string>("");
  const [mapEventClick, setMapEventClick] = useState<MapEventClick>();
  const [validateItens, setValidateItens] = useState<ValidateItens>(new ValidateItens([]));

  
  useEffect(() => {
    const updateValidateItens = (newItem: ValidateItensItem) => {
      setValidateItens(prevState => {
        const clonedState = new ValidateItens([...prevState.Items]);
        clonedState.AddItem(newItem);
        return clonedState;
      });
    };
    ValidateCompanyName(companyName, updateValidateItens);
    ValidateCnpj(cnpj, updateValidateItens);
    ValidateAddress(address, updateValidateItens);
    ValidatePhone(phone, updateValidateItens);
    ValidateEmail(email, updateValidateItens);
    ValidatePassword(password, updateValidateItens);
    ValidateConfirmPassword(confirmPassword, password, updateValidateItens);
    ValidateDescription(description, updateValidateItens);
    updateValidateItens(new ValidateItensItem("mapEventClick",mapEventClick===undefined?false:true,"Por favor selecione um ponto fixo no mapa para a sua empresa"));
    updateValidateItens(new ValidateItensItem("legalNature",legalNature===undefined?false:true,"Por favor selecione uma natureza legal para a sua empresa"));
  }, [companyName, cnpj, address, phone, email, password, confirmPassword, description,mapEventClick]);

  let useCase = new UseCaseFactory().Resolve(UseCasesEnum.RegisterCompany);
  const router = useRouter();
  const Register = async () => {
    let invalidItens = validateItens.Items.filter(e=>e.Valid==false);
    if(invalidItens.length>0){
      invalidItens.forEach(e=>{
        toast.info(e.Message);
      });
      return;
    }

    let request = new RegisterRequest(companyName,description,legalNature,mapEventClick!.region.lat,mapEventClick!.region.lng,cnpj,address,phone,email,password);
        await useCase?.Execute(request);
        if (request.ApiBadResponse!=undefined) {
          request.ApiBadResponse.Response.forEach((message)=>{
                toast.info(message);
            })
        }
        else
        {
          router.push("/Register/sucess")
        }

  }
  return (
    <>
      <LoginDefault imageActive={false} top={true}>
        <>
          <br />
          <h1>Registrar sua Empresa</h1>
          <br />
          <br />
          <Input
            onClear={() => setCompanyName("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="text"
            label="Nome da empresa"
            placeholder="Nome"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            value={companyName}
            onChange={(e) => { setCompanyName(e.target.value) }}
            validate={ValidateCompanyName}
          />
          <Input
            onClear={() => setCnpj("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="text"
            label="CPNJ da empresa"
            placeholder="CNPJ"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            value={FormatCnpj(cnpj)}
            onChange={(e) => { setCnpj(e.target.value) }}
            validate={ValidateCnpj}
          />
          <Textarea
            onClear={() => setAddress("")}
            isRequired
            type="text"
            label="Endereço da empresa"
            placeholder="Endereço"
            readOnly
            disableAnimation
            disableAutosize
            classNames={{
              base: clsx(stylesLogin.login_box_division2_input,stylesLogin.login_box_division2_textarea,"max-w-xs"),
              input: clsx(stylesLogin.login_box_division2_textarea,"resize-y min-h-[40px]"),
            }}
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            value={address}
            onChange={(e) => { setAddress(e.target.value) }}
            validate={ValidateAddress}
          />
          <Input
            onClear={() => setPhone("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="tel"
            label="Telefone da empresa"
            placeholder="Telefone"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            value={FormatPhoneNumber(phone)}
            onChange={(e) => { setPhone(e.target.value) }}
            validate={ValidatePhone}
          />
          <Input
            onClear={() => setEmail("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="email"
            label="Email da empresa"
            placeholder="Email"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <Input
            onClear={() => setPassword("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="password"
            label="Senha"
            placeholder="Senha"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            validate={ValidatePassword}
          />
          <Input
            onClear={() => setConfirmPassword("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="password"
            label="Confirmar a senha"
            placeholder="Confirmar a Senha"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value) }}
            isInvalid={confirmPassword !== password}
          />
          <Textarea
            onClear={() => setDescription("")}
            isRequired
            type="text"
            label="Descrição da empresa"
            placeholder="Descrição da empresa"
            readOnly
            disableAnimation
            disableAutosize
            classNames={{
              base: clsx(stylesLogin.login_box_division2_input,"max-w-xs"),
              input: "resize-y min-h-[20px]",
            }}
            onFocus={(e) => e.target.removeAttribute('readOnly')}
            value={description}
            onChange={(e) => { setDescription(e.target.value) }}
            validate={ValidateDescription}
          />
          <Select
            label="Natureza legal da empresa"
            className="max-w-xs"
            value={legalNature}
            onChange={(e) => setLegalNature(e.target.value)}
          >
            {Object.values(LegalNature).map((legalNature) => (
              <SelectItem key={legalNature} value={legalNature}>
                {legalNature}
              </SelectItem>
            ))}
          </Select>
          <br />
          <p className={styles.paragraph}>
            Por favor selecione uma localização fisica para o seu negocio
          </p>
          <SelectMapRegion className={styles.Map} callbackSelectRegion={setMapEventClick} />
          <br />
          <Button onClick={Register} className={styles.button_login} isIconOnly color="danger" variant="solid">
            Registrar
          </Button>
          <br />
        </>
      </LoginDefault>
    </>
  );
}


