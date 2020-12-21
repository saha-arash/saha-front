import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Gozaresh from './gozaresh';
import GozareshDetail from './gozaresh-detail';
import GozareshUpdate from './gozaresh-update';
import GozareshDeleteDialog from './gozaresh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={GozareshDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GozareshUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GozareshUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GozareshDetail} />
      <ErrorBoundaryRoute path={match.url} component={Gozaresh} />
    </Switch>
  </>
);

export default Routes;
