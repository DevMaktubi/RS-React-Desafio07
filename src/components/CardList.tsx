import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE

  const [selectedUrl, setSelectedUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE

  function handleViewImage(url): void {
    setSelectedUrl(url);
    onOpen();
  }

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={3} gap={['40px']}>
        {cards.map(card => (
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          // eslint-disable-next-line react/jsx-no-bind
          <Card
            data={card}
            viewImage={() => handleViewImage(card.url)}
            key={card.id}
          />
        ))}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage isOpen={isOpen} imgUrl={selectedUrl} onClose={onClose} />
    </>
  );
}
