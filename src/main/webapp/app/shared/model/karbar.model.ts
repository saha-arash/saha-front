import { Moment } from 'moment';
import { IMorkhasi } from 'app/shared/model/morkhasi.model';
import { IDore } from 'app/shared/model/dore.model';
import { INegahbani } from 'app/shared/model/negahbani.model';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { IPayam } from 'app/shared/model/payam.model';

export interface IKarbar {
  id?: number;
  name?: string;
  shoghlSazmani?: string;
  shoghlAmali?: string;
  codePerseneli?: string;
  bezaneshate?: boolean;
  sazmani?: boolean;
  tarikhBazneshastegi?: Moment;
  tarikhEstekhdam?: Moment;
  morkhasis?: IMorkhasi[];
  dores?: IDore[];
  negahbanis?: INegahbani[];
  sarparestemamooriats?: IBargeMamooriat[];
  sandoghVoroodis?: IPayam[];
  snadoghKhoroojis?: IPayam[];
  bargeMamoorits?: IBargeMamooriat[];
  binanadeBargeMamoorits?: IBargeMamooriat[];
  yeganId?: number;
  yeganCodeId?: number;
  darajeId?: number;
  sematId?: number;
}

export const defaultValue: Readonly<IKarbar> = {
  bezaneshate: false,
  sazmani: false
};
