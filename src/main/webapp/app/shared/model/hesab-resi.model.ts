import { IGozaresh } from 'app/shared/model/gozaresh.model';
import { IBarnameHesabResi } from 'app/shared/model/barname-hesab-resi.model';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';
import { VaziateHesabResi } from 'app/shared/model/enumerations/vaziate-hesab-resi.model';

export interface IHesabResi {
  id?: number;
  sal?: number;
  vaziateHesabResi?: VaziateHesabResi;
  gozaresh?: IGozaresh;
  barnameHesabResi?: IBarnameHesabResi;
  bargeMamooriats?: IBargeMamooriat[];
  filehas?: IFileHesabResi[];
}

export const defaultValue: Readonly<IHesabResi> = {};
