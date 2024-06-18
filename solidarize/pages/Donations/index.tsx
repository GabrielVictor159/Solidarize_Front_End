/* eslint-disable react-hooks/exhaustive-deps */
import User from "@/Domain/Model/Login/User";
import Shipping from "@/Domain/Model/Shipping/Shipping";
import { AppDispatch, RootState } from "@/Provider/Store";
import DefaultLayout from "@/layouts/default";
import { Pagination } from "@nextui-org/pagination";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/pages/Donations/donations.module.scss";
import Donation from "@/components/donation";
import { Sair } from "@/Domain/config/functions";
import { Input } from "@nextui-org/react";

export default function DonationsIndes() {
  const router = useRouter();
  const loginResponse = useSelector((state: RootState) => state.loginResponse);
  const [isClient, setIsClient] = useState(false);
  const [shippingsState, setShippingsState] = useState<Shipping[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search,setSearch] = useState<string>("");
  const pageSize: number = 4;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (
        isClient &&
      loginResponse.UserInformation === undefined &&
      (sessionStorage.getItem("loginResponse") === null || sessionStorage.getItem("loginResponse") === "{}") 
    ) {
      router.push("/Login");
    }
  }, [isClient,loginResponse, router]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    getShippings();
  }, [search,isClient, loginResponse]);

  const getShippings = async () => {
    if (isClient && loginResponse !== undefined) {
      let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
      const response = await axios.post(
        `${BACK_END_URL}/api/GetMyShippings`,
        {
          Name: search,
          IdShipping: undefined,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: loginResponse.Token,
          },
          validateStatus: () => true,
        }
      );
      let shippings: Shipping[] = [];

      if (response.status === 200) {
        response.data.shippings.forEach((e: any) => {
          shippings.push(new Shipping(e));
        });
        let idsUsers: string[] = [];
        shippings.forEach((e) => {
          e.IdUserCreation && idsUsers.push(e.IdUserCreation);
          e.IdUserResponse && idsUsers.push(e.IdUserResponse);
        });
        let companies: User[] = [];
        const responseUsers = await axios.post(
          `${BACK_END_URL}/api/GetCompanys`,
          {
            idsCompanys: idsUsers,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: loginResponse.Token,
            },
            validateStatus: () => true,
          }
        );
        if (responseUsers.status === 200) {
          responseUsers.data.Companies.forEach((e: any) => {
            companies.push(new User(e));
          });

          shippings.forEach((e) => {
            e.IdUserCreation &&
              (e.UserCreation = companies.find(
                (x) => x.$Id === e.IdUserCreation
              ));
            e.IdUserResponse &&
              (e.UserResponse = companies.find(
                (x) => x.$Id === e.IdUserResponse
              ));
          });
        }
      }
      else if(response.status===401){
        Sair(dispatch, router);
        }
      setShippingsState(shippings);
    }
  };

  const currentShippings = shippingsState.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <>
      <DefaultLayout>
        <>
          <nav className={styles.division1}>
            <div className={styles.container}>
              <div className={styles.containerInput}>
              <Input
                    onClear={() => setSearch("")}
                    className={styles.nameInput}
                    classNames={{
                      label: "text-black/50 dark:text-white/90",
                      inputWrapper: styles.inputName,
                    }}
                    type="text"
                    placeholder="Nome da doação"
                    readOnly
                    onFocus={(e) => e.target.removeAttribute("readOnly")}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
              </div>
              {currentShippings.map((e, index) => {
                return (
                  <Donation
                    key={index}
                    loginResponse={loginResponse}
                    donation={e}
                  />
                );
              })}
              <Pagination
                color="danger"
                onChange={(e) => {
                  setPage(e);
                }}
                showControls
                className="gap-2"
                radius="full"
                disableCursorAnimation
                variant="bordered"
                total={Math.ceil(shippingsState.length / pageSize)}
                initialPage={page}
              />
            </div>
          </nav>
        </>
      </DefaultLayout>
    </>
  );
}
