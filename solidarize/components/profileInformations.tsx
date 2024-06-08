import User from "@/Domain/Model/Login/User";
import styles from "@/styles/components/profileInformations.module.scss";
import {
  Button,
  image,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import ImageModal from "./imageModal";
import clsx from "clsx";
import {
  APIProvider,
  Map,
  MapMouseEvent,
  Marker,
} from "@vis.gl/react-google-maps";
interface profileInformationsProps {
  userInformation: User;
  map?: boolean;
}

const ProfileInformations: React.FC<profileInformationsProps> = ({
  userInformation,
  map = true,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();

  return (
    <>
      <a
        onClick={() => {
          setModalContent(
            <Image
              alt="Imagem do Usuario"
              src={`${process.env.NEXT_PUBLIC_CONTAINER_IMAGE}${
                userInformation.$Icon!.split(".")[0]
              }`}
            />
          );
          setModalOpen(true);
        }}
      >
        <Image
          alt="Imagem do Usuario"
          className={clsx(styles.Icon_View_Container_Image, styles.Image_Icon)}
          src={`/api/comprimir-imagem?url=${encodeURIComponent(process.env.NEXT_PUBLIC_CONTAINER_IMAGE + userInformation.$Icon!.split(".")[0])}`}
        />
      </a>
      <br />
      <div className={styles.Images_Container}>
        {userInformation.$Images?.map((e) => {
          return (
            <>
              <a
                onClick={() => {
                  setModalContent(
                    <Image
                      alt="Imagem do Usuario"
                      src={`${process.env.NEXT_PUBLIC_CONTAINER_IMAGE}${
                        e!.split(".")[0]
                      }`}
                    />
                  );
                  setModalOpen(true);
                }}
              >
                <Image
                  alt="Imagem do Usuario"
                  className={clsx(
                    styles.Icon_View_Container_Image,
                    styles.Images
                  )}
                  src={`/api/comprimir-imagem?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_CONTAINER_IMAGE}${
                    e!.split(".")[0]
                  }`)}`}
                />
              </a>
            </>
          );
        })}
      </div>
      <br />
      <br />
      <h1 className={styles.Title_Itens}>Nome da Empresa</h1>
      <p className={styles.Text_Itens}>{userInformation.$CompanyName}</p>
      <h1 className={styles.Title_Itens}>Descrição</h1>
      <p className={styles.Text_Itens}>{userInformation.$Description}</p>
      <h1 className={styles.Title_Itens}>Endereço</h1>
      <p className={styles.Text_Itens}>{userInformation.$Address}</p>
      <h1 className={styles.Title_Itens}>CNPJ</h1>
      <p className={styles.Text_Itens}>{userInformation.$CNPJ}</p>
      <h1 className={styles.Title_Itens}>Email</h1>
      <p className={styles.Text_Itens}>{userInformation.$Email}</p>
      <h1 className={styles.Title_Itens}>Natureza Legal</h1>
      <p className={styles.Text_Itens}>{userInformation.$LegalNature}</p>
      <h1 className={styles.Title_Itens}>Telefone</h1>
      <p className={styles.Text_Itens}>{userInformation.$Telefone}</p>
      <br />
      {map ===true?
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
        <Map
          className={styles.Map}
          defaultCenter={{
            lat: Number.parseFloat(userInformation.$LocationX ?? "0"),
            lng: Number.parseFloat(userInformation.$LocationY ?? "0"),
          }}
          defaultZoom={13}
          disableDoubleClickZoom={true}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />

        <Marker position={{
            lat: Number.parseFloat(userInformation.$LocationX ?? "0"),
            lng: Number.parseFloat(userInformation.$LocationY ?? "0"),
          }} />
      </APIProvider>
      :<></>
      }
      <br/>
      <ImageModal
        className={styles.Image_Modal}
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

export default ProfileInformations;

