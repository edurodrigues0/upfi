/* eslint-disable */

import { SimpleGrid, useDisclosure } from '@chakra-ui/react';

import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';
import { useState } from 'react'

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  function handleViewImage(urlImg: string, altImg: string) {
    setUrl(urlImg);
    onOpen();
  }
  console.log(cards)

  return (
    <>
      <SimpleGrid columns={3} spacing='40px'>
        {cards && cards.map((card) => (
          <Card
            key={card.id}
            data={card}
            viewImage={() => handleViewImage(card.url, card.title)}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage
        isOpen={isOpen}
        imgUrl={url}
        imgAlt={alt}
        onClose={onClose}
      />
    </>
  );
}
