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
  Textarea,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Provider/Store";
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
  ValidatePassword,
  ValidatePhone,
} from "@/Domain/config/validates";
import SelectMapRegion from "@/components/selectMapRegion";
import { LegalNature } from "@/Domain/Enum/LegalNature";
import stylesLogin from "@/styles/pages/Login/login.module.scss";
import { FormatCnpj, FormatPhoneNumber } from "@/Domain/config/formats";
import {
  compareArrays,
  getImageBase64FromUrl,
} from "@/Domain/config/functions";
import UseCaseFactory from "@/Domain/Factory/UseCaseFactory";
import { UseCasesEnum } from "@/Domain/Enum/UseCasesEnum";
import PatchCompanyRequest from "@/Application/UseCases/PatchCompany/PatchCompanyRequest";
import LoginResponse from "@/Domain/Model/Login/LoginResponse";
import { setLoginResponse } from "@/Provider/Slices/LoginSlice";

export default function MyProfile() {
  const [icon, setIcon] = useState<string>();
  const iconInputRef = useRef<HTMLInputElement>(null);
  const loginResponse = useSelector((state: RootState) => state.loginResponse);
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [legalNature, setLegalNature] = useState<string>("");
  const [mapEventClick, setMapEventClick] = useState<MapEventClick>();
  const [validateItens, setValidateItens] = useState<ValidateItens>(
    new ValidateItens([])
  );

  const [isClient,setIsClient] = useState<boolean>(false);

  useEffect(()=>{setIsClient(true);},[])

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
      if (
        loginResponse.UserInformation === undefined &&
        sessionStorage.getItem("loginResponse") === null
      ) {
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
      }
  }, [loginResponse]);

  useEffect(() => {
    const updateValidateItens = (newItem: ValidateItensItem) => {
      setValidateItens((prevState) => {
        const clonedState = new ValidateItens([...prevState.Items]);
        clonedState.AddItem(newItem);
        return clonedState;
      });
    };
    if (companyName !== undefined && companyName !== "") {
      ValidateCompanyName(companyName, updateValidateItens);
    }
    if (cnpj !== undefined && cnpj !== "") {
      ValidateCnpj(cnpj, updateValidateItens);
    }
    if (address !== undefined && address !== "") {
      ValidateAddress(address, updateValidateItens);
    }
    if (phone !== undefined && phone !== "") {
      ValidatePhone(phone, updateValidateItens);
    }
    if (password !== undefined && password !== "") {
      ValidatePassword(password, updateValidateItens);
    }
    if (password !== undefined && password !== "") {
      ValidateConfirmPassword(confirmPassword, password, updateValidateItens);
    }
    if (description !== undefined && description !== "") {
      ValidateDescription(description, updateValidateItens);
    }
    if (mapEventClick !== undefined) {
      updateValidateItens(
        new ValidateItensItem(
          "mapEventClick",
          mapEventClick === undefined ? false : true,
          "Por favor selecione um ponto fixo no mapa para a sua empresa"
        )
      );
    }
    if (legalNature !== undefined && legalNature !== "") {
      updateValidateItens(
        new ValidateItensItem(
          "legalNature",
          legalNature === undefined ? false : true,
          "Por favor selecione uma natureza legal para a sua empresa"
        )
      );
    }
  }, [
    companyName,
    cnpj,
    address,
    phone,
    password,
    confirmPassword,
    description,
    mapEventClick,
  ]);

  let useCase = new UseCaseFactory().Resolve(UseCasesEnum.PatchCompany);

  const PatchCompany = async () => {
    let iconReq: string | undefined = undefined;
    let imagesReq: string[] | undefined = undefined;

    if (icon !== undefined) {
      iconReq = await getImageBase64FromUrl(icon);
    }
    if (images.length > 0 && loginResponse.UserInformation?.Images) {
      let z: string[] = [];
      loginResponse.UserInformation.Images.forEach((d) => {
        z.push(`${process.env.NEXT_PUBLIC_CONTAINER_IMAGE}${d!.split(".")[0]}`);
      });
      if (!compareArrays(z, images)) {
        imagesReq = [];
        for (const e of images) {
          const a = await getImageBase64FromUrl(e);
          imagesReq.push(a);
        }
      }
    }

    let invalidItens = validateItens.Items.filter((e) => e.Valid == false);
    if (invalidItens.length > 0) {
      invalidItens.forEach((e) => {
        toast.info(e.Message);
      });
      return;
    }

    let request = new PatchCompanyRequest(
      iconReq,
      companyName.length > 0 ? companyName : undefined,
      description.length > 0 ? description : undefined,
      legalNature.length > 0 ? legalNature : undefined,
      mapEventClick?.region.lat !== undefined
        ? mapEventClick?.region.lat.toString()
        : undefined,
      mapEventClick?.region.lng !== undefined
        ? mapEventClick?.region.lng.toString()
        : undefined,
      cnpj.length > 0 ? cnpj : undefined,
      address.length > 0 ? address : undefined,
      phone.length > 0 ? phone : undefined,
      password.length > 0 ? password : undefined
    );
    request.Images = imagesReq;
    request.token = loginResponse.Token ?? "";

    await useCase?.Execute(request);
    if (request.ApiBadResponse != undefined) {
      request.ApiBadResponse.Response.forEach((message) => {
        toast.info(message);
      });
    } else {
      let loginResponse = new LoginResponse();
      loginResponse.Token = request.token;
      loginResponse.UserInformation = request.UserInformation;
      dispatch(setLoginResponse(loginResponse.serializeLoginResponse()));
      router.push("/");
    }
  };

  const RemoveItemValidateItens = (a: string) => {
    let index = validateItens.Items.findIndex((e) => e.Name === a);
    if (index !== -1) {
      let newValidateItens = new ValidateItens([...validateItens.Items]);
      newValidateItens.Items.splice(index, 1);
      setValidateItens(newValidateItens);
    }
  };

  return (
    isClient ?
    <>
      <LoginDefault imageActive={false} center={true}>
        {loginResponse.UserInformation !== undefined &&
        loginResponse.UserInformation !== null ? (
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
                  setIcon(URL.createObjectURL(e.target.files[0]).toString());
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
              onClear={() => {
                setCompanyName("");
                RemoveItemValidateItens(ValidateCompanyName.name);
              }}
              className={stylesLogin.login_box_division2_input}
              isRequired
              type="text"
              label="Nome da empresa"
              autoComplete="off"
              readOnly
              onFocus={(e) => e.target.removeAttribute("readOnly")}
              placeholder={loginResponse.UserInformation?.CompanyName ?? "Nome"}
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              validate={ValidateCompanyName}
            />
            <Input
              onClear={() => {
                setCnpj("");
                RemoveItemValidateItens(ValidateCnpj.name);
              }}
              className={stylesLogin.login_box_division2_input}
              isRequired
              type="text"
              label="CPNJ da empresa"
              autoComplete="off"
              readOnly
              onFocus={(e) => e.target.removeAttribute("readOnly")}
              placeholder={loginResponse.UserInformation?.CNPJ ?? "CNPJ"}
              value={FormatCnpj(cnpj)}
              onChange={(e) => {
                setCnpj(e.target.value);
              }}
              validate={ValidateCnpj}
            />
            <Textarea
              onClear={() => {
                setAddress("");
                RemoveItemValidateItens(ValidateAddress.name);
              }}
              isRequired
              type="text"
              label="Endereço da empresa"
              autoComplete="off"
              readOnly
              disableAnimation
              disableAutosize
              classNames={{
                base: clsx(
                  stylesLogin.login_box_division2_input,
                  stylesLogin.login_box_division2_textarea,
                  "max-w-xs"
                ),
                input: clsx(
                  stylesLogin.login_box_division2_textarea,
                  "resize-y min-h-[40px]"
                ),
              }}
              onFocus={(e) => e.target.removeAttribute("readOnly")}
              placeholder={loginResponse.UserInformation?.Address ?? "Endereço"}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              validate={ValidateAddress}
            />
            <Input
              onClear={() => {
                setPhone("");
                RemoveItemValidateItens(ValidatePhone.name);
              }}
              className={stylesLogin.login_box_division2_input}
              isRequired
              type="tel"
              label="Telefone da empresa"
              role="presentation"
              autoComplete="off"
              readOnly
              onFocus={(e) => e.target.removeAttribute("readOnly")}
              placeholder={
                loginResponse.UserInformation?.Telefone ?? "Telefone"
              }
              value={FormatPhoneNumber(phone)}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              validate={ValidatePhone}
            />
            <Input
              onClear={() => {
                setPassword("");
                RemoveItemValidateItens(ValidatePassword.name);
              }}
              className={stylesLogin.login_box_division2_input}
              isRequired
              type="password"
              label="Senha"
              placeholder="Nova Senha"
              autoComplete="off"
              readOnly
              onFocus={(e) => e.target.removeAttribute("readOnly")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              validate={ValidatePassword}
            />
            <Input
              onClear={() => {
                setConfirmPassword("");
                RemoveItemValidateItens(ValidateConfirmPassword.name);
              }}
              className={stylesLogin.login_box_division2_input}
              isRequired
              type="password"
              label="Confirmar a senha"
              placeholder="Confirmar a Senha"
              autoComplete="off"
              readOnly
              onFocus={(e) => e.target.removeAttribute("readOnly")}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              isInvalid={confirmPassword !== password}
            />
            <Textarea
              onClear={() => {
                setDescription("");
                RemoveItemValidateItens(ValidateDescription.name);
              }}
              isRequired
              type="text"
              label="Descrição da empresa"
              autoComplete="off"
              readOnly
              disableAnimation
              disableAutosize
              classNames={{
                base: clsx(stylesLogin.login_box_division2_input, "max-w-xs"),
                input: "resize-y min-h-[40px]",
              }}
              onFocus={(e) => e.target.removeAttribute("readOnly")}
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
              autoComplete="off"
              placeholder={loginResponse.UserInformation?.LegalNature}
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
              onClick={() => {
                PatchCompany();
              }}
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
        ) : (
          <></>
        )}
      </LoginDefault>
    </>
    :<></>
  );
}
