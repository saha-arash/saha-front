import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RafeIradat from './rafe-iradat';
import RafeIradatDetail from './rafe-iradat-detail';
import RafeIradatUpdate from './rafe-iradat-update';
import RafeIradatDeleteDialog from './rafe-iradat-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RafeIradatDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RafeIradatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RafeIradatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RafeIradatDetail} />
      <ErrorBoundaryRoute path={match.url} component={RafeIradat} />
    </Switch>
  </>
);

export default Routes;
