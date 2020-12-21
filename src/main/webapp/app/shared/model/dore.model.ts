import { Moment } from 'moment';
import { IKarbar } from 'app/shared/model/karbar.model';

export interface IDore {
  id?: number;
  begin?: Moment;
  end?: Moment;
  karbar?: IKarbar;
}

export const defaultValue: Readonly<IDore> = {};
