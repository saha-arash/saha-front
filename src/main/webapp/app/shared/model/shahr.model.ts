import { IYegan } from 'app/shared/model/yegan.model';
import { IOstan } from 'app/shared/model/ostan.model';

export interface IShahr {
  id?: number;
  name?: string;
  zaribAboHava?: number;
  zaribTashilat?: number;
  masafatTaMarkaz?: number;
  yegans?: IYegan[];
  ostan?: IOstan;
}

export const defaultValue: Readonly<IShahr> = {};
