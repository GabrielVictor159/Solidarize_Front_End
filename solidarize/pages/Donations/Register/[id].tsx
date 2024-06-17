import GetProfileRequest from "@/Application/UseCases/GetProfile/GetProfileRequest";
import { UseCasesEnum } from "@/Domain/Enum/UseCasesEnum";
import UseCaseFactory from "@/Domain/Factory/UseCaseFactory";
import User from "@/Domain/Model/Login/User";
import { AppDispatch, RootState } from "@/Provider/Store";
import DefaultLayout from "@/layouts/default";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import stylesDonation from "@/styles/pages/Donations/donations.module.scss";
import styles from "@/styles/pages/Donations/Register/registerDonation.module.scss";
import clsx from "clsx";
import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { LegalNature } from "@/Domain/Enum/LegalNature";
import axios from "axios";
import { Sair } from "@/Domain/config/functions";

export default function RegisterDonation() {
  const router = useRouter();
  const { id } = router.query;
  const loginResponse = useSelector((state: RootState) => state.loginResponse);
  const [isClient, setIsClient] = useState(false);
  const [userInformation, setUserInformation] = useState<User>();
  const [donationName, setDonationName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (id != undefined) {
      GetProfile();
    }
  }, [id]);

  let useCase = new UseCaseFactory().Resolve(UseCasesEnum.GetProfile);

  const GetProfile = async () => {
    let request = new GetProfileRequest(id?.toString() ?? "");
    await useCase?.Execute(request);
    if (request.$ApiBadResponse != undefined) {
      request.$ApiBadResponse.$Response.forEach((message) => {
        toast.error(message);
        router.push("/");
      });
    } else {
      setUserInformation(request.$Profile);
    }
  };
  useEffect(()=>{if(isClient && loginResponse.UserInformation?.Id===userInformation?.$Id){router.push("/")}},[loginResponse,userInformation])
  useEffect(() => {
    if (
      userInformation !== undefined &&
      userInformation.$LegalNature !== LegalNature.ONG
    ) {
      router.push("/Ongs");
    }
  }, [router, userInformation]);

  useEffect(() => {
    if (
      isClient &&
      loginResponse.UserInformation === undefined &&
      (sessionStorage.getItem("loginResponse") === null ||
        sessionStorage.getItem("loginResponse") === "{}")
    ) {
      router.push("/Login");
    }
  }, [isClient, loginResponse, router]);

  const doar = async() =>{
    if (isClient && loginResponse !== undefined && userInformation!==undefined) {
        let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
        const response = await axios.post(
          `${BACK_END_URL}/api/CreateShipping`,
          {
            IdUserDestination: userInformation.$Id,
            Description: description,
            Name: donationName
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: loginResponse.Token,
            },
            validateStatus: () => true,
          }
        );

        if (response.status === 200) {
            router.push("/Donations/");
        }
        else if(response.status===401){
            Sair(dispatch, router);
        }
        else{
            
            response.data.forEach((message:any)=>{
                toast.info(message.errorMessage ?? message.Message);
            })
        }
    }
  }

  return (
    <>
      <DefaultLayout>
        <>
          <nav className={stylesDonation.division1}>
            <div className={clsx(stylesDonation.container, styles.container)}>
              {isClient && userInformation !== undefined ? (
                <>
                  <Image
                    alt="Imagem do Usuario"
                    className={styles.icon}
                    src={`${
                      userInformation?.$Icon === ""
                        ? "/0587496e-6e1f-4e5b-a60f-19c3cf931a3d.png"
                        : `${process.env.NEXT_PUBLIC_CONTAINER_IMAGE ?? ""}${
                            userInformation?.$Icon!.split(".")[0]
                          }`
                    }`}
                  />
                  <Input
                    onClear={() => setDonationName("")}
                    className={styles.nameInput}
                    classNames={{
                      label: "text-black/50 dark:text-white/90",
                      inputWrapper: styles.inputName,
                    }}
                    isRequired
                    type="text"
                    placeholder="Nome da doação"
                    readOnly
                    onFocus={(e) => e.target.removeAttribute("readOnly")}
                    onChange={(e) => {
                      setDonationName(e.target.value);
                    }}
                  />
                  <Textarea
                    onClear={() => setDescription("")}
                    type="text"
                    placeholder="Descrição da doação"
                    readOnly
                    disableAnimation
                    disableAutosize
                    classNames={{
                      base: clsx(styles.textarea),
                      inputWrapper: styles.textareaInputWrapper,
                      input: styles.textareaInput,
                    }}
                    onFocus={(e) => e.target.removeAttribute("readOnly")}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <br/>
                  <Button
                    className={styles.button}
                    isIconOnly
                    color="danger"
                    variant="solid"
                    onClick={()=>{doar();}}
                  >
                    Registrar
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </nav>
        </>
      </DefaultLayout>
    </>
  );
}
