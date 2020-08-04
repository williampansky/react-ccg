import React from 'react';
import { Route } from 'react-router-dom';

/**
 * A special wrapper for <Route> that knows how to
 * handle "sub"-routes by passing them in a `routes`
 * prop to the component it renders.
 *
 * @param {object} route
 * @see https://reactrouter.com/web/example/route-config
 */
export default function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
