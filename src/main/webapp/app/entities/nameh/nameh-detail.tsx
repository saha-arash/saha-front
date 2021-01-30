import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './nameh.reducer';
import { INameh } from 'app/shared/model/nameh.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import TimeToText from 'app/shared/timeToText/TimeToText';

export interface INamehDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NamehDetail = (props: INamehDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { namehEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.nameh.detail.title">Nameh</Translate> [<b>{namehEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="shomare">
              <Translate contentKey="sahaApp.nameh.shomare">Shomare</Translate>
            </span>
          </dt>
          <dd>{namehEntity.shomare}</dd>
          <dt>
            <span id="tarikhEblagh">
              <Translate contentKey="sahaApp.nameh.tarikhEblagh">Tarikh Eblagh</Translate>
            </span>
          </dt>
          <dd>
            <TimeToText value={namehEntity.tarikhEblagh} type="date" format={APP_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/nameh" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/nameh/${namehEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ nameh }: IRootState) => ({
  namehEntity: nameh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NamehDetail);
