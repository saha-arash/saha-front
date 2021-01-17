import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GardeshKar from './gardesh-kar';
import GardeshKarDetail from './gardesh-kar-detail';
import GardeshKarUpdate from './gardesh-kar-update';
import GardeshKarDeleteDialog from './gardesh-kar-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={GardeshKarDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GardeshKarUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GardeshKarUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GardeshKarDetail} />
      <ErrorBoundaryRoute path={match.url} component={GardeshKar} />
    </Switch>
  </>
);

export default Routes;
