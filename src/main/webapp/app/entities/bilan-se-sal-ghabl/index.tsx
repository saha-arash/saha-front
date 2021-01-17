import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BilanSeSalGhabl from './bilan-se-sal-ghabl';
import BilanSeSalGhablDetail from './bilan-se-sal-ghabl-detail';
import BilanSeSalGhablUpdate from './bilan-se-sal-ghabl-update';
import BilanSeSalGhablDeleteDialog from './bilan-se-sal-ghabl-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BilanSeSalGhablDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BilanSeSalGhablUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BilanSeSalGhablUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BilanSeSalGhablDetail} />
      <ErrorBoundaryRoute path={match.url} component={BilanSeSalGhabl} />
    </Switch>
  </>
);

export default Routes;
