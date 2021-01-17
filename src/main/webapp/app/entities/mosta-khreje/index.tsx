import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MostaKhreje from './mosta-khreje';
import MostaKhrejeDetail from './mosta-khreje-detail';
import MostaKhrejeUpdate from './mosta-khreje-update';
import MostaKhrejeDeleteDialog from './mosta-khreje-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MostaKhrejeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MostaKhrejeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MostaKhrejeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MostaKhrejeDetail} />
      <ErrorBoundaryRoute path={match.url} component={MostaKhreje} />
    </Switch>
  </>
);

export default Routes;
