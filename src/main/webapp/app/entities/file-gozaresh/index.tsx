import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FileGozaresh from './file-gozaresh';
import FileGozareshDetail from './file-gozaresh-detail';
import FileGozareshUpdate from './file-gozaresh-update';
import FileGozareshDeleteDialog from './file-gozaresh-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FileGozareshDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FileGozareshUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FileGozareshUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FileGozareshDetail} />
      <ErrorBoundaryRoute path={match.url} component={FileGozaresh} />
    </Switch>
  </>
);

export default Routes;
