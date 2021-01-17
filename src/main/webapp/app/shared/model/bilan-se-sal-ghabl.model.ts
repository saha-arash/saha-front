import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';

export interface IBilanSeSalGhabl {
  id?: number;
  failhas?: IFileHesabResi[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<IBilanSeSalGhabl> = {};
