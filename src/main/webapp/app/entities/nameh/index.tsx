import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Nameh from './nameh';
import NamehDetail from './nameh-detail';
import NamehUpdate from './nameh-update';
import NamehDeleteDialog from './nameh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={NamehDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NamehUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/:hesabresiId/edit`} component={NamehUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NamehDetail} />
      <ErrorBoundaryRoute path={match.url} component={Nameh} />
    </Switch>
  </>
);

export default Routes;
