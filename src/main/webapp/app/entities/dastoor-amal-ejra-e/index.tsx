import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DastoorAmalEjraE from './dastoor-amal-ejra-e';
import DastoorAmalEjraEDetail from './dastoor-amal-ejra-e-detail';
import DastoorAmalEjraEUpdate from './dastoor-amal-ejra-e-update';
import DastoorAmalEjraEDeleteDialog from './dastoor-amal-ejra-e-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DastoorAmalEjraEDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DastoorAmalEjraEUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DastoorAmalEjraEUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DastoorAmalEjraEDetail} />
      <ErrorBoundaryRoute path={match.url} component={DastoorAmalEjraE} />
    </Switch>
  </>
);

export default Routes;
