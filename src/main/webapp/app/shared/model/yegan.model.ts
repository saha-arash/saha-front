import { IKarbar } from 'app/shared/model/karbar.model';
import { IPayam } from 'app/shared/model/payam.model';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { IYegan as Yegan } from 'app/shared/model/yegan.model';
import { IYeganCode } from 'app/shared/model/yegan-code.model';
import { INirooCode } from 'app/shared/model/niroo-code.model';
import { IShahr } from 'app/shared/model/shahr.model';
import { IYeganType } from 'app/shared/model/yegan-type.model';

export interface IYegan {
  id?: number;
  name?: string;
  code?: string;
  karbars?: IKarbar[];
  sandoghVoroodis?: IPayam[];
  snadoghKhoroojis?: IPayam[];
  bargeMamoorits?: IBargeMamooriat[];
  zirYegans?: Yegan[];
  yeganCode?: IYeganCode;
  nirooCode?: INirooCode;
  shahr?: IShahr;
  yeganType?: IYeganType;
  yegans?: IYegan[];
}

export const defaultValue: Readonly<IYegan> = {};
