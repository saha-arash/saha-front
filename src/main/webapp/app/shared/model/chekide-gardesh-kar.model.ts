import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';

export interface IChekideGardeshKar {
  id?: number;
  failhas?: IFileHesabResi[];
  hesabResiId?: number;
}

export const defaultValue: Readonly<IChekideGardeshKar> = {};
