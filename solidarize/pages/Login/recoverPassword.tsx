/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import LoginDefault from "@/layouts/Login/loginDefault";
import { Button, Input, Image } from "@nextui-org/react";
import stylesLogin from "@/styles/pages/Login/login.module.scss";
import styles from "@/styles/pages/Login/recoverPassword.module.scss";
import NextLink from "next/link";
import { useState } from "react";
import UseCaseFactory from "@/Domain/Factory/UseCaseFactory";
import { UseCasesEnum } from "@/Domain/Enum/UseCasesEnum";
import RequestRecoverPasswordRequest from "@/Application/UseCases/RequestRecoverPassword/RequestRecoverPasswordRequest";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";
import clsx from "clsx";

export default function RecoverPassword() {
    const [Email, setEmail] = useState("");
    const [Sucess, setSucess] = useState(false);
    const { theme, setTheme } = useTheme();

    let useCase = new UseCaseFactory().Resolve(UseCasesEnum.RequestRecoverPasswordUseCase);

    const Recover = async (): Promise<void> => {
        let loginRequest = new RequestRecoverPasswordRequest(Email);
        await useCase?.Execute(loginRequest);
        if (loginRequest.$ApiBadResponse != undefined) {
            loginRequest.$ApiBadResponse.$Response.forEach((message) => {
                toast.info(message);
            })
        }
        else {
            setSucess(true);
        }
    };
    return (
        <>
            {
                Sucess ?
                    <>
                        <LoginDefault imageActive={false} center={true}>
                            <>
                                <Image
                                    className={clsx(styles.image, theme==='dark' ? styles.image_dark:styles.image_light)}
                                    alt="Imagem Login Usuario"
                                    src="/3646374.jpg"
                                />
                                <br />
                                <h1 className={clsx(styles.text, theme==='dark' ? styles.text_dark:styles.text_light)}>
                                    Enviamos um email para que você possa continuar o processo
                                </h1>
                                <br />
                                <NextLink href="/Login">
                                    <Button className={styles.button} color="danger" variant="solid">
                                        Retornar
                                    </Button>
                                </NextLink>
                            </>
                        </LoginDefault>
                    </>
                    :
                    <LoginDefault center={true}>
                        <>
                            <h1>
                                Recuperar Senha
                            </h1>
                            <br />
                            <br />
                            <Input
                                className={stylesLogin.login_box_division2_input}
                                type="email"
                                placeholder="Email"
                                labelPlacement="outside"
                                onChange={(e) => setEmail(e.target.value)}
                                startContent={
                                    <img className={stylesLogin.login_box_division2_input_icon} src="/icons8-email-100.png" />
                                } />
                            <br />
                            <Button onClick={Recover} className={stylesLogin.login_box_division2_button} isIconOnly color="danger" variant="solid">
                                Recuperar
                            </Button>
                        </>
                    </LoginDefault>
            }
        </>
    );
}