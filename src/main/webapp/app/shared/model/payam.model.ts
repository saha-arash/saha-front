import { IFileName } from 'app/shared/model/file-name.model';
import { IKarbar } from 'app/shared/model/karbar.model';
import { IYegan } from 'app/shared/model/yegan.model';

export interface IPayam {
  id?: number;
  onvan?: string;
  matn?: any;
  madareks?: IFileName[];
  karbarErsalKonande?: IKarbar;
  karbarDaryaftKonand?: IKarbar;
  yeganErsalKonanade?: IYegan;
  yeganDaryaftKonanade?: IYegan;
}

export const defaultValue: Readonly<IPayam> = {};
