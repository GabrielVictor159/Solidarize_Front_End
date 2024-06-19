import { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/usersView.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Provider/Store";
import axios from "axios";
import { Sair } from "@/Domain/config/functions";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import User from "@/Domain/Model/Login/User";
import { Avatar } from "@nextui-org/react";
type UsersViewProps = {
  search: string;
};

const UsersView: React.FC<UsersViewProps> = ({ search }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const loginResponse = useSelector((state: RootState) => state.loginResponse);
  const [companies, setCompanies] = useState<User[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient) {
      getCompanies();
    }
  }, [isClient, search]);
  const getCompanies = async () => {
    if (loginResponse !== undefined && search !== "") {
      let BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;
      const response = await axios.post(
        `${BACK_END_URL}/api/GetCompanys`,
        {
          CompanyName: search,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: loginResponse.Token,
          },
          validateStatus: () => true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        let a: User[] = [];
        response.data.Companies.forEach((item: any) => {
          a.push(new User(item));
        });
        setCompanies(a);
      } else if (response.status === 401) {
        Sair(dispatch, router);
      } else {
        try {
          response.data.forEach((message: any) => {
            toast.info(message.errorMessage ?? message.Message);
          });
        } catch {}
      }
    }
  };
  return (
    <>
      <div className={styles.container}>
        {companies.map((company: User) => {
          if (company.Id !== loginResponse.UserInformation?.Id) {
            return (
              <a
                key={company.Id}
                onClick={() => {
                  router.push(`/Profile/${company.Id}`);
                }}
              >
                <div className={styles.itemContainerCompanies}>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={`${
                      company?.Icon === ""
                        ? "/0587496e-6e1f-4e5b-a60f-19c3cf931a3d.png"
                        : `${process.env.NEXT_PUBLIC_CONTAINER_IMAGE ?? ""}${
                            company?.Icon!.split(".")[0]
                          }`
                    }`}
                  />
                  <div>
                    <h1 className={styles.titlesCompanies}>
                      {company.CompanyName}
                    </h1>
                    <p>{company.Email}</p>
                  </div>
                </div>
              </a>
            );
          }
        })}
      </div>
    </>
  );
};

export default UsersView;
