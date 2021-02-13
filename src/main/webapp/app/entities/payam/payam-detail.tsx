import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './payam.reducer';
import { IPayam } from 'app/shared/model/payam.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPayamDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PayamDetail = (props: IPayamDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { payamEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          پیام [<b>{payamEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="onvan">
              عنوان
            </span>
          </dt>
          <dd>{payamEntity.onvan}</dd>
          <dt>
            <span id="matn">
              متن
            </span>
          </dt>
          <dd>{payamEntity.matn}</dd>
          {payamEntity.karbarErsalKonandeId ? (
          <>
          <dt>
            کاربر ارسال کننده
          </dt>
          <dd> {payamEntity.karbarErsalKonande?.name} </dd> 
          </>
          )  : ''}
          {payamEntity.karbarDaryaftKonandId ? (
            <>
            <dt>
            کاربر دریافت کننده
          </dt>
          <dd> {payamEntity.karbarDaryaftKonandeKonande?.name} </dd>
            </>
          ) : '' }
          
          {payamEntity.yeganErsalKonanadeId ? (
            <>
          <dt>
           یگان ارسال کننده
          </dt>
          <dd> {payamEntity.yeganErsalKonanade?.name} </dd>
            </>
          ) : '' }
          {payamEntity.yeganDaryaftKonanadeId ? (
            <>
          <dt>
            یگان دریافت کننده
          </dt>
          <dd> {payamEntity.yeganDaryaftKonanade?.name}</dd>
            </>
          ) : ''}

        </dl>
        <Button tag={Link} to="/payam" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payam/${payamEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ payam }: IRootState) => ({
  payamEntity: payam.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PayamDetail);
