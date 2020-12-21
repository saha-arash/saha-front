import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import YeganCode from './yegan-code';
import Payam from './payam';
import FileName from './file-name';
import Karbar from './karbar';
import Semat from './semat';
import Morkhasi from './morkhasi';
import Dore from './dore';
import Negahbani from './negahbani';
import BargeMamooriat from './barge-mamooriat';
import HesabResi from './hesab-resi';
import BarnameHesabResi from './barname-hesab-resi';
import FileBargeMamooriat from './file-barge-mamooriat';
import Daraje from './daraje';
import YeganType from './yegan-type';
import NirooCode from './niroo-code';
import Yegan from './yegan';
import FileHesabResi from './file-hesab-resi';
import FileGozaresh from './file-gozaresh';
import Mantaghe from './mantaghe';
import Ostan from './ostan';
import Shahr from './shahr';
import Gozaresh from './gozaresh';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}yegan-code`} component={YeganCode} />
      <ErrorBoundaryRoute path={`${match.url}payam`} component={Payam} />
      <ErrorBoundaryRoute path={`${match.url}file-name`} component={FileName} />
      <ErrorBoundaryRoute path={`${match.url}karbar`} component={Karbar} />
      <ErrorBoundaryRoute path={`${match.url}semat`} component={Semat} />
      <ErrorBoundaryRoute path={`${match.url}morkhasi`} component={Morkhasi} />
      <ErrorBoundaryRoute path={`${match.url}dore`} component={Dore} />
      <ErrorBoundaryRoute path={`${match.url}negahbani`} component={Negahbani} />
      <ErrorBoundaryRoute path={`${match.url}barge-mamooriat`} component={BargeMamooriat} />
      <ErrorBoundaryRoute path={`${match.url}hesab-resi`} component={HesabResi} />
      <ErrorBoundaryRoute path={`${match.url}barname-hesab-resi`} component={BarnameHesabResi} />
      <ErrorBoundaryRoute path={`${match.url}file-barge-mamooriat`} component={FileBargeMamooriat} />
      <ErrorBoundaryRoute path={`${match.url}daraje`} component={Daraje} />
      <ErrorBoundaryRoute path={`${match.url}yegan-type`} component={YeganType} />
      <ErrorBoundaryRoute path={`${match.url}niroo-code`} component={NirooCode} />
      <ErrorBoundaryRoute path={`${match.url}yegan`} component={Yegan} />
      <ErrorBoundaryRoute path={`${match.url}file-hesab-resi`} component={FileHesabResi} />
      <ErrorBoundaryRoute path={`${match.url}file-gozaresh`} component={FileGozaresh} />
      <ErrorBoundaryRoute path={`${match.url}mantaghe`} component={Mantaghe} />
      <ErrorBoundaryRoute path={`${match.url}ostan`} component={Ostan} />
      <ErrorBoundaryRoute path={`${match.url}shahr`} component={Shahr} />
      <ErrorBoundaryRoute path={`${match.url}gozaresh`} component={Gozaresh} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
