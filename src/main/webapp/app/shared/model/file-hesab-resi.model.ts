import { Moment } from 'moment';
import { FileType } from 'app/shared/model/enumerations/file-type.model';

export interface IFileHesabResi {
  id?: number;
  fileContentType?: string;
  file?: any;
  shomare?: number;
  tarikhName?: Moment;
  mozoo?: string;
  fileType?: FileType;
  hesabResiId?: number;
  barnameHesabResiId?: number;
  bankEtelaatiId?: number;
  rafeIradatId?: number;
  mostaKhrejeId?: number;
  bilanSeSalGhablId?: number;
  mohasebeHazineMamooriatId?: number;
  chekideGardeshKarId?: number;
  gozareshHozoorId?: number;
  bilanSalGhablId?: number;
  madarekId?: number;
  gardeshkarBarnameHesabresiId?: number;
  dastoorAmalEjraEId?: number;
  namehId?: number;
  kholaseGozareshId?: number;
  gardeshKarId?: number;
}

export const defaultValue: Readonly<IFileHesabResi> = {};
