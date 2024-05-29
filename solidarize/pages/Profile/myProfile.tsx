/* eslint-disable react-hooks/exhaustive-deps */
import LoginDefault from "@/layouts/Login/loginDefault";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/pages/Profile/myProfile.module.scss";
import {
  Button,
  image,
  Image,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "@/Provider/Store";
import { useRouter } from "next/router";
import clsx from "clsx";
import { toast } from "react-toastify";
import { MapEventClick } from "@/Domain/types";
import ValidateItens from "@/Domain/Model/Validate/ValidateItens";
import ValidateItensItem from "@/Domain/Model/Validate/ValidateItensItem";
import {
  ValidateAddress,
  ValidateCnpj,
  ValidateCompanyName,
  ValidateConfirmPassword,
  ValidateDescription,
  ValidateEmail,
  ValidatePassword,
  ValidatePhone,
} from "@/Domain/config/validates";
import SelectMapRegion from "@/components/selectMapRegion";
import { LegalNature } from "@/Domain/Enum/LegalNature";
import stylesLogin from "@/styles/pages/Login/login.module.scss";
import { FormatCnpj, FormatPhoneNumber } from "@/Domain/config/formats";

export default function MyProfile() {
  const [icon, setIcon] = useState<string | URL>();
  const iconInputRef = useRef<HTMLInputElement>(null);
  const loginResponse = useSelector((state: RootState) => state.loginResponse);
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const imagesInputRef = useRef<HTMLInputElement>(null);
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
  const [validateItens, setValidateItens] = useState<ValidateItens>(
    new ValidateItens([])
  );

  useEffect(() => {
    console.log(loginResponse.UserInformation);
    if (loginResponse.UserInformation === undefined) {
      router.push("/Login");
    }
    if (
      loginResponse.UserInformation?.Images !== null &&
      loginResponse.UserInformation?.Images !== undefined
    ) {
      let imagesNewArray: string[] = [];
      loginResponse.UserInformation?.Images?.forEach((item) => {
        imagesNewArray.push(
          `${process.env.NEXT_PUBLIC_CONTAINER_IMAGE}${item.split(".")[0]}`
        );
      });
      setImages(imagesNewArray);
    }
    if (
      loginResponse.UserInformation?.LocationX !== null &&
      loginResponse.UserInformation?.LocationX !== undefined &&
      loginResponse.UserInformation?.LocationY !== null &&
      loginResponse.UserInformation?.LocationY !== undefined
    ) {
      let newMapClick: MapEventClick = {
        region: {
          lat: Number.parseFloat(loginResponse.UserInformation?.LocationX),
          lng: Number.parseFloat(loginResponse.UserInformation?.LocationY),
        },
      };
      setMapEventClick(newMapClick);
      console.log(mapEventClick);
    }
  }, [loginResponse]);

  useEffect(() => {
    const updateValidateItens = (newItem: ValidateItensItem) => {
      setValidateItens((prevState) => {
        const clonedState = new ValidateItens([...prevState.$Items]);
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
    updateValidateItens(
      new ValidateItensItem(
        "mapEventClick",
        mapEventClick === undefined ? false : true,
        "Por favor selecione um ponto fixo no mapa para a sua empresa"
      )
    );
    updateValidateItens(
      new ValidateItensItem(
        "legalNature",
        legalNature === undefined ? false : true,
        "Por favor selecione uma natureza legal para a sua empresa"
      )
    );
  }, [
    companyName,
    cnpj,
    address,
    phone,
    email,
    password,
    confirmPassword,
    description,
    mapEventClick,
  ]);

  return (
    <>
      <LoginDefault imageActive={false} center={true}>
        <>
          <br />
          <br />
          <div
            onClick={() => iconInputRef.current?.click()}
            className={styles.Icon_View_Container}
          >
            {icon === undefined &&
            (loginResponse.UserInformation?.Icon === null ||
              loginResponse.UserInformation?.Icon === "") ? (
              <div className={styles.Icon_View_Container_background} />
            ) : (
              <Image
                alt="Imagem do Usuario"
                className={styles.Icon_View_Container_Image}
                src={
                  icon === undefined
                    ? `${process.env.NEXT_PUBLIC_CONTAINER_IMAGE}${
                        loginResponse.UserInformation?.Icon!.split(".")[0]
                      }`
                    : icon.toString()
                }
              />
            )}
          </div>
          <br />
          <div className={styles.Images_View}>
            {images.map((image, index) => (
              <div
                key={index}
                className={clsx(
                  styles.Images_View_ImagesContainer_Itens,
                  styles.Images_View_ImagesContainer
                )}
                onClick={() => {
                  setImages(
                    images.filter((item, indexItem) => indexItem !== index)
                  );
                }}
              >
                <Image
                  alt="Imagem do Usuario"
                  className={styles.Images_View_ImagesContainer_Images}
                  src={image}
                />
              </div>
            ))}
            <div
              className={clsx(
                styles.Images_View_ImagesContainer,
                styles.Images_View_ImagesContainer_AddItens
              )}
              onClick={() => imagesInputRef.current?.click()}
            >
              <Image
                alt="Imagem do Usuario"
                className={styles.Images_View_ImagesContainer_ImagePushItems}
                src={"/2803242.jpg"}
              />
            </div>
          </div>
          <input
            type="file"
            ref={iconInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setIcon(URL.createObjectURL(e.target.files[0]));
              }
            }}
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
          />
          <input
            type="file"
            ref={imagesInputRef}
            onChange={(e) => {
              if (images.length >= 6) {
                toast.error("O numero maximo de imagens é 6");
                return;
              }
              if (e.target.files && e.target.files[0]) {
                let newImageURL = URL.createObjectURL(e.target.files[0]);
                setImages((prevImages) => [
                  ...prevImages,
                  newImageURL.toString(),
                ]);
              }
            }}
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
          />
          <br />
          <br />
          <Input
            onClear={() => setCompanyName("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="text"
            label="Nome da empresa"
            placeholder={loginResponse.UserInformation?.CompanyName ?? "Nome"}
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            validate={ValidateCompanyName}
          />
          <Input
            onClear={() => setCnpj("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="text"
            label="CPNJ da empresa"
            placeholder={loginResponse.UserInformation?.CNPJ ?? "CNPJ"}
            value={FormatCnpj(cnpj)}
            onChange={(e) => {
              setCnpj(e.target.value);
            }}
            validate={ValidateCnpj}
          />
          <Input
            onClear={() => setAddress("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="text"
            label="Endereço da empresa"
            placeholder={loginResponse.UserInformation?.Address ?? "Endereço"}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            validate={ValidateAddress}
          />
          <Input
            onClear={() => setPhone("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="tel"
            label="Telefone da empresa"
            placeholder={loginResponse.UserInformation?.Telefone ?? "Telefone"}
            value={FormatPhoneNumber(phone)}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            validate={ValidatePhone}
          />
          <Input
            onClear={() => setEmail("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="email"
            label="Email da empresa"
            placeholder={loginResponse.UserInformation?.Email ?? "Email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            onClear={() => setPassword("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="password"
            label="Senha"
            placeholder="Nova Senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            isInvalid={confirmPassword !== password}
          />
          <Input
            onClear={() => setDescription("")}
            className={stylesLogin.login_box_division2_input}
            isRequired
            type="text"
            label="Descrição da empresa"
            placeholder={
              loginResponse.UserInformation?.Description ?? "Descrição"
            }
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
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
          {mapEventClick !== undefined ? (
            <SelectMapRegion
              className={styles.Map}
              defaultRegionMap={{
                lat: mapEventClick?.region.lat ?? 0,
                lng: mapEventClick?.region.lng ?? 0,
              }}
              callbackSelectRegion={setMapEventClick}
            />
          ) : (
            <></>
          )}
          <br />
          <Button
            onClick={() => {}}
            className={styles.button}
            isIconOnly
            color="danger"
            variant="solid"
          >
            Atualizar
          </Button>
          <br />
          <br />
        </>
      </LoginDefault>
    </>
  );
}
