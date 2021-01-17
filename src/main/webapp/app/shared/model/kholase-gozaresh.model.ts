import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';

export interface IKholaseGozaresh {
  id?: number;
  failhas?: IFileHesabResi[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<IKholaseGozaresh> = {};
