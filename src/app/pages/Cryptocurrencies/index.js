import React, { useState, useMemo, useEffect } from 'react';
import { Card, Row, Col, Spin, Image, Input } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';

import { Head } from '@sharedComponents';
import { useGetCryptosQuery } from '@services';

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const cryptos = useMemo(() => cryptosList?.data?.coins, [cryptosList?.data?.coins]);

  const [state, setState] = useState();
  const [searchTerm, setSearchTerm] = useState();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setState(cryptos);
    if (searchTerm) {
      const filteredData = cryptos.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setState(filteredData);
    }
  }, [cryptos, searchTerm]);

  return (
    <>
      <Head>
        <title>CryptoCurrencies</title>
      </Head>
      {isFetching ? (
        <Spin />
      ) : (
        <>
          {!simplified && (
            <div className='search-crypto'>
              <Input onChange={handleChange} value={searchTerm} placeHolder='Search Cryptos' />
            </div>
          )}

          <Row gutter={[32, 32]} className='crypto-card-container'>
            {state?.map((currency) => (
              <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                <Link to={`/crypto/${currency.id}`}>
                  <Card title={`${currency.rank} ${currency.name}`} extra={<Image src={currency.iconUrl} alt={currency.name} width={30} />} hoverable>
                    <p>Price: {millify(currency.price)}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>Daily Change: {millify(currency.change)}</p>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default CryptoCurrencies;
