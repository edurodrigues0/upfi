/* eslint-disable */

import { Box, Button } from '@chakra-ui/react';

import { CardList } from '../components/CardList';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';
import { useInfiniteQuery } from 'react-query';
import { useMemo } from 'react';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface FetchImagesPageResponse {
  after: string;
  data: Image[];
}

export default function Home(): JSX.Element {
  async function fetchImagesPage({
    pageParam = null,
  }): Promise<FetchImagesPageResponse> {
    const { data } = await api('/api/images', {
      params: {
        after: pageParam,
      },
    });
    return data;
  }
  
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImagesPage, {
      getNextPageParam: lastPage => lastPage?.after ?? null,
    }
  );

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(imageData => {
      return imageData.data.flat();
    });
    return formatted;
  }, [data]);


  if(isLoading && !isError) {
    return <Loading />
  }

  if(!isLoading && isError) {
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        <Button
          mt='40px'
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {!isFetchingNextPage ? "Carregar mais" : "Carregando..."}
        </Button>
      </Box>
    </>
  );
}
