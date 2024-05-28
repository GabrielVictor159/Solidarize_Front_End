/* eslint-disable react-hooks/exhaustive-deps */
import LoginDefault from "@/layouts/Login/loginDefault";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/pages/Profile/myProfile.module.scss";
import { Button, Image, Input } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "@/Provider/Store";
import { useRouter } from "next/router";
export default function MyProfile() {
  const [image, setImage] = useState<string | URL>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loginResponse = useSelector((state: RootState) => state.loginResponse);
  const router = useRouter();

  useEffect(()=>{
    if(loginResponse.UserInformation===undefined){
        router.push("/Login");
    }
  },[]);
  
  return (
    <>
      <LoginDefault imageActive={false} center={true}>
        <>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={styles.Image_View_Container}
          >
            {image === undefined ? (
              <div className={styles.Image_View_Container_background}/>
            ) : (
              <Image alt="Imagem do Usuario" src={image.toString()} />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(URL.createObjectURL(e.target.files[0]));
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
