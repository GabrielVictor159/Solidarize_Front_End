import User from "@/Domain/Model/Login/User";
import MessageDiscution from "@/Domain/Model/Shipping/MessageDiscution";
import Shipping from "@/Domain/Model/Shipping/Shipping";
import { Sair, brtFormatter } from "@/Domain/config/functions";
import { LoginResponse } from "@/Provider/Slices/LoginSlice";
import { AppDispatch } from "@/Provider/Store";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ImageModal from "./imageModal";
import stylesProfile from "@/styles/components/profileInformations.module.scss";
import styles from "@/styles/components/listMessageDiscution.module.scss";
import {
  Button,
  image,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import clsx from "clsx";
import ReactPlayer from "react-player";

type ListMessageDiscutionProps = {
  shipping: Shipping;
  loginResponse: LoginResponse;
  otherUser: User;
  atualization: number;
  setAtualization: (number:number)=>void;
  messagesViewRef:HTMLDivElement | null
};
const ListMessageDiscution: React.FC<ListMessageDiscutionProps> = ({
  shipping,
  loginResponse,
  otherUser,
  atualization,
  setAtualization,
  messagesViewRef
}) => {
  const [messagesDiscution, setMessagesDiscution] = useState<
    MessageDiscution[]
  >([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [isClient, setIsClient] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient && shipping.Id !== undefined && shipping.Id !== null) {
      getMessagesDiscution();
    }
  }, [atualization,isClient, shipping]);

  const getMessagesDiscution = async () => {
    const headers = {
      "Content-Type": "application/json",
      ...(loginResponse.Token ? { Authorization: loginResponse.Token } : {}),
    };
    let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
    fetch(`${BACK_END_URL}/api/GetMessagesDiscution`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        IdShipping: shipping.Id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.messageDiscutions.length > 0) {
          const messages = data.messageDiscutions.map(
            (e: any) => new MessageDiscution(e)
          );
          console.log(messages);
          setMessagesDiscution(messages);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <>
        {messagesDiscution.map((message, messageIndex) => {
          return (
            <>
            <br/>
            <div key={messageIndex} className={styles.MessageLine} style={{justifyContent:message.IdUser !== loginResponse.UserInformation?.Id ?"start":"end"}}>
              <div className={styles.divisionTextMessage}>
                <p>{message.Message}</p>
                <br/>
                <div className={styles.divisionAttachedFiles} style={{justifyContent:message.IdUser !== loginResponse.UserInformation?.Id ?"start":"end"}}>
                  {message.AttachedFiles.map((attachedFile, fileIndex) => {
                    if (attachedFile.Type === 0 || attachedFile.Type === 1) {
                      return (
                        <a
                          key={fileIndex}
                          onClick={() => {
                            setModalContent(
                              <>
                                <Image
                                  alt="Imagem attached file"
                                  src={`${
                                    process.env
                                      .NEXT_PUBLIC_CONTAINER_IMAGE_MESSAGEDISCUTION
                                  }${attachedFile.Item}`}
                                />
                              </>
                            );
                            setModalOpen(true);
                          }}
                        >
                          <>
                            <Image
                              alt="Imagem do Usuario"
                              className={styles.attachedFileImage}
                              src={`${
                                process.env
                                  .NEXT_PUBLIC_CONTAINER_IMAGE_MESSAGEDISCUTION
                              }${attachedFile.Item}`}
                            />
                          </>
                        </a>
                      );
                    } else if (attachedFile.Type === 2) {
                      return (
                        <a
                          key={fileIndex}
                          onClick={() => {
                            setModalContent(
                              <>
                                <ReactPlayer
                                  url={`${process.env.NEXT_PUBLIC_CONTAINER_IMAGE_MESSAGEDISCUTION}${attachedFile.Item}`}
                                  playing={true}
                                />
                              </>
                            );
                            setModalOpen(true);
                          }}
                        >
                          <>
                            <ReactPlayer
                              url={`${process.env.NEXT_PUBLIC_CONTAINER_IMAGE_MESSAGEDISCUTION}${attachedFile.Item}`}
                              playing={false}
                            />
                          </>
                        </a>
                      );
                    } else {
                      return (
                        <a
                          key={fileIndex}
                          href={`${process.env.NEXT_PUBLIC_CONTAINER_IMAGE_MESSAGEDISCUTION}${attachedFile.Item}`}
                          download
                        >
                          <>
                            <Image
                              alt="Imagem file"
                              className={styles.attachedFileImageFile}
                              src={"/"}
                            />
                          </>
                        </a>
                      );
                    }
                  })}
                </div>
                <div className={styles.divisionDate}>
                  <p>{brtFormatter(message.CreationDate)}</p>
                </div>
              </div>
              {message.IdUser !== loginResponse.UserInformation?.Id ? (
                <Image
                  className={styles.IconUser}
                  alt="Imagem do Usuario"
                  src={
                    (otherUser.$Icon===undefined || otherUser.$Icon === "")
                      ? "/0587496e-6e1f-4e5b-a60f-19c3cf931a3d.png"
                      : `${
                          process.env
                            .NEXT_PUBLIC_CONTAINER_IMAGE
                        }${otherUser.$Icon!}`
                  }
                />
              ) : (
                <></>
              )}
            </div>
            </>
          );
        })}
      <ImageModal
        className={stylesProfile.Image_Modal}
        isOpen={modalOpen}
        size={"5xl"}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        {modalContent}
      </ImageModal>
    </>
  );
};

export default ListMessageDiscution;
