import { Moment } from 'moment';
import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';

export interface INameh {
  id?: number;
  shomare?: string;
  tarikhEblagh?: Moment;
  failhas?: IFileHesabResi[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<INameh> = {};
