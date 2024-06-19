import DefaultLayout from "@/layouts/default";
import stylesHome from "@/styles/pages/index.module.scss";
import styles from "@/styles/pages/Ongs/ongs.module.scss";
import clsx from "clsx";
import {
  APIProvider,
  Map,
  MapMouseEvent,
  Marker,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { RegionMap } from "@/Domain/types";
import { RegionGeographyLimit } from "@/Domain/config/functions";
import OngMap from "@/Domain/Model/Map/OngMap";
import UseCaseFactory from "@/Domain/Factory/UseCaseFactory";
import { UseCasesEnum } from "@/Domain/Enum/UseCasesEnum";
import GetOngsRequest from "@/Application/UseCases/GetOngs/GetOngsRequest";
import { toast } from "react-toastify";
import { SizeProportionContext } from "../../layouts/sizeProportionProvider";
import User from "@/Domain/Model/Login/User";
import GetProfileRequest from "@/Application/UseCases/GetProfile/GetProfileRequest";
import ProfileInformations from "@/components/profileInformations";
import { Button } from "@nextui-org/react";
import { HeartFilledIcon } from "@/components/icons";
import ProfileMouseEnter from "@/components/ProfileMouseEnter";
import NextLink from 'next/link';
import { useSelector } from "react-redux";
import { RootState } from "@/Provider/Store";

export default function OngsIndex() {
  const [locationObtained, setLocationObtained] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const loginResponse = useSelector((state: RootState) => state.loginResponse);
  const [defaultRegion, setDefaultRegion] = useState<RegionMap>({
    lat: -15.77972,
    lng: -47.92972,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          if (
            RegionGeographyLimit(
              position.coords.latitude,
              position.coords.longitude
            )
          ) {
            setDefaultRegion({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }
          setLocationObtained(true);
        },
        function (error) {
          setLocationObtained(true);
          console.error(`Erro ao obter a localização: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationObtained(true);
      console.log("Geolocalização não é suportada por este navegador.");
    }
  }, [isClient]);

  const [ongs, setOngs] = useState<OngMap[]>([]);
  let useCaseGetOngs = new UseCaseFactory().Resolve(UseCasesEnum.GetOngs);

  useEffect(() => {
    getOngs();
  }, []);

  const getOngs = async () => {
    let requestGetOngs = new GetOngsRequest();
    await useCaseGetOngs?.Execute(requestGetOngs);
    if (requestGetOngs.ApiBadResponse != undefined) {
      requestGetOngs.ApiBadResponse.Response.forEach((message) => {
        toast.info(message);
      });
    } else {
      setOngs(requestGetOngs.Ongs);
    }
  };
  const [profileSelect, setProfileSelect] = useState<User>();

  let useCaseGetProfile = new UseCaseFactory().Resolve(UseCasesEnum.GetProfile);

  const GetProfile = async (id: string) => {
    let request = new GetProfileRequest(id?.toString() ?? "");
    await useCaseGetProfile?.Execute(request);
    if (request.ApiBadResponse != undefined) {
      request.ApiBadResponse.Response.forEach((message) => {
        toast.error(message);
      });
    } else {
      setProfileSelect(request.Profile);
    }
  };

  const [mouseProfileVisible, setMouseProfileVisible] =
    useState<boolean>(false);
  const [mouseProfile, setMouseProfile] = useState<OngMap>();
  return (
    <>
      <DefaultLayout>
        <>
          <nav className={clsx(stylesHome.section1, styles.section1)}>
            <div className={styles.Container_Map}>
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
                <Map
                  className={styles.Map}
                  defaultCenter={{
                    lat: defaultRegion.lat,
                    lng: defaultRegion.lng,
                  }}
                  defaultZoom={13}
                  disableDoubleClickZoom={true}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                >
                  {ongs.map((ong) =>{
                    if(ong.Id!==loginResponse.UserInformation?.Id)
                    return(
                    <Marker
                      key={ong.Id}
                      position={{
                        lat: Number.parseFloat(ong.LocationX),
                        lng: Number.parseFloat(ong.LocationY),
                      }}
                      onClick={() => {
                        GetProfile(ong.Id);
                      }}
                      onMouseOver={() => {
                        setMouseProfileVisible(true);
                        setMouseProfile(ong);
                      }}
                      onMouseOut={() => {
                        setTimeout(() => {
                          setMouseProfileVisible(false);
                        }, 1500);
                      }}
                    />
                  )} )}
                </Map>
              </APIProvider>
            </div>
          </nav>
          {profileSelect && (
            <>
              <nav className={clsx(stylesHome.section2, styles.section2)}>
                <ProfileInformations
                  userInformation={profileSelect}
                  map={false}
                />
                <NextLink href={`/Donations/Register/${profileSelect.Id}`}>
                  <Button
                    className={stylesHome.section2_button}
                    isIconOnly
                    color="danger"
                    variant="solid"
                  >
                    <HeartFilledIcon size={25} />
                    Registrar Doação
                  </Button>
                </NextLink>
              </nav>
              <nav className={clsx(styles.section3)}></nav>
            </>
          )}
        </>
        <ProfileMouseEnter
          visible={mouseProfileVisible}
          profile={mouseProfile}
        />
      </DefaultLayout>
    </>
  );
}
