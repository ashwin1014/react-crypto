import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': '86aabe15a4msh2f537e9708267c5p123bc2jsn5974f7c70e61'
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers });

const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ count, newsCategory }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
    })
  })
});

const { useGetCryptoNewsQuery } = cryptoNewsApi;

export { cryptoNewsApi, useGetCryptoNewsQuery };
