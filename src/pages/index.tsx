import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    async ({ pageParam = null }) => {
      const response = await api.get('/api/images', {
        params: { after: pageParam },
      });
      return response.data;
    },
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      // eslint-disable-next-line no-shadow
      getNextPageParam: data => {
        if (data.after) {
          return data.after;
        }
        return null;
      },
    }
  );

  const formattedData = useMemo(() => {
    if (data) {
      let allData = [];
      // eslint-disable-next-line array-callback-return
      data?.pages.map(page => {
        allData = [...allData, ...page.data];
      });
      return allData;
    }
    return [];
  }, [data]);

  // TODO RENDER LOADING SCREEN

  if (isLoading) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {hasNextPage && (
          <Button
            onClick={() => {
              fetchNextPage();
            }}
            isLoading={isFetchingNextPage}
            loadingText="Carregando..."
            variantColor="teal"
            variant="outline"
            size="lg"
            mt={20}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
