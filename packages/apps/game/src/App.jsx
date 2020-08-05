import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { Layout } from 'antd';
import RouteWithSubRoutes from './router/RouteWithSubRoutes';
import ROUTES from './routes';

const App = props => {
  const { Content } = Layout;
  return (
    <Layout>
      <Content>
        <Switch>
          {ROUTES.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Content>
    </Layout>
  );
};

App.propTypes = {
  props: PropTypes.object
};

App.defaultProps = {
  props: {}
};

export default App;
