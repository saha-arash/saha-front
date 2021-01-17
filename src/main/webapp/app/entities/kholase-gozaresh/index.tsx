import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import KholaseGozaresh from './kholase-gozaresh';
import KholaseGozareshDetail from './kholase-gozaresh-detail';
import KholaseGozareshUpdate from './kholase-gozaresh-update';
import KholaseGozareshDeleteDialog from './kholase-gozaresh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={KholaseGozareshDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={KholaseGozareshUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={KholaseGozareshUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={KholaseGozareshDetail} />
      <ErrorBoundaryRoute path={match.url} component={KholaseGozaresh} />
    </Switch>
  </>
);

export default Routes;
