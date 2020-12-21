import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './gozaresh.reducer';
import { IGozaresh } from 'app/shared/model/gozaresh.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGozareshDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GozareshDetail = (props: IGozareshDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { gozareshEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.gozaresh.detail.title">Gozaresh</Translate> [<b>{gozareshEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="vaziat">
              <Translate contentKey="sahaApp.gozaresh.vaziat">Vaziat</Translate>
            </span>
          </dt>
          <dd>{gozareshEntity.vaziat}</dd>
        </dl>
        <Button tag={Link} to="/gozaresh" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/gozaresh/${gozareshEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ gozaresh }: IRootState) => ({
  gozareshEntity: gozaresh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GozareshDetail);
