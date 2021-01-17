import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';

export interface IMadarek {
  id?: number;
  failhas?: IFileHesabResi[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<IMadarek> = {};
