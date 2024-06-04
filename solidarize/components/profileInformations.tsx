import User from "@/Domain/Model/Login/User";
import stylesLogin from "@/styles/pages/Login/login.module.scss";
import stylesProfile from "@/styles/pages/Profile/myProfile.module.scss";
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
    <a onClick={()=>{
            setModalContent(<Image
                alt="Imagem do Usuario"
                src={`${process.env.NEXT_PUBLIC_CONTAINER_IMAGE}${
                  userInformation.$Icon!.split(".")[0]
                }`}/>);
            setModalOpen(true);
        }}>
    <Image
        alt="Imagem do Usuario"
        className={stylesProfile.Icon_View_Container_Image}
        src={`${process.env.NEXT_PUBLIC_CONTAINER_IMAGE}${
          userInformation.$Icon!.split(".")[0]
        }`}
      />
    </a>
    <ImageModal
          className={styles.Image_Modal} 
          isOpen={modalOpen}
          size={"5xl"}
          onClose={()=>{setModalOpen(false);}}>
        {modalContent}
    </ImageModal>
    </>
  );
};

export default ProfileInformations;
