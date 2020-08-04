import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import RouteWithSubRoutes from './router/RouteWithSubRoutes';
import ROUTES from './routes';

const App = props => {
  return (
    <React.Fragment>
      <header>header</header>
      <main>
        <Switch>
          {ROUTES.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </main>
      <footer>footer</footer>
    </React.Fragment>
  );
};

App.propTypes = {
  props: PropTypes.object
};

App.defaultProps = {
  props: {}
};

export default App;
