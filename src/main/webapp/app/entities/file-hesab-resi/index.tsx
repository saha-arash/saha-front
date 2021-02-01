import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FileHesabResi from './file-hesab-resi';
import FileHesabResiDetail from './file-hesab-resi-detail';
import FileHesabResiUpdate from './file-hesab-resi-update';
import FileHesabResiDeleteDialog from './file-hesab-resi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FileHesabResiDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/:fileType?/:hesabresiId?/new`} component={FileHesabResiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FileHesabResiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FileHesabResiDetail} />
      <ErrorBoundaryRoute path={`${match.url}/:fileType?/:hesabresiId?`} component={FileHesabResi} />
    </Switch>
  </>
);

export default Routes;
