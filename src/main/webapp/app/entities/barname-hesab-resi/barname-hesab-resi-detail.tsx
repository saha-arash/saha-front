import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './barname-hesab-resi.reducer';
import { IBarnameHesabResi } from 'app/shared/model/barname-hesab-resi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBarnameHesabResiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BarnameHesabResiDetail = (props: IBarnameHesabResiDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { barnameHesabResiEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.barnameHesabResi.detail.title">BarnameHesabResi</Translate> [<b>{barnameHesabResiEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="noeBarnameHesabResi">
              <Translate contentKey="sahaApp.barnameHesabResi.noeBarnameHesabResi">Noe Barname Hesab Resi</Translate>
            </span>
          </dt>
          <dd>{barnameHesabResiEntity.noeBarnameHesabResi}</dd>
        </dl>
        <Button tag={Link} to="/barname-hesab-resi" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/barname-hesab-resi/${barnameHesabResiEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ barnameHesabResi }: IRootState) => ({
  barnameHesabResiEntity: barnameHesabResi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BarnameHesabResiDetail);
