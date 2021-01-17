import { Moment } from 'moment';

export interface INegahbani {
  id?: number;
  begin?: Moment;
  end?: Moment;
  karbarId?: number;
}

export const defaultValue: Readonly<INegahbani> = {};
