import { IOstan } from 'app/shared/model/ostan.model';

export interface IMantaghe {
  id?: number;
  name?: string;
  ostans?: IOstan[];
}

export const defaultValue: Readonly<IMantaghe> = {};
