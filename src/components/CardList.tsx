/* eslint-disable */

import { SimpleGrid, useDisclosure } from '@chakra-ui/react';

import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';
import { useState } from 'react';

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
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      {/* TODO CARD GRID */}

      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
