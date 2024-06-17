import User from "@/Domain/Model/Login/User";
import Shipping from "@/Domain/Model/Shipping/Shipping";
import { Sair } from "@/Domain/config/functions";
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
import clsx from 'clsx';

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
      }
      else if(response.status===401){
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
        if(response.data.Companies.length>0){
            setOtherUser(response.data.Companies[0]);
        }
      } else if (response.status === 401) {
        Sair(dispatch, router);
      } else {
        router.push("/Donations/");
      }
    }
  };

  return (
    <>
      <DefaultLayout>
        <>
        {otherUser!==undefined?
          <nav className={stylesDonation.division1}>
            <div className={clsx(stylesDonation.container,styles.container)}>
                <Image
                    alt="Imagem do Usuario"
                    className={styles.icon}
                    src={`${
                        !otherUser?.$Icon
                          ? "/0587496e-6e1f-4e5b-a60f-19c3cf931a3d.png"
                          : `${process.env.NEXT_PUBLIC_CONTAINER_IMAGE ?? ""}${
                              otherUser.$Icon.split(".")[0]
                            }`
                      }`}
                  />
                <h1>{shipping?.Name}</h1>
                <p>{shipping?.Description}</p>
                <div className={styles.MessagesView} ref={messagesViewRef}>
                {shipping &&(
                <ListMessageDiscution shipping={shipping} loginResponse={loginResponse} otherUser={otherUser} atualization={atualization} setAtualization={setAtualization} messagesViewRef={messagesViewRef.current}/>)
                }
                </div>
            </div>
          </nav>
          :<></> }
        </>
      </DefaultLayout>
    </>
  );
}
