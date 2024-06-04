import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?:string;
  size?:"sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "3xl" | "4xl" | "5xl" | "full" | undefined;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  size
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} className={className} size={size}>
      <ModalContent>
        {(onClose) => (
          <>
            {children}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
