import { Moment } from 'moment';

export interface IMorkhasi {
  id?: number;
  begin?: Moment;
  end?: Moment;
  karbarId?: number;
}

export const defaultValue: Readonly<IMorkhasi> = {};
