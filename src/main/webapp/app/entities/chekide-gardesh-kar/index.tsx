import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChekideGardeshKar from './chekide-gardesh-kar';
import ChekideGardeshKarDetail from './chekide-gardesh-kar-detail';
import ChekideGardeshKarUpdate from './chekide-gardesh-kar-update';
import ChekideGardeshKarDeleteDialog from './chekide-gardesh-kar-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ChekideGardeshKarDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChekideGardeshKarUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChekideGardeshKarUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChekideGardeshKarDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChekideGardeshKar} />
    </Switch>
  </>
);

export default Routes;
