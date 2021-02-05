import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './semat.reducer';
import { ISemat } from 'app/shared/model/semat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISematDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SematDetail = (props: ISematDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { sematEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <span>سمت</span> [<b>{sematEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="onvanShoghli">
              <span>عنوان شغلی</span>
            </span>
          </dt>
          <dd>{sematEntity.onvanShoghli}</dd>
        </dl>
        <Button tag={Link} to="/semat" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/semat/${sematEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ semat }: IRootState) => ({
  sematEntity: semat.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SematDetail);
