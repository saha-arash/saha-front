import { IKarbar } from 'app/shared/model/karbar.model';

export interface IYeganCode {
  id?: number;
  name?: string;
  code?: string;
  yeganId?: number;
  karbars?: IKarbar[];
  nirooCodeId?: number;
}

export const defaultValue: Readonly<IYeganCode> = {};
