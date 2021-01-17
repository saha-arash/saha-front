import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MohasebeHazineMamooriat from './mohasebe-hazine-mamooriat';
import MohasebeHazineMamooriatDetail from './mohasebe-hazine-mamooriat-detail';
import MohasebeHazineMamooriatUpdate from './mohasebe-hazine-mamooriat-update';
import MohasebeHazineMamooriatDeleteDialog from './mohasebe-hazine-mamooriat-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MohasebeHazineMamooriatDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MohasebeHazineMamooriatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MohasebeHazineMamooriatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MohasebeHazineMamooriatDetail} />
      <ErrorBoundaryRoute path={match.url} component={MohasebeHazineMamooriat} />
    </Switch>
  </>
);

export default Routes;
