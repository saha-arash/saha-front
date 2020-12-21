import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';

export interface IFileBargeMamooriat {
  id?: number;
  madarekContentType?: string;
  madarek?: any;
  bargeMamooriat?: IBargeMamooriat;
}

export const defaultValue: Readonly<IFileBargeMamooriat> = {};
