// import { lazy } from '@loadable/component'
import { Home } from '@pages';
import prerenderedLoadable from './preRenderedLoadable';

const CryptoCurrencies = prerenderedLoadable(() => import('@pages/CryptoCurrencies'));
const CryptoDetails = prerenderedLoadable(() => import('@pages/CryptoDetails'));
const Exchanges = prerenderedLoadable(() => import('@pages/Exchanges'));
const News = prerenderedLoadable(() => import('@pages/News'));

export const ROUTES = [
  {
    path: '/',
    key: 'Home',
    exact: true,
    isPrivate: false,
    component: Home
  },
  {
    path: '/cryptocurrencies',
    key: 'Settings',
    exact: true,
    isPrivate: false,
    component: CryptoCurrencies
  },
  {
    path: '/crypto/:coinId',
    key: 'Settings',
    exact: true,
    isPrivate: false,
    component: CryptoDetails
  },
  {
    path: '/exchanges',
    key: 'Settings',
    exact: true,
    isPrivate: false,
    component: Exchanges
  },
  {
    path: '/news',
    key: 'Settings',
    exact: true,
    isPrivate: false,
    component: News
  }
];
