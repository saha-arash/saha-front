import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GardeshkarBarnameHesabresi from './gardeshkar-barname-hesabresi';
import GardeshkarBarnameHesabresiDetail from './gardeshkar-barname-hesabresi-detail';
import GardeshkarBarnameHesabresiUpdate from './gardeshkar-barname-hesabresi-update';
import GardeshkarBarnameHesabresiDeleteDialog from './gardeshkar-barname-hesabresi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={GardeshkarBarnameHesabresiDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GardeshkarBarnameHesabresiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GardeshkarBarnameHesabresiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GardeshkarBarnameHesabresiDetail} />
      <ErrorBoundaryRoute path={match.url} component={GardeshkarBarnameHesabresi} />
    </Switch>
  </>
);

export default Routes;
