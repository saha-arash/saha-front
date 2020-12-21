import { IShahr } from 'app/shared/model/shahr.model';
import { IMantaghe } from 'app/shared/model/mantaghe.model';

export interface IOstan {
  id?: number;
  name?: string;
  shahrs?: IShahr[];
  mantaghe?: IMantaghe;
}

export const defaultValue: Readonly<IOstan> = {};
