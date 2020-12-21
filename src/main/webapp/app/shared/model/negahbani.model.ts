import { Moment } from 'moment';
import { IKarbar } from 'app/shared/model/karbar.model';

export interface INegahbani {
  id?: number;
  begin?: Moment;
  end?: Moment;
  karbar?: IKarbar;
}

export const defaultValue: Readonly<INegahbani> = {};
