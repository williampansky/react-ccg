import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Row, Col, PageHeader } from 'antd';
import * as Styled from './styled';

const PlayPage = props => {
  const { routes: parentRoutes } = props;
  const { routes: childRoutes } = parentRoutes.find(obj => obj.key === 'PLAY');
  let history = useHistory();

  return (
    <Styled.Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <PageHeader
            ghost={false}
            onBack={() => history.goBack()}
            title="Play"
          />
        </Col>
        {childRoutes.map((route, i) =>
          route.visible ? (
            <Col span={12} key={i}>
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

export default PlayPage;
