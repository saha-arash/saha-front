import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';

export interface IDastoorAmalEjraE {
  id?: number;
  failhas?: IFileHesabResi[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<IDastoorAmalEjraE> = {};
