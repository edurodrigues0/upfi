/* eslint-disable */

import {
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
  imgAlt: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
  imgAlt,
}: ModalViewImageProps): JSX.Element {
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW='900px'
        maxH='600px'
      >
        <ModalBody
          bg='pGray.800'>
          <Image
            src={imgUrl}
            alt={imgAlt}
            w='100%'
          />
        </ModalBody>
        <ModalFooter
          bg='pGray.800'
          h='2rem'
          py='20px'
          justifyContent="left"
        >
          <Link href={imgUrl} isExternal fontSize='1rem' mr='auto'>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
