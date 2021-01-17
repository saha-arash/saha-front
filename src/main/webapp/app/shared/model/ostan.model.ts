import { IShahr } from 'app/shared/model/shahr.model';

export interface IOstan {
  id?: number;
  name?: string;
  shahrs?: IShahr[];
  mantagheId?: number;
}

export const defaultValue: Readonly<IOstan> = {};
