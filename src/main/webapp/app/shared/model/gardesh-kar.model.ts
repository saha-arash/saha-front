import { Moment } from 'moment';
import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';

export interface IGardeshKar {
  id?: number;
  tarikh?: Moment;
  mozoo?: string;
  shomare?: number;
  failhas?: IFileHesabResi[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<IGardeshKar> = {};
