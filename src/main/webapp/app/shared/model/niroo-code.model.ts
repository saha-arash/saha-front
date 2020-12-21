import { IYeganCode } from 'app/shared/model/yegan-code.model';
import { IYegan } from 'app/shared/model/yegan.model';

export interface INirooCode {
  id?: number;
  name?: string;
  code?: string;
  yeganCodes?: IYeganCode[];
  yegans?: IYegan[];
}

export const defaultValue: Readonly<INirooCode> = {};
