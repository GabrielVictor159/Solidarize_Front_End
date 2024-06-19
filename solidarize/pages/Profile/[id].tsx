import GetProfileRequest from "@/Application/UseCases/GetProfile/GetProfileRequest";
import { HeartFilledIcon } from "@/components/icons";
import ProfileInformations from "@/components/profileInformations";
import { UseCasesEnum } from "@/Domain/Enum/UseCasesEnum";
import UseCaseFactory from "@/Domain/Factory/UseCaseFactory";
import User from "@/Domain/Model/Login/User";
import LoginDefault from "@/layouts/Login/loginDefault";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import stylesHome from "@/styles/pages/index.module.scss";

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [userInformation, setUserInformation] = useState<User>();

  useEffect(() => {
    if (id != undefined) {
      GetProfile();
    }
  }, [id]);

  let useCase = new UseCaseFactory().Resolve(UseCasesEnum.GetProfile);
  const GetProfile = async () => {
    let request = new GetProfileRequest(id?.toString() ?? "");
    await useCase?.Execute(request);
    if (request.ApiBadResponse != undefined) {
      request.ApiBadResponse.Response.forEach((message) => {
        toast.error(message);
        router.push("/");
      });
    } else {
      setUserInformation(request.Profile);
    }
  };

  return (
    <>
      <LoginDefault imageActive={false} center={true}>
        <>
        <br/>
          {userInformation && (
            <ProfileInformations userInformation={userInformation} />
            
          )}
          {
            userInformation?.LegalNature==="ONG"?
          <Button
                className={stylesHome.section2_button}
                isIconOnly
                color="danger"
                variant="solid"
              >
                <HeartFilledIcon size={25} />
                Doar
              </Button>
              :<></>
          }
          <br/>
        </>
      </LoginDefault>
    </>
  );
}
