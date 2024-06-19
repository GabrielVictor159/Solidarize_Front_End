import Shipping from "@/Domain/Model/Shipping/Shipping";
import { LoginResponse } from "@/Provider/Slices/LoginSlice";
import { Button, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/donation.module.scss";
import NextLink from "next/link";
import { brtFormatter } from "@/Domain/config/functions";
type donationProps = {
  loginResponse: LoginResponse;
  donation: Shipping;
};
const Donation: React.FC<donationProps> = ({ loginResponse, donation }) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const userDonation = donation.IdUserCreation === loginResponse.UserInformation?.Id
  ? donation.UserResponse : donation.UserCreation;

  return (
    <>
      {isClient === true ? (
        donation &&
        loginResponse && (
          <div className={styles.container}>
            <div className={styles.subContainer} style={{textAlign:"center"}}>
                <div>
                <Image
                alt="Imagem do Usuario"
                className={styles.icon}
                src={`${
                  userDonation?.Icon ===""? "/0587496e-6e1f-4e5b-a60f-19c3cf931a3d.png" : `${process.env.NEXT_PUBLIC_CONTAINER_IMAGE ?? ""}${
                            userDonation?.Icon!.split(".")[0]
                          }`
                }`}
              />
              <p>{userDonation?.CompanyName}</p>
                </div>
              <h1>{donation.Name}</h1>
              <p>{donation.CreationDate !== undefined ? brtFormatter(donation.CreationDate):""}</p>
            </div>
            <NextLink href={`/Donations/${donation.Id}`}>
              <Button
                className={styles.button}
                isIconOnly
                color="danger"
                variant="solid"
              >
                Visualizar
              </Button>
            </NextLink>
          </div>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default Donation;
