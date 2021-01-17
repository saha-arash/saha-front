import { IFileGozaresh } from 'app/shared/model/file-gozaresh.model';
import { VaziatGozaresh } from 'app/shared/model/enumerations/vaziat-gozaresh.model';

export interface IGozaresh {
  id?: number;
  vaziat?: VaziatGozaresh;
  filehayegozareshes?: IFileGozaresh[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<IGozaresh> = {};
