import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FileBargeMamooriat from './file-barge-mamooriat';
import FileBargeMamooriatDetail from './file-barge-mamooriat-detail';
import FileBargeMamooriatUpdate from './file-barge-mamooriat-update';
import FileBargeMamooriatDeleteDialog from './file-barge-mamooriat-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FileBargeMamooriatDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new/:bmId?`} component={FileBargeMamooriatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FileBargeMamooriatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FileBargeMamooriatDetail} />
      <ErrorBoundaryRoute path={match.url} component={FileBargeMamooriat} />
    </Switch>
  </>
);

export default Routes;
