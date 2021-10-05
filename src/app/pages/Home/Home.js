import React from 'react';
import { Typography, Row, Col, Statistic, Spin } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';

import { Head } from '@sharedComponents';
import { useGetCryptosQuery } from '@services';
import CryptoCurrencies from '@pages/CryptoCurrencies';
import News from '@pages/News';
// import './Home.style.scss';

const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery();

  const globalStats = data?.data?.stats;

  console.log(data);

  return (
    <>
      <Head>
        <title>Global Crypto Stats</title>
      </Head>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>
      {isFetching ? (
        <Spin />
      ) : (
        <>
          <Row>
            <Col span={12}>
              <Statistic title='Total Cryptocurrencies' value={globalStats?.total} />
            </Col>
            <Col span={12}>
              <Statistic title='Total Exchanges' value={millify(globalStats?.totalExchanges)} />
            </Col>
            <Col span={12}>
              <Statistic title='Total Market Cap' value={millify(globalStats?.totalMarketCap)} />
            </Col>
            <Col span={12}>
              <Statistic title='Total 24h Volume' value={millify(globalStats?.total24hVolume)} />
            </Col>
            <Col span={12}>
              <Statistic title='Total Markets' value={millify(globalStats?.totalMarkets)} />
            </Col>
          </Row>
          <div className='home-heading-container'>
            <Title level={2} className='home-title'>
              Top 10 Cryptocurrencies in the world
            </Title>
            <Title level={3} className='show-more'>
              <Link to='/cryptocurrencies'>Show More</Link>
            </Title>
          </div>
          <CryptoCurrencies simplified />
          <div className='home-heading-container'>
            <Title level={2} className='home-title'>
              Latest Crypto News
            </Title>
            <Title level={3} className='show-more'>
              <Link to='/news'>Show More</Link>
            </Title>
          </div>
          <News simplified />
        </>
      )}
    </>
  );
};

export default Home;
