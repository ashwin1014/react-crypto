/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import { Link } from 'react-router-dom';

import Favicon from 'react-favicon';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { Typography, Space } from 'antd';

import { Navbar } from '@sharedComponents';

import { ErrorBoundary } from '@hoc';
import theme from '../styles/styleUtils/styledVariables';
import Layout from '../layout/Layout';
import AppRoutes from '../base/Routes';

// TODO: use sass variables with styled: below loader causing issue on build
// const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/styleUtils/_variables.scss');

// console.log(theme);

const App = () => {
  return (
    <HelmetProvider>
      <Favicon url='https://img.icons8.com/plasticine/344/react.png' />
      <ThemeProvider theme={theme}>
        <>
          <ErrorBoundary>
            <Helmet>
              <meta name='description' content='React Crypto App' />
            </Helmet>
            <div className='app'>
              <Navbar />
            </div>
            <div className='main'>
              <Layout>
                <div style={{ marginLeft: 280 }}>
                  <AppRoutes />
                </div>
              </Layout>
            </div>
            <div className='footer'>
              <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                Copyright © 2021 &nbsp;
                <Link to='/'>Cryptoverse Inc.</Link> <br />
                All Rights Reserved.
              </Typography.Title>
              <Space>
                <Link to='/'>Home</Link>
                <Link to='/exchanges'>Exchanges</Link>
                <Link to='/news'>News</Link>
              </Space>
            </div>
          </ErrorBoundary>
        </>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
