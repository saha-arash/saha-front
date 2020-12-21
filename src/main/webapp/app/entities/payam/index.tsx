import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Payam from './payam';
import PayamDetail from './payam-detail';
import PayamUpdate from './payam-update';
import PayamDeleteDialog from './payam-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PayamDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PayamUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PayamUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PayamDetail} />
      <ErrorBoundaryRoute path={match.url} component={Payam} />
    </Switch>
  </>
);

export default Routes;
