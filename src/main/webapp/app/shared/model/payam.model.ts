import { IFileName } from 'app/shared/model/file-name.model';

export interface IPayam {
  id?: number;
  onvan?: string;
  matn?: any;
  madareks?: IFileName[];
  karbarErsalKonandeId?: number;
  karbarDaryaftKonandId?: number;
  yeganErsalKonanadeId?: number;
  yeganDaryaftKonanadeId?: number;
}

export const defaultValue: Readonly<IPayam> = {};
