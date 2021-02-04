import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './yegan.reducer';
import { IYegan } from 'app/shared/model/yegan.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IYeganDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const YeganDetail = (props: IYeganDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { yeganEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          شناسه [<b>{yeganEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              نام یگان
            </span>
          </dt>
          <dd>{yeganEntity.name}</dd>
          <dt>
            <span id="code">
              کد یگان
            </span>
          </dt>
          <dd>{yeganEntity.code}</dd>
          <dt>
            <span> زیریگان ها</span>
          </dt>
          <dd>
            {yeganEntity.zirYegans
              ? yeganEntity.zirYegans.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === yeganEntity.zirYegans.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            نیرو
          </dt>
          <dd>{yeganEntity.nirooCodeDTO ? yeganEntity.nirooCodeDTO.name : ''}</dd>
          <dt>
            شهر
          </dt>
          <dd>{yeganEntity.shahrDTO ? yeganEntity.shahrDTO.name : ''}</dd>
          <dt>
            نوع یگان
          </dt>
          <dd>{yeganEntity.yeganTypeDTO ? yeganEntity.yeganTypeDTO.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/yegan" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            بازگشت
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/yegan/${yeganEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            ویرایش
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ yegan }: IRootState) => ({
  yeganEntity: yegan.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(YeganDetail);
