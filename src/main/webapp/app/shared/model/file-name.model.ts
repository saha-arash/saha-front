import { IPayam } from 'app/shared/model/payam.model';

export interface IFileName {
  id?: number;
  madrakContentType?: string;
  madrak?: any;
  name?: IPayam;
}

export const defaultValue: Readonly<IFileName> = {};
