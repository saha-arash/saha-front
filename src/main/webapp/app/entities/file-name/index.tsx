import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FileName from './file-name';
import FileNameDetail from './file-name-detail';
import FileNameUpdate from './file-name-update';
import FileNameDeleteDialog from './file-name-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FileNameDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FileNameUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FileNameUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FileNameDetail} />
      <ErrorBoundaryRoute path={match.url} component={FileName} />
    </Switch>
  </>
);

export default Routes;
