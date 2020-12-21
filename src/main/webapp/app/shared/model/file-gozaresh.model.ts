import { IGozaresh } from 'app/shared/model/gozaresh.model';

export interface IFileGozaresh {
  id?: number;
  fileContentType?: string;
  file?: any;
  hesabResi?: IGozaresh;
}

export const defaultValue: Readonly<IFileGozaresh> = {};
