import { IFileGozaresh } from 'app/shared/model/file-gozaresh.model';
import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { VaziatGozaresh } from 'app/shared/model/enumerations/vaziat-gozaresh.model';

export interface IGozaresh {
  id?: number;
  vaziat?: VaziatGozaresh;
  filehayegozareshes?: IFileGozaresh[];
  hesabResi?: IHesabResi;
}

export const defaultValue: Readonly<IGozaresh> = {};
