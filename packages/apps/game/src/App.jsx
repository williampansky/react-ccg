import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import RouteWithSubRoutes from './router/RouteWithSubRoutes';
import ROUTES from './routes';
import { PlaySingleplayer } from './pages';
import GameLocal from './GameLocal';

const App = props => {
  const playRoute = ROUTES.find(obj => obj.key === 'PLAY');
  const spRoute = playRoute.routes.find(obj => obj.key === 'PLAY_SINGLEPLAYER');
  const mpRoute = playRoute.routes.find(obj => obj.key === 'PLAY_MULTIPLAYER');
  const { Content } = Layout;
  let location = useLocation();

  if (location.pathname === spRoute.path) return <GameLocal />;
  else if (location.pathname === mpRoute.path)
    return <Route exact path={mpRoute.path} />;
  else
    return (
      <Layout>
        <Content>
          <Switch>
            {ROUTES.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} routes={ROUTES} />
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
