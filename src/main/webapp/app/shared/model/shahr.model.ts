import { IYegan } from 'app/shared/model/yegan.model';

export interface IShahr {
  id?: number;
  name?: string;
  zaribAboHava?: number;
  zaribTashilat?: number;
  masafatTaMarkaz?: number;
  yegans?: IYegan[];
  ostanId?: number;
}

export const defaultValue: Readonly<IShahr> = {};
