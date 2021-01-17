import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';

export interface IGozareshHozoor {
  id?: number;
  failhas?: IFileHesabResi[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<IGozareshHozoor> = {};
