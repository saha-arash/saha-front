import { Moment } from 'moment';
import { IFileBargeMamooriat } from 'app/shared/model/file-barge-mamooriat.model';
import { IKarbar } from 'app/shared/model/karbar.model';
import { VaziatBargeMamooriat } from 'app/shared/model/enumerations/vaziat-barge-mamooriat.model';

export interface IBargeMamooriat {
  id?: number;
  vaziat?: VaziatBargeMamooriat;
  saleMamooriat?: number;
  shorooMamooriat?: Moment;
  payanMamooriat?: Moment;
  madareks?: IFileBargeMamooriat[];
  sarparastId?: number;
  yeganId?: number;
  hesabResiId?: number;
  nafars?: IKarbar[];
  nafarat?: IKarbar[];
  binandes?: IKarbar[];
  binandegan?: IKarbar[];
}

export const defaultValue: Readonly<IBargeMamooriat> = {};
