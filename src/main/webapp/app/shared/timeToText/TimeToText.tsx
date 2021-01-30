import React, { FC } from 'react';
import moment from 'jalali-moment'

export interface ITimeToTextProps {
  value: string | number | Date | moment.Moment;
  type: 'date' | 'number';
  format?: string;
  blankOnInvalid?: boolean;
}

const TimeToText: FC<ITimeToTextProps> = ({
  value,
  format
}) => {
  const clearVal = typeof value === 'string' ?  new Date(value) : value;
  return (
    <span>
      {moment(clearVal, format).locale('fa').format(format)}
    </span>
  )
}

export default TimeToText;
