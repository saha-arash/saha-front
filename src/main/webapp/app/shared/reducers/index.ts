import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import yeganCode, {
  YeganCodeState
} from 'app/entities/yegan-code/yegan-code.reducer';
// prettier-ignore
import payam, {
  PayamState
} from 'app/entities/payam/payam.reducer';
// prettier-ignore
import fileName, {
  FileNameState
} from 'app/entities/file-name/file-name.reducer';
// prettier-ignore
import karbar, {
  KarbarState
} from 'app/entities/karbar/karbar.reducer';
// prettier-ignore
import semat, {
  SematState
} from 'app/entities/semat/semat.reducer';
// prettier-ignore
import morkhasi, {
  MorkhasiState
} from 'app/entities/morkhasi/morkhasi.reducer';
// prettier-ignore
import dore, {
  DoreState
} from 'app/entities/dore/dore.reducer';
// prettier-ignore
import negahbani, {
  NegahbaniState
} from 'app/entities/negahbani/negahbani.reducer';
// prettier-ignore
import bargeMamooriat, {
  BargeMamooriatState
} from 'app/entities/barge-mamooriat/barge-mamooriat.reducer';
// prettier-ignore
import hesabResi, {
  HesabResiState
} from 'app/entities/hesab-resi/hesab-resi.reducer';
// prettier-ignore
import barnameHesabResi, {
  BarnameHesabResiState
} from 'app/entities/barname-hesab-resi/barname-hesab-resi.reducer';
// prettier-ignore
import fileBargeMamooriat, {
  FileBargeMamooriatState
} from 'app/entities/file-barge-mamooriat/file-barge-mamooriat.reducer';
// prettier-ignore
import daraje, {
  DarajeState
} from 'app/entities/daraje/daraje.reducer';
// prettier-ignore
import yeganType, {
  YeganTypeState
} from 'app/entities/yegan-type/yegan-type.reducer';
// prettier-ignore
import nirooCode, {
  NirooCodeState
} from 'app/entities/niroo-code/niroo-code.reducer';
// prettier-ignore
import yegan, {
  YeganState
} from 'app/entities/yegan/yegan.reducer';
// prettier-ignore
import fileHesabResi, {
  FileHesabResiState
} from 'app/entities/file-hesab-resi/file-hesab-resi.reducer';
// prettier-ignore
import fileGozaresh, {
  FileGozareshState
} from 'app/entities/file-gozaresh/file-gozaresh.reducer';
// prettier-ignore
import mantaghe, {
  MantagheState
} from 'app/entities/mantaghe/mantaghe.reducer';
// prettier-ignore
import ostan, {
  OstanState
} from 'app/entities/ostan/ostan.reducer';
// prettier-ignore
import shahr, {
  ShahrState
} from 'app/entities/shahr/shahr.reducer';
// prettier-ignore
import gozaresh, {
  GozareshState
} from 'app/entities/gozaresh/gozaresh.reducer';
// prettier-ignore
import mohasebeHazineMamooriat, {
  MohasebeHazineMamooriatState
} from 'app/entities/mohasebe-hazine-mamooriat/mohasebe-hazine-mamooriat.reducer';
// prettier-ignore
import dastoorAmalEjraE, {
  DastoorAmalEjraEState
} from 'app/entities/dastoor-amal-ejra-e/dastoor-amal-ejra-e.reducer';
// prettier-ignore
import gardeshkarBarnameHesabresi, {
  GardeshkarBarnameHesabresiState
} from 'app/entities/gardeshkar-barname-hesabresi/gardeshkar-barname-hesabresi.reducer';
// prettier-ignore
import madarek, {
  MadarekState
} from 'app/entities/madarek/madarek.reducer';
// prettier-ignore
import bilanSalGhabl, {
  BilanSalGhablState
} from 'app/entities/bilan-sal-ghabl/bilan-sal-ghabl.reducer';
// prettier-ignore
import gozareshHozoor, {
  GozareshHozoorState
} from 'app/entities/gozaresh-hozoor/gozaresh-hozoor.reducer';
// prettier-ignore
import chekideGardeshKar, {
  ChekideGardeshKarState
} from 'app/entities/chekide-gardesh-kar/chekide-gardesh-kar.reducer';
// prettier-ignore
import bilanSeSalGhabl, {
  BilanSeSalGhablState
} from 'app/entities/bilan-se-sal-ghabl/bilan-se-sal-ghabl.reducer';
// prettier-ignore
import mostaKhreje, {
  MostaKhrejeState
} from 'app/entities/mosta-khreje/mosta-khreje.reducer';
// prettier-ignore
import rafeIradat, {
  RafeIradatState
} from 'app/entities/rafe-iradat/rafe-iradat.reducer';
// prettier-ignore
import bankEtelaati, {
  BankEtelaatiState
} from 'app/entities/bank-etelaati/bank-etelaati.reducer';
// prettier-ignore
import nameh, {
  NamehState
} from 'app/entities/nameh/nameh.reducer';
// prettier-ignore
import kholaseGozaresh, {
  KholaseGozareshState
} from 'app/entities/kholase-gozaresh/kholase-gozaresh.reducer';
// prettier-ignore
import gardeshKar, {
  GardeshKarState
} from 'app/entities/gardesh-kar/gardesh-kar.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly yeganCode: YeganCodeState;
  readonly payam: PayamState;
  readonly fileName: FileNameState;
  readonly karbar: KarbarState;
  readonly semat: SematState;
  readonly morkhasi: MorkhasiState;
  readonly dore: DoreState;
  readonly negahbani: NegahbaniState;
  readonly bargeMamooriat: BargeMamooriatState;
  readonly hesabResi: HesabResiState;
  readonly barnameHesabResi: BarnameHesabResiState;
  readonly fileBargeMamooriat: FileBargeMamooriatState;
  readonly daraje: DarajeState;
  readonly yeganType: YeganTypeState;
  readonly nirooCode: NirooCodeState;
  readonly yegan: YeganState;
  readonly fileHesabResi: FileHesabResiState;
  readonly fileGozaresh: FileGozareshState;
  readonly mantaghe: MantagheState;
  readonly ostan: OstanState;
  readonly shahr: ShahrState;
  readonly gozaresh: GozareshState;
  readonly mohasebeHazineMamooriat: MohasebeHazineMamooriatState;
  readonly dastoorAmalEjraE: DastoorAmalEjraEState;
  readonly gardeshkarBarnameHesabresi: GardeshkarBarnameHesabresiState;
  readonly madarek: MadarekState;
  readonly bilanSalGhabl: BilanSalGhablState;
  readonly gozareshHozoor: GozareshHozoorState;
  readonly chekideGardeshKar: ChekideGardeshKarState;
  readonly bilanSeSalGhabl: BilanSeSalGhablState;
  readonly mostaKhreje: MostaKhrejeState;
  readonly rafeIradat: RafeIradatState;
  readonly bankEtelaati: BankEtelaatiState;
  readonly nameh: NamehState;
  readonly kholaseGozaresh: KholaseGozareshState;
  readonly gardeshKar: GardeshKarState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

// TODO: wanna know more about this
const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  yeganCode,
  payam,
  fileName,
  karbar,
  semat,
  morkhasi,
  dore,
  negahbani,
  bargeMamooriat,
  hesabResi,
  barnameHesabResi,
  fileBargeMamooriat,
  daraje,
  yeganType,
  nirooCode,
  yegan,
  fileHesabResi,
  fileGozaresh,
  mantaghe,
  ostan,
  shahr,
  gozaresh,
  mohasebeHazineMamooriat,
  dastoorAmalEjraE,
  gardeshkarBarnameHesabresi,
  madarek,
  bilanSalGhabl,
  gozareshHozoor,
  chekideGardeshKar,
  bilanSeSalGhabl,
  mostaKhreje,
  rafeIradat,
  bankEtelaati,
  nameh,
  kholaseGozaresh,
  gardeshKar,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
