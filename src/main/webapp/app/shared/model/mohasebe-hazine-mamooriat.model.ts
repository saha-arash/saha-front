import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';

export interface IMohasebeHazineMamooriat {
  id?: number;
  failhas?: IFileHesabResi[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<IMohasebeHazineMamooriat> = {};
