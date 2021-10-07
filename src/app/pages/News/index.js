/* eslint-disable react/no-array-index-key */
import React, { useMemo, useState } from 'react';
import { Card, Row, Col, Spin, Avatar, Typography, Select } from 'antd';
import moment from 'moment';

import { Head } from '@sharedComponents';
import { useGetCryptoNewsQuery, useGetCryptosQuery } from '@services';

const { Title, Text } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const count = simplified ? 6 : 12;
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count });

  const newsList = useMemo(() => cryptoNews?.value, [cryptoNews?.value]);

  return (
    <>
      <Head>News</Head>
      {isFetching ? (
        <Spin />
      ) : (
        <Row gutter={[24, 24]}>
          {!simplified && (
            <Col span={24}>
              <Select
                showSearch
                className='select-news'
                placeholder='Select a Crypto'
                optionFilterProp='children'
                onChange={(value) => setNewsCategory(value)}
                // eslint-disable-next-line prettier/prettier
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value='Cryptocurency'>Cryptocurrency</Option>
                {data?.data?.coins?.map((currency, i) => (
                  <Option value={currency.name} key={i}>
                    {currency.name}
                  </Option>
                ))}
              </Select>
            </Col>
          )}
          {newsList?.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className='news-card'>
                <a href={news.url} target='_blank' rel='noreferrer'>
                  <div className='news-image-container'>
                    <Title className='news-title' level={4}>
                      {news.name}
                    </Title>
                    <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt='' />
                  </div>
                  <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                  <div className='provider-container'>
                    <div>
                      <Avatar src={news.provider?.[0]?.image?.thumbnail?.contentUrl || demoImage} alt='' />
                      <Text className='provider-name'>{news.provider?.[0]?.name}</Text>
                    </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default News;
