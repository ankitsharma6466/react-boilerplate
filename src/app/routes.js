import React from 'react';
import { Route, Switch }  from 'react-router-dom';

import NotFound from "../views/notfound"
import Home from "../views/home"
//GENERATE_WRITE_IMPORT

/**
 * Defines components to routes mapping.
 *
 * Everytime a new view is created, entry is required here to map the component to a specific route.
 *
 * [IMPORTANT]
 * 1. All route entries are required to be done before the notFound component.
 *
 * 2. Do not delete these comments,
 *
 * //GENERATE_WRITE_IMPORT
 * //GENERATE_WRITE_ROUTER
 *
 * these are placeholders for auto entry creation and are used by component generators.
 *
 * @returns {XML}
 */
export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      {/*GENERATE_WRITE_ROUTER*/}
      <Route path="*" component={NotFound}/>
    </Switch>
  );
}