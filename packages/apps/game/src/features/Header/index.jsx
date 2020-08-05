import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import ROUTES from '../../routes';
import * as Styled from './styled';

const Header = props => {
  return (
    <Styled.Container>
      <Layout.Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={ROUTES[0].key}
        >
          {ROUTES.map(route => (
            <Menu.Item key={route.key}>
              <Link to={route.path}>{route.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Header>
    </Styled.Container>
  );
};

export default Header;
