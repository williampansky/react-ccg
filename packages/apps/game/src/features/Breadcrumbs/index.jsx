import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import * as Styled from './styled';

const Breadcrumbs = props => {
  return (
    <Styled.Container>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Styled.Container>
  );
};

export default Breadcrumbs;
