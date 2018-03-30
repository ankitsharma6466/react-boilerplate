import React from 'react';
import { Route, Switch }  from 'react-router-dom';

import NotFound from "../views/notfound"
import Home from "../views/home"
//GENERATE_WRITE_IMPORT

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      {/*GENERATE_WRITE_ROUTER*/}
      <Route path="*" component={NotFound}/>
    </Switch>
  );
}