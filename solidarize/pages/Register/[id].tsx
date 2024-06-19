import LoginDefault from "@/layouts/Login/loginDefault";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Image, Button, CircularProgress } from "@nextui-org/react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import styles from "@/styles/pages/Register/sucessregister.module.scss";
import NextLink from "next/link";
import UseCaseFactory from "@/Domain/Factory/UseCaseFactory";
import { UseCasesEnum } from "@/Domain/Enum/UseCasesEnum";
import ConfirmRegisterRequest from "@/Application/UseCases/ConfirmRegister/ConfirmRegisterRequest";
import { toast } from "react-toastify";
export default function ConfirmRegister() {
  const router = useRouter();
  const { id } = router.query;
  const [sucess, setSucess] = useState<boolean | null>(null);
  const { theme, setTheme } = useTheme();
  let useCase = new UseCaseFactory().Resolve(UseCasesEnum.ConfirmRegisterCompany);

  useEffect(()=>{
    if(id!=undefined)
      {
    confirmRegister();
      }
  },[id]);

  const confirmRegister = async() => {
    let request = new ConfirmRegisterRequest(id?.toString()??"");
    await useCase?.Execute(request);
    if (request.ApiBadResponse!=undefined) {
        setSucess(false);
        request.ApiBadResponse.Response.forEach((message)=>{
            toast.error(message);
        })
    }
    else
    {
      setSucess(true);
    }
}
  return (
    <>
      <LoginDefault imageActive={false} center={true}>
        <>
          {sucess === null ? (
            <>
             <CircularProgress aria-label="Loading..." />
            </>
          ) : sucess === true ? (
            <>
              <br />
              <h1>Cadastro realizado com sucesso</h1>
              <br />
              <Image
                className={clsx(
                  styles.image,
                  theme === "dark" ? styles.image_dark : styles.image_light
                )}
                alt="Imagem Login Usuario"
                src="/4529164.jpg"
              />
              <br />
              <NextLink href="/Login/">
                <Button
                  className={styles.button_sucess_register}
                  color="danger"
                  variant="solid"
                >
                  Logar
                </Button>
              </NextLink>
              <br />
            </>
          ) : (
            <>
              <br />
              <h1>Não foi possivel encontrar a sua solicitação</h1>
              <br />
              <Image
                className={clsx(
                  styles.image,
                  theme === "dark" ? styles.image_dark : styles.image_light
                )}
                alt="Imagem Login Usuario"
                src="/9214769.jpg"
              />
              <br />
              <NextLink href="/">
                <Button
                  className={styles.button_sucess_register}
                  color="danger"
                  variant="solid"
                >
                  Retornar
                </Button>
              </NextLink>
              <br />
            </>
          )}
        </>
      </LoginDefault>
    </>
  );
}
