import React, {FC} from 'react';
import { RouteComponentProps } from 'react-router-dom';

const HesabResiItemDetail: FC<RouteComponentProps> = ({match}) => {
  const {id, item}: any = match.params;

  return (
    <div>item detail {id} {item}</div>
  )
}

export default HesabResiItemDetail;
