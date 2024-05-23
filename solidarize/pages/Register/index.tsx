import React, { useEffect, useRef, useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { LegalNature } from "@/Domain/Enum/LegalNature";
import { FormatCnpj, FormatPhoneNumber } from "@/Domain/config/formats";
import { ValidateAddress, ValidateCnpj, ValidateCompanyName, ValidateDescription, ValidatePassword } from "@/Domain/config/validates";
import LoginDefault from "@/layouts/Login/loginDefault";
import stylesLogin from "@/styles/pages/Login/login.module.scss";
import styles from "@/styles/pages/Register/register.module.scss";
import { APIProvider, Map } from '@vis.gl/react-google-maps';

export default function RegisterIndex() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const [companyName, setCompanyName] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [legalNature, setLegalNature] = useState<string>("");

  return (
    <>
      <LoginDefault imageActive={false} top={true}>
        <>
          <br />
          <h1>Registrar sua Empresa</h1>
          <br />
          <br />
          <Input
            isClearable
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="text"
            label="Nome da empresa"
            placeholder="Nome"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            validate={ValidateCompanyName}
          />
          <Input
            onClear={() => setCnpj("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="text"
            label="CPNJ da empresa"
            placeholder="CNPJ"
            value={FormatCnpj(cnpj)}
            onChange={(e) => setCnpj(e.target.value)}
            validate={ValidateCnpj}
          />
          <Input
            onClear={() => setAddress("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="text"
            label="Endereço da empresa"
            placeholder="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            validate={ValidateAddress}
          />
          <Input
            onClear={() => setPhone("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="tel"
            label="Telefone da empresa"
            placeholder="Telefone"
            value={FormatPhoneNumber(phone)}
            onChange={(e) => setPhone(e.target.value)}
            validate={ValidateAddress}
          />
          <Input
            onClear={() => setEmail("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="email"
            label="Email da empresa"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            onClear={() => setPassword("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="password"
            label="Senha"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            validate={ValidatePassword}
          />
          <Input
            onClear={() => setConfirmPassword("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="password"
            label="Confirmar a senha"
            placeholder="Confirmar a Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isInvalid={confirmPassword !== password}
          />
          <Input
            onClear={() => setDescription("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="text"
            label="Descrição da empresa"
            placeholder="Descrição da empresa"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          {isClient && (
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
              <Map
                className={styles.Map}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
              />
            </APIProvider>
          )}
        </>
      </LoginDefault>
    </>
  );
}


