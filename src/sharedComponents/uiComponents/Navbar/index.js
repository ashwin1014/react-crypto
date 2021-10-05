import React from 'react';
import { Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { AiOutlineHome, AiOutlineBulb, AiOutlineMoneyCollect, AiOutlineFund } from '@icons'; // AiOutlineMenu
import { logo } from '@images';

const Navbar = () => {
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={logo} />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
      </div>
      <Menu theme='dark'>
        <Menu.Item icon={<AiOutlineHome />}>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item icon={<AiOutlineFund />}>
          <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<AiOutlineMoneyCollect />}>
          <Link to='/exchanges'>Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<AiOutlineBulb />}>
          <Link to='/news'>News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
