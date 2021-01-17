import { IKarbar } from 'app/shared/model/karbar.model';
import { IPayam } from 'app/shared/model/payam.model';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { IYegan } from 'app/shared/model/yegan.model';

export interface IYegan {
  id?: number;
  name?: string;
  code?: string;
  karbars?: IKarbar[];
  sandoghVoroodis?: IPayam[];
  snadoghKhoroojis?: IPayam[];
  bargeMamoorits?: IBargeMamooriat[];
  zirYegans?: IYegan[];
  yeganCodeId?: number;
  nirooCodeId?: number;
  shahrId?: number;
  yeganTypeId?: number;
  yegans?: IYegan[];
}

export const defaultValue: Readonly<IYegan> = {};
