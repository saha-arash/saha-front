import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GozareshHozoor from './gozaresh-hozoor';
import GozareshHozoorDetail from './gozaresh-hozoor-detail';
import GozareshHozoorUpdate from './gozaresh-hozoor-update';
import GozareshHozoorDeleteDialog from './gozaresh-hozoor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={GozareshHozoorDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GozareshHozoorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GozareshHozoorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GozareshHozoorDetail} />
      <ErrorBoundaryRoute path={match.url} component={GozareshHozoor} />
    </Switch>
  </>
);

export default Routes;
