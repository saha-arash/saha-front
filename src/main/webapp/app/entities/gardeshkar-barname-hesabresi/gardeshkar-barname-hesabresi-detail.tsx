import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './gardeshkar-barname-hesabresi.reducer';
import { IGardeshkarBarnameHesabresi } from 'app/shared/model/gardeshkar-barname-hesabresi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGardeshkarBarnameHesabresiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GardeshkarBarnameHesabresiDetail = (props: IGardeshkarBarnameHesabresiDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { gardeshkarBarnameHesabresiEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.gardeshkarBarnameHesabresi.detail.title">GardeshkarBarnameHesabresi</Translate> [
          <b>{gardeshkarBarnameHesabresiEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details"></dl>
        <Button tag={Link} to="/gardeshkar-barname-hesabresi" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/gardeshkar-barname-hesabresi/${gardeshkarBarnameHesabresiEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ gardeshkarBarnameHesabresi }: IRootState) => ({
  gardeshkarBarnameHesabresiEntity: gardeshkarBarnameHesabresi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GardeshkarBarnameHesabresiDetail);
