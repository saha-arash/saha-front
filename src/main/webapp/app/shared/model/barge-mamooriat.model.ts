import { Moment } from 'moment';
import { IFileBargeMamooriat } from 'app/shared/model/file-barge-mamooriat.model';
import { IKarbar } from 'app/shared/model/karbar.model';
import { IYegan } from 'app/shared/model/yegan.model';
import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { VaziatBargeMamooriat } from 'app/shared/model/enumerations/vaziat-barge-mamooriat.model';

export interface IBargeMamooriat {
  id?: number;
  vaziat?: VaziatBargeMamooriat;
  saleMamooriat?: number;
  shorooMamooriat?: Moment;
  payanMamooriat?: Moment;
  madareks?: IFileBargeMamooriat[];
  sarparast?: IKarbar;
  yegan?: IYegan;
  hesabResi?: IHesabResi;
  nafars?: IKarbar[];
  binandes?: IKarbar[];
}

export const defaultValue: Readonly<IBargeMamooriat> = {};
