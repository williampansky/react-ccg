import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, PageHeader } from 'antd';
import * as Styled from './styled';

const Homepage = props => {
  const { routes: parentRoutes } = props;
  return (
    <Styled.Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <PageHeader
            backIcon={false}
            ghost={false}
            onBack={() => {}}
            title="react-ccg"
          />
        </Col>
        {parentRoutes.map((route, i) =>
          route.visible ? (
            <Col span={6} key={i}>
              <Link to={route.path}>
                <Button
                  block
                  disabled={route.disabled}
                  size="large"
                  type="dashed"
                >
                  {route.name}
                </Button>
              </Link>
            </Col>
          ) : null
        )}
      </Row>
    </Styled.Container>
  );
};

export default Homepage;
