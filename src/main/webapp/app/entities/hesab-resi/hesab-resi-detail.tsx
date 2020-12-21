import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hesab-resi.reducer';
import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHesabResiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const HesabResiDetail = (props: IHesabResiDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { hesabResiEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.hesabResi.detail.title">HesabResi</Translate> [<b>{hesabResiEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="sal">
              <Translate contentKey="sahaApp.hesabResi.sal">Sal</Translate>
            </span>
          </dt>
          <dd>{hesabResiEntity.sal}</dd>
          <dt>
            <span id="vaziateHesabResi">
              <Translate contentKey="sahaApp.hesabResi.vaziateHesabResi">Vaziate Hesab Resi</Translate>
            </span>
          </dt>
          <dd>{hesabResiEntity.vaziateHesabResi}</dd>
          <dt>
            <Translate contentKey="sahaApp.hesabResi.gozaresh">Gozaresh</Translate>
          </dt>
          <dd>{hesabResiEntity.gozaresh ? hesabResiEntity.gozaresh.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.hesabResi.barnameHesabResi">Barname Hesab Resi</Translate>
          </dt>
          <dd>{hesabResiEntity.barnameHesabResi ? hesabResiEntity.barnameHesabResi.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/hesab-resi" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/hesab-resi/${hesabResiEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ hesabResi }: IRootState) => ({
  hesabResiEntity: hesabResi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HesabResiDetail);
