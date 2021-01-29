import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BarnameHesabResi from './barname-hesab-resi';
import BarnameHesabResiDetail from './barname-hesab-resi-detail';
import BarnameHesabResiUpdate from './barname-hesab-resi-update';
import BarnameHesabResiDeleteDialog from './barname-hesab-resi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BarnameHesabResiDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BarnameHesabResiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BarnameHesabResiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BarnameHesabResiDetail} />
      {/* <ErrorBoundaryRoute exact path={`${match.url}/:id/:item`} component={} /> */}
      <ErrorBoundaryRoute path={match.url} component={BarnameHesabResi} />
    </Switch>
  </>
);

export default Routes;
