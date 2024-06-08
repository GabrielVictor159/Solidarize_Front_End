import OngMap from "@/Domain/Model/Map/OngMap";
import styles from "@/styles/components/profileMouseEnter.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  image,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { TruncateText } from "@/Domain/config/functions";
interface ProfileMouseEnterProps {
  visible: boolean;
  profile?: OngMap;
}
const ProfileMouseEnter: React.FC<ProfileMouseEnterProps> = ({
  visible,
  profile,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);

    useEffect(() => {
      if (containerRef.current) {
        const { current: elemento } = containerRef;
        const { offsetWidth, offsetHeight } = elemento;

        const leftPosition = mousePosition.x + window.scrollX;
        const topPosition = mousePosition.y - offsetHeight + window.scrollY;

        elemento.style.position = "absolute";
        elemento.style.left = `${leftPosition}px`;
        elemento.style.top = `${topPosition}px`;
      }
    }, [mousePosition]);

  return (
    <>
      {visible === true ? (
        <div ref={containerRef} className={styles.Container}>
          {profile !== undefined ? (
            <>
              <Image
                alt="Imagem do Usuario"
                className={styles.Icon}
                src={`/api/comprimir-imagem?url=${encodeURIComponent(
                  process.env.NEXT_PUBLIC_CONTAINER_IMAGE + profile.Icon.split(".")[0]
                )}`}
              />
              <br/>
              <h1>{profile.CompanyName}</h1>
              <br/>
              <p>{TruncateText(profile.Description,100)}</p>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileMouseEnter;
