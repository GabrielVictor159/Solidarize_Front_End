/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import DefaultLayout from "@/layouts/default";
import styles from "@/styles/pages/Login/login.module.scss";
import { Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { useSizeProportion } from "@/layouts/sizeProportionProvider";

export default function LoginDefault({
	children,
    imageActive = true,
    center = false,
    top = false,
}: {
	children: React.ReactNode;
    imageActive?:boolean,
    center?:boolean
    top?:boolean
}){
    const { theme, setTheme } = useTheme();
    const { sizeProportion, setSizeProportion } = useSizeProportion();
    return (
        <>
            <DefaultLayout>
                <>
                    <nav className={styles.background}>
                        <div className={styles.login_box}>
                            {
                                imageActive?
                                sizeProportion>1?
                            <div className={styles.login_box_division1}>
                                <Image
                                    className={clsx(
                                        styles.login_box_division1_image,
                                        theme === 'dark' ? styles.login_box_division1_image_dark : styles.login_box_division1_image_light)}
                                    alt="Imagem Login Usuario"
                                    src="/50887.jpg"
                                />
                            </div>
                            :<></>
                            :<></>
                            }
                            <div className={clsx( 
                                styles.login_box_division2,
                                imageActive==false ? styles.login_box_division2_phone:
                                sizeProportion>1 ? styles.login_box_division2_desktop : styles.login_box_division2_phone,
                                center===true?styles.login_box_division2_center:"",
                                top===true?styles.login_box_division2_top:"")}>
                                {children}
                            </div>
                        </div>
                    </nav>
                </>
            </DefaultLayout>
        </>
    );
}