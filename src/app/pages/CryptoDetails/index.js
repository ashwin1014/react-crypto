import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Spin } from 'antd';

import {
  AiOutlineFund,
  AiOutlineMoneyCollect,
  AiOutlineDollarCircle,
  AiOutlineExclamationCircle,
  AiOutlineStop,
  AiOutlineTrophy,
  AiOutlineCheckCircle,
  AiOutlineNumber,
  AiOutlineThunderbolt
} from '@icons';
import { useGetCryptoDetailsQuery } from '@services';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  const cryptoDetails = data?.data?.coin;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  if (isFetching) {
    return <Spin />;
  }

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails.price)}`, icon: <AiOutlineDollarCircle /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <AiOutlineNumber /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails.volume)}`, icon: <AiOutlineThunderbolt /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails.marketCap)}`, icon: <AiOutlineDollarCircle /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails.allTimeHigh.price)}`, icon: <AiOutlineTrophy /> }
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <AiOutlineFund /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <AiOutlineMoneyCollect /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.approvedSupply ? <AiOutlineCheckCircle /> : <AiOutlineStop />, icon: <AiOutlineExclamationCircle /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.totalSupply && millify(cryptoDetails.totalSupply)}`, icon: <AiOutlineExclamationCircle /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.circulatingSupply && millify(cryptoDetails.circulatingSupply)}`, icon: <AiOutlineExclamationCircle /> }
  ];

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {data?.data?.coin.name} ({data?.data?.coin.slug}) Price
        </Title>
        <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue='7d' className='select-timeperiod' placeholder='Select Timeperiod' onChange={(value) => setTimeperiod(value)}>
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      {/* lince chart */}
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value, i }) => (
            <Col className='coin-stats' key={i}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='other-stats-info'>
        <Col className='coin-value-statistics-heading'>
          <Title level={3} className='coin-details-heading'>
            Other Stats Info
          </Title>
          <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
        </Col>
        {genericStats.map(({ icon, title, value, i }) => (
          <Col className='coin-stats' key={i}>
            <Col className='coin-stats-name'>
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className='stats'>{value}</Text>
          </Col>
        ))}
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails.name}?
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links?.map((link) => (
            <Row className='coin-link' key={link.name}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
