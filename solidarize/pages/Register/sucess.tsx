import LoginDefault from "@/layouts/Login/loginDefault";
import styles from "@/styles/pages/Register/sucessregister.module.scss";
import { Image, Button } from "@nextui-org/react";
import NextLink from "next/link";
import clsx from "clsx";
import { useTheme } from "next-themes";
export default function RegisterSucess() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <LoginDefault imageActive={false} center={true}>
        <>
          <h1>Sucesso na solicitação</h1>
          <br/>
          <Image
            className={clsx(
              styles.image,
              theme === "dark"
                ? styles.image_dark
                : styles.image_light
            )}
            alt="Imagem Login Usuario"
            src="/3646374.jpg"
          />
          <br />
          <p className={styles.paragraph_register_sucess}>
            Por favor verifique o seu email para completar a solicitação de
            registro
          </p>
          <br />
          <NextLink href="/">
            <Button
              className={styles.button_sucess_register}
              color="danger" variant="solid"
            >
              Retornar
            </Button>
          </NextLink>
        </>
      </LoginDefault>
    </>
  );
}
