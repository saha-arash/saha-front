import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BilanSalGhabl from './bilan-sal-ghabl';
import BilanSalGhablDetail from './bilan-sal-ghabl-detail';
import BilanSalGhablUpdate from './bilan-sal-ghabl-update';
import BilanSalGhablDeleteDialog from './bilan-sal-ghabl-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BilanSalGhablDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BilanSalGhablUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BilanSalGhablUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BilanSalGhablDetail} />
      <ErrorBoundaryRoute path={match.url} component={BilanSalGhabl} />
    </Switch>
  </>
);

export default Routes;
