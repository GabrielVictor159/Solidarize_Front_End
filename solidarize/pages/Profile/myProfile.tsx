/* eslint-disable react-hooks/exhaustive-deps */
import LoginDefault from "@/layouts/Login/loginDefault";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/pages/Profile/myProfile.module.scss";
import { Button, image, Image, Input } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "@/Provider/Store";
import { useRouter } from "next/router";
import clsx from 'clsx';
export default function MyProfile() {
  const [icon, setIcon] = useState<string | URL>();
  const iconInputRef = useRef<HTMLInputElement>(null);
  const loginResponse = useSelector((state: RootState) => state.loginResponse);
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(loginResponse.UserInformation);
    if (loginResponse.UserInformation === undefined) {
      router.push("/Login");
    }
    if (
      loginResponse.UserInformation?.Images !== null &&
      loginResponse.UserInformation?.Images !== undefined
    ) {
      let imagesNewArray:string[] = [];
      loginResponse.UserInformation?.Images?.forEach((item) => {
        imagesNewArray.push(
          `${process.env.NEXT_PUBLIC_CONTAINER_IMAGE}${item.split(".")[0]}`
        );
      });
      setImages(imagesNewArray);
    }
  }, []);

  return (
    <>
      <LoginDefault imageActive={false} center={true}>
        <>
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
                className={clsx(styles.Images_View_ImagesContainer_Itens,styles.Images_View_ImagesContainer)}
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
            <div className={clsx(styles.Images_View_ImagesContainer, styles.Images_View_ImagesContainer_AddItens)}>
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
              if (e.target.files && e.target.files[0]) {
                
              }
            }}
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
          />
        </>
      </LoginDefault>
    </>
  );
}
