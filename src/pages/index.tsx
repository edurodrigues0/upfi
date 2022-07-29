/* eslint-disable */

import { Box, Button } from '@chakra-ui/react';

import { CardList } from '../components/CardList';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';
import { useInfiniteQuery } from 'react-query';
import { useMemo } from 'react';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

type Response = {
  data: Image[];
  after: string;
}

export default function Home(): JSX.Element {
 
  async function fetchPages({pageParam = null}): Promise<Response> {
    const response = await api.get('/api/images', {
      params: {
        after: pageParam
      }
    });
    console.log(response.data)
    return response.data
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
    fetchPages, {
      getNextPageParam: lastPage => {
        return lastPage?.after || null;
      }
    }
  );

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap((imagesData) => {
      return imagesData.data.flat();
    })

    return formatted;
  }, [data]);

  console.log(formattedData)

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
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
        </Button>
      </Box>
    </>
  );
}
