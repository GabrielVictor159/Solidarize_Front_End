/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/pages/Login/login.module.scss";
import { Button, Image, Input } from "@nextui-org/react";
import NextLink from "next/link";
import LoginDefault from "@/layouts/Login/loginDefault";
import { useState } from "react";
import { UseCasesEnum } from "@/Domain/Enum/UseCasesEnum";
import UseCaseFactory from "@/Domain/Factory/UseCaseFactory";
import LoginRequest from "@/Application/UseCases/Login/LoginRequest";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Provider/Store";
import { setLoginResponse } from "@/Provider/Slices/LoginSlice";
import { useRouter } from 'next/router';
import LoginUseCase from "@/Application/UseCases/Login/LoginUseCase";

export default function IndexPage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    let useCase = new UseCaseFactory().Resolve(UseCasesEnum.Login);

    const Login = async (): Promise<void> => {
        let loginRequest = new LoginRequest(Email, Password);
        await useCase?.Execute(loginRequest);
        if (loginRequest.$ApiBadResponse!=undefined) {
            loginRequest.$ApiBadResponse.$Response.forEach((message)=>{
                toast.info(message);
            })
        }
        else
        {
            let loginResponseSerialize = loginRequest.$LoginResponse.serializeLoginResponse();
            dispatch(setLoginResponse(loginResponseSerialize));
            router.push("/");
        }
    };

    return (
        <>
        <LoginDefault>
            <>
                <h1>
                    Usuário Login
                </h1>
                <br />
                <br />
                <Input
                    className={styles.login_box_division2_input}
                    type="email"
                    placeholder="Email"
                    labelPlacement="outside"
                    onChange={(e) => setEmail(e.target.value)}
                    startContent={
                        <img className={styles.login_box_division2_input_icon} src="/icons8-email-100.png" />
                    } />
                <Input
                    className={styles.login_box_division2_input}
                    type="password"
                    placeholder="Password"
                    labelPlacement="outside"
                    onChange={(e) => setPassword(e.target.value)}
                    startContent={
                        <img className={styles.login_box_division2_input_icon} src="/icons8-password-384.png" />
                    } />
                <br />
                <Button onClick={Login} className={styles.login_box_division2_button} isIconOnly color="danger" variant="solid">
                    Login
                </Button>
                <NextLink href="/Login/recoverPassword" >
                    <p>Esqueceu a senha ?</p>
                </NextLink>
                <br />
                <br />
                <br />
                <br />
                <NextLink href="/Register" >
                    <p>Crie a sua conta</p>
                </NextLink>
                <br />
            </>
        </LoginDefault>
        </>
    );
}