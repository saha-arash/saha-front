import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BankEtelaati from './bank-etelaati';
import BankEtelaatiDetail from './bank-etelaati-detail';
import BankEtelaatiUpdate from './bank-etelaati-update';
import BankEtelaatiDeleteDialog from './bank-etelaati-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BankEtelaatiDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BankEtelaatiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BankEtelaatiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BankEtelaatiDetail} />
      <ErrorBoundaryRoute path={match.url} component={BankEtelaati} />
    </Switch>
  </>
);

export default Routes;
