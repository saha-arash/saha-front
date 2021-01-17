import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';

export interface IGardeshkarBarnameHesabresi {
  id?: number;
  failhas?: IFileHesabResi[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<IGardeshkarBarnameHesabresi> = {};
