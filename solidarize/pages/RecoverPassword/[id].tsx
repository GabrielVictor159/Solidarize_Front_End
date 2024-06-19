/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import LoginDefault from "@/layouts/Login/loginDefault";
import { useRouter } from 'next/router';
import stylesLogin from "@/styles/pages/Login/login.module.scss";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";
import UseCaseFactory from "@/Domain/Factory/UseCaseFactory";
import { UseCasesEnum } from "@/Domain/Enum/UseCasesEnum";
import ConfirmRecoverPasswordRequest from "@/Application/UseCases/ConfirmRecoverPassword/ConfirmRecoverPasswordRequest";

export default function RecoverPassword() {
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const { id } = router.query;

    let useCase = new UseCaseFactory().Resolve(UseCasesEnum.ConfirmRecoverPasswordUseCase);

    const recoverPassword = async() => {
        if (Password !== ConfirmPassword) {
            toast.info("As senhas não são iguais por favor tente novamente");
            return;
        }
        let request = new ConfirmRecoverPasswordRequest(id?.toString()??"",Password);
        await useCase?.Execute(request);
        if (request.ApiBadResponse!=undefined) {
            request.ApiBadResponse.Response.forEach((message)=>{
                toast.error(message);
            })
        }
        else
        {
            toast("A senha foi alterado com sucesso você sera redirecionado em 5 segundos")
            setTimeout(() => {
                router.push("/Login");
            }, 5000);
        }
    }
    return (
        <>
            <LoginDefault center={true}>
                <>
                    <h1>
                        Adicione uma nova senha
                    </h1>
                    <br />
                    <Input
                        className={stylesLogin.login_box_division2_input}
                        type="password"
                        placeholder="Senha"
                        labelPlacement="outside"
                        onChange={(e) => setPassword(e.target.value)}
                        startContent={
                            <img className={stylesLogin.login_box_division2_input_icon} src="/icons8-password-384.png" />
                        } />
                    <Input
                        className={stylesLogin.login_box_division2_input}
                        type="password"
                        placeholder="Confirme a senha"
                        labelPlacement="outside"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        startContent={
                            <img className={stylesLogin.login_box_division2_input_icon} src="/icons8-password-384.png" />
                        } />
                    <br />
                    <br />
                    <Button onClick={recoverPassword} className={stylesLogin.login_box_division2_button} isIconOnly color="danger" variant="solid">
                        Alterar senha
                    </Button>
                </>
            </LoginDefault>
        </>
    );
}