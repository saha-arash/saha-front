import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './gardesh-kar.reducer';
import { IGardeshKar } from 'app/shared/model/gardesh-kar.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGardeshKarDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GardeshKarDetail = (props: IGardeshKarDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { gardeshKarEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.gardeshKar.detail.title">GardeshKar</Translate> [<b>{gardeshKarEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="tarikh">
              <Translate contentKey="sahaApp.gardeshKar.tarikh">Tarikh</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={gardeshKarEntity.tarikh} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="mozoo">
              <Translate contentKey="sahaApp.gardeshKar.mozoo">Mozoo</Translate>
            </span>
          </dt>
          <dd>{gardeshKarEntity.mozoo}</dd>
          <dt>
            <span id="shomare">
              <Translate contentKey="sahaApp.gardeshKar.shomare">Shomare</Translate>
            </span>
          </dt>
          <dd>{gardeshKarEntity.shomare}</dd>
        </dl>
        <Button tag={Link} to="/gardesh-kar" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/gardesh-kar/${gardeshKarEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ gardeshKar }: IRootState) => ({
  gardeshKarEntity: gardeshKar.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GardeshKarDetail);
