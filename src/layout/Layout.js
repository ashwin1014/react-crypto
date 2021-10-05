import React, { useCallback } from 'react';
import { Layout as AntLayout } from 'antd';

import PropTypes from 'prop-types';

import { isPrerendering } from '@utils/prerendererUtils';
import { Loader } from '@sharedComponents';

import '../styles/main.scss';

const Layout = ({ children }) => {
  const showOfflineNotification = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert('You appear to be offline!');
  }, []);
  window.addEventListener('offline', () => showOfflineNotification());
  return (
    <AntLayout className='app-layout' style={{ minHeight: 'calc(100vh - 118px)' }}>
      {isPrerendering() ? <Loader /> : children}
    </AntLayout>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
