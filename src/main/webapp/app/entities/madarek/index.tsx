import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Madarek from './madarek';
import MadarekDetail from './madarek-detail';
import MadarekUpdate from './madarek-update';
import MadarekDeleteDialog from './madarek-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MadarekDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MadarekUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MadarekUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MadarekDetail} />
      <ErrorBoundaryRoute path={match.url} component={Madarek} />
    </Switch>
  </>
);

export default Routes;
