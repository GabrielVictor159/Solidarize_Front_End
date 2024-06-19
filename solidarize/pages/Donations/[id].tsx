/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import User from "@/Domain/Model/Login/User";
import Shipping from "@/Domain/Model/Shipping/Shipping";
import { getImageBase64FromUrl, Sair } from "@/Domain/config/functions";
import { AppDispatch, RootState } from "@/Provider/Store";
import DefaultLayout from "@/layouts/default";
import stylesDonation from "@/styles/pages/Donations/donations.module.scss";
import styles from "@/styles/pages/Donations/donationId.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Input, Textarea } from "@nextui-org/react";
import ListMessageDiscution from "@/components/ListMessageDiscution";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import AttachedFile from "@/Domain/Model/Shipping/AttachedFile";

type fileType = {
  item: string;
  type: string;
};

export default function DonationId() {
  const router = useRouter();
  const { id } = router.query;
  const loginResponse = useSelector((state: RootState) => state.loginResponse);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [shipping, setShipping] = useState<Shipping>();
  const [otherUser, setOtherUser] = useState<User | undefined>();
  const [atualization, setAtualization] = useState<number>(0);
  const messagesViewRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState<string>("");
  const [filesInput, setFilesInput] = useState<fileType[]>([]);
  const { theme, setTheme } = useTheme();
  const inputFileRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    GetShipping();
  }, [id]);
  useEffect(() => {
    if (shipping) {
      getOtherUserInformation();
    }
  }, [shipping]);

  const GetShipping = async () => {
    if (isClient && loginResponse !== undefined) {
      let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
      const response = await axios.post(
        `${BACK_END_URL}/api/GetMyShippings`,
        {
          Name: undefined,
          IdShipping: id,
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
        if (response.data.shippings.length === 0) {
          router.push("/Donations/");
        } else {
          setShipping(response.data.shippings[0]);
        }
      } else if (response.status === 401) {
        Sair(dispatch, router);
      } else {
        router.push("/Donations/");
      }
    }
  };

  const getOtherUserInformation = async () => {
    if (isClient && loginResponse !== undefined && shipping !== undefined) {
      let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
      const response = await axios.post(
        `${BACK_END_URL}/api/GetCompanys`,
        {
          idsCompanys: [
            shipping.IdUserCreation === loginResponse.UserInformation?.Id
              ? shipping.IdUserResponse
              : shipping.IdUserCreation,
          ],
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
        if (response.data.Companies.length > 0) {
          setOtherUser(response.data.Companies[0]);
        }
      } else if (response.status === 401) {
        Sair(dispatch, router);
      } else {
        router.push("/Donations/");
      }
    }
  };
  useEffect(()=>{console.log(filesInput)},[filesInput])
  const postMessage = async() =>{
    let files:any[] = [];
    for (const file of filesInput) {
      let a = {
        Item: await getImageBase64FromUrl(file.item), 
        Type:file.type.includes("jpeg")? "ImageJpeg": file.type.includes("png")?"ImagePng":file.type.includes("mp4")?"VideoMp4":"Document",

      }
      files.push(a);
    }

    if (isClient && loginResponse !== undefined && shipping !== undefined) {
      let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
      const response = await axios.post(
        `${BACK_END_URL}/api/CreateMessageDiscution`,
        {
          Message:messageInput,
          IdShipping:shipping.Id,
          Files:files
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
        setFilesInput([]);
        setMessageInput("");
        setAtualization(atualization+1);
      } else if (response.status === 401) {
        Sair(dispatch, router);
      } else {
        response.data.forEach((message:any)=>{
          toast.info(message.errorMessage ?? message.Message);
      });
      }
    }
  };

  return (
    <>
      <DefaultLayout>
        <>
          {otherUser !== undefined ? (
            <nav className={stylesDonation.division1}>
              <div className={clsx(stylesDonation.container, styles.container)}>
                <Image
                  alt="Imagem do Usuario"
                  className={styles.icon}
                  src={`${
                    !otherUser?.Icon
                      ? "/0587496e-6e1f-4e5b-a60f-19c3cf931a3d.png"
                      : `${process.env.NEXT_PUBLIC_CONTAINER_IMAGE ?? ""}${
                          otherUser.Icon.split(".")[0]
                        }`
                  }`}
                />
                <h1>{shipping?.Name}</h1>
                <p>{shipping?.Description}</p>
                <div className={styles.ContainerMessages}>
                  <div className={styles.MessagesView} ref={messagesViewRef}>
                    {shipping && (
                      <ListMessageDiscution
                        shipping={shipping}
                        loginResponse={loginResponse}
                        otherUser={otherUser}
                        atualization={atualization}
                        setAtualization={setAtualization}
                        messagesViewRef={messagesViewRef.current}
                      />
                    )}
                  </div>
                  <div className={styles.ContainerInput}>
                    <Input
                      onClear={() => {
                        setMessageInput("");
                      }}
                      className={styles.inputMessage}
                      classNames={{
                        label: "text-black/50 dark:text-white/90",
                        inputWrapper: styles.inputMessage_inputWrapper,
                      }}
                      isRequired
                      type="text"
                      autoComplete="off"
                      onFocus={(e) => e.target.removeAttribute("readOnly")}
                      placeholder={"Mensagem"}
                      onChange={(e) => {
                        setMessageInput(e.target.value);
                      }}
                    />
                    <a onClick={()=>{inputFileRef.current?.click()}}>
                      <img
                        className={styles.fileIcon}
                        src={
                          theme === "dark"
                            ? "/icons8-clip-96_white.png"
                            : "/icons8-clip-96_black.png"
                        }
                      />
                    </a>
                    <Button
                      className={styles.messageButon}
                      isIconOnly
                      color="danger"
                      variant="solid"
                      onClick={()=>{postMessage();}}
                    >
                      <>
                        <img
                          className={styles.messageButonIcon}
                          src={"/icons8-send-90.png"}
                        />
                      </>
                    </Button>
                    <input
                      type="file"
                      ref={inputFileRef}
                      onChange={(e) => {
                        if(filesInput.length>3){
                          toast("O numero maximo de itens por mensagens é 4.");
                        }
                        else if (e.target.files && e.target.files[0]) {
                          let newImageURL = URL.createObjectURL(e.target.files[0]);
                          let newFileType = {
                            item: newImageURL,
                            type: e.target.files[0].type,
                          };
                          setFilesInput((prevFiles) => [
                            ...prevFiles,
                            newFileType
                          ]);
                        }
                      }}
                      accept="image/png, image/jpeg"
                      style={{ display: "none" }}
                    />
                  </div>
                  { filesInput.length>0?
                  <div className={styles.ContainerFilesInput}>
                      <div className={styles.FilesInputView}>
                      {
                        filesInput.map((element,index)=>{
                          if(element.type.includes("image")){
                            return(
                            <img key={index} src={element.item} className={styles.filesViewImages}/>);
                          }
                          else if(element.type.includes("video")){
                            return(<div key={index} className={styles.filesViewVideos}>
                              <div className={styles.playImageContainer}><img src="/icons8-play-90.png" className={styles.imageVideoIcon}/></div>
                              <ReactPlayer
                              width={120}
                              height={120}
                              url={element.item}
                              playing={false}
                            />
                              </div>);
                          }
                          else{
                            return(<img key={index} src="/icons8-file-96.png"/>);
                          }
                        })
                      }
                      </div>
                      <p onClick={()=>{setFilesInput([])}} className={styles.ElimateFiles}>X</p>
                      </div>
                  :<></>
                }
                </div>
              </div>
            </nav>
          ) : (
            <></>
          )}
        </>
      </DefaultLayout>
    </>
  );
}
