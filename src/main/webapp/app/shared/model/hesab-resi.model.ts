import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';
import { VaziateHesabResi } from 'app/shared/model/enumerations/vaziate-hesab-resi.model';

export interface IHesabResi {
  id?: number;
  sal?: number;
  vaziateHesabResi?: VaziateHesabResi;
  gozareshId?: number;
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
  barnameHesabResiId?: number;
  bargeMamooriats?: IBargeMamooriat[];
  filehas?: IFileHesabResi[];
}

export const defaultValue: Readonly<IHesabResi> = {};
