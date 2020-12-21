import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HesabResi from './hesab-resi';
import HesabResiDetail from './hesab-resi-detail';
import HesabResiUpdate from './hesab-resi-update';
import HesabResiDeleteDialog from './hesab-resi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={HesabResiDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HesabResiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HesabResiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HesabResiDetail} />
      <ErrorBoundaryRoute path={match.url} component={HesabResi} />
    </Switch>
  </>
);

export default Routes;
