import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';
import { NoeBarnameHesabResi } from 'app/shared/model/enumerations/noe-barname-hesab-resi.model';

export interface IBarnameHesabResi {
  id?: number;
  noeBarnameHesabResi?: NoeBarnameHesabResi;
  failhas?: IFileHesabResi[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<IBarnameHesabResi> = {};
