import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '86aabe15a4msh2f537e9708267c5p123bc2jsn5974f7c70e61'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`)
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history/${timePeriod}`)
    }),
    getExchange: builder.query({
      query: () => createRequest(`/exchanges`)
    })
  })
});

const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangeQuery } = cryptoApi;

export { cryptoApi, useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangeQuery };
