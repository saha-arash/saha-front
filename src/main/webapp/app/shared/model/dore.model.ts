import { Moment } from 'moment';

export interface IDore {
  id?: number;
  begin?: Moment;
  end?: Moment;
  karbarId?: number;
}

export const defaultValue: Readonly<IDore> = {};
