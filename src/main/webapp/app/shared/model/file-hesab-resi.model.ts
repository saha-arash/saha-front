import { Moment } from 'moment';
import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { IBarnameHesabResi } from 'app/shared/model/barname-hesab-resi.model';
import { FileType } from 'app/shared/model/enumerations/file-type.model';

export interface IFileHesabResi {
  id?: number;
  fileContentType?: string;
  file?: any;
  shomare?: number;
  tarikhName?: Moment;
  mozoo?: string;
  fileType?: FileType;
  hesabResi?: IHesabResi;
  barnameHesabResi?: IBarnameHesabResi;
}

export const defaultValue: Readonly<IFileHesabResi> = {};
