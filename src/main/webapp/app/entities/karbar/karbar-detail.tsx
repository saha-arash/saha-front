import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './karbar.reducer';
import { IKarbar } from 'app/shared/model/karbar.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import TimeToText from 'app/shared/timeToText/TimeToText';

export interface IKarbarDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const KarbarDetail = (props: IKarbarDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { karbarEntity } = props;
  console.log('karbar entity', karbarEntity)
  return (
    <Row>
      <Col md="4">
        <h2>
          کاربر [<b>{karbarEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              نام
            </span>
          </dt>
          <dd>{karbarEntity.name}</dd>
          <dt>
            <span id="shoghlSazmani">
              شغل سازمانی
            </span>
          </dt>
          <dd>{karbarEntity.shoghlSazmani}</dd>
          <dt>
            <span id="shoghlAmali">
              شغل عملی
            </span>
          </dt>
          <dd>{karbarEntity.shoghlAmali}</dd>
          <dt>
            <span id="codePerseneli">
              کد پرسنلی
            </span>
          </dt>
          <dd>{karbarEntity.codePerseneli}</dd>
          <dt>
            <span id="bezaneshate">
              بازنشسته
            </span>
          </dt>
          <dd>{karbarEntity.bezaneshate ? 'true' : 'false'}</dd>
          <dt>
            <span id="sazmani">
              سازمانی
            </span>
          </dt>
          <dd>{karbarEntity.sazmani ? 'true' : 'false'}</dd>
          <dt>
            <span id="tarikhBazneshastegi">
              تاریخ بازنشستگی
            </span>
          </dt>
          <dd>
            <TimeToText value={karbarEntity.tarikhBazneshastegi} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="tarikhEstekhdam">
              تاریخ استخدام
            </span>
          </dt>
          <dd>
            <TimeToText value={karbarEntity.tarikhEstekhdam} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            برگه ماموریت
          </dt>
          <dd>
            {karbarEntity.bargeMamoorits
              ? karbarEntity.bargeMamoorits.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === karbarEntity.bargeMamoorits.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            بیننده‌ی برگه ماموریت
          </dt>
          <dd>
            {karbarEntity.binanadeBargeMamoorits
              ? karbarEntity.binanadeBargeMamoorits.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === karbarEntity.binanadeBargeMamoorits.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            یگان
          </dt>
          <dd>{karbarEntity.yeganId ? karbarEntity.yeganId : ''}</dd>
          <dt>
            کد یگان
          </dt>
          <dd>{karbarEntity.yeganCodeId ? karbarEntity.yeganCodeId : ''}</dd>
          <dt>
            درجه
          </dt>
          <dd>{karbarEntity.darajeId ? karbarEntity.darajeId : ''}</dd>
          <dt>
            سمت
          </dt>
          <dd>{karbarEntity.sematId ? karbarEntity.sematId : ''}</dd>
        </dl>
        <Button tag={Link} to="/karbar" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/karbar/${karbarEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
      <Col md="8">
        {
          karbarEntity.id && (
            <Row>
          <Col>
          <Button tag={Link} to={`/morkhasi/new/${karbarEntity.id}`} replace color="success">
          ایجاد مرخصی‌ جدید
        </Button>
        </Col>
        <Col>
        <Button tag={Link} to={`/dore/new/${karbarEntity.id}`} replace color="success">
          ایجاد دوره جدید
        </Button>
        </Col>
        <Col>
        <Button tag={Link} to={`/negahbani/new/${karbarEntity.id}`} replace color="success">
          ایجاد نگهبانی‌ جدید
        </Button>
        </Col>
        </Row>
          )
        }
        <div className="mb-5">
          <h4 className="mb-3">
            مرخصی‌ها
          </h4>
        <Table>
          <thead>
            <tr>
              <th>
                  شناسه مرخصی‌
              </th>
              <th>
                شروع
              </th>
              <th>پایان</th>
            </tr>
          </thead>
          <tbody>
            {
              karbarEntity.morkhasiDTOS && karbarEntity.morkhasiDTOS.map((item) => (
                <tr key={item.id}>
                  <td>
                    
                    {item.id}
                  </td>
                  <td>
                  <TimeToText value={item.begin} type="date" format={APP_DATE_FORMAT} />
                    
                  </td>
                  <td>
                  <TimeToText value={item.end} type="date" format={APP_DATE_FORMAT} />
                    
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        </div>
        <div className="mb-5">
          <h4 className="mb-3">
            دوره‌ها
          </h4>
        <Table>
          <thead>
            <tr>
              <th>
                  شناسه دوره
              </th>
              <th>
                شروع
              </th>
              <th>پایان</th>
            </tr>
          </thead>
          <tbody>
            {
              karbarEntity.doreDTOS && karbarEntity.doreDTOS.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.id}
                  </td>
                  <td>
                  <TimeToText value={item.begin} type="date" format={APP_DATE_FORMAT} />
                    
                  </td>
                  <td>
                  <TimeToText value={item.end} type="date" format={APP_DATE_FORMAT} />
                    
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        </div>
        <div className="mb-5">
          <h4 className="mb-3">
            نگهبانی‌ها
          </h4>
        <Table>
          <thead>
            <tr>
              <th>
                  شناسه
              </th>
              <th>
                شروع
              </th>
              <th>پایان</th>
            </tr>
          </thead>
          <tbody>
            {
              karbarEntity.negahbanis && karbarEntity.negahbanis.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.id}
                  </td>
                  <td>
                  <TimeToText value={item.begin} type="date" format={APP_DATE_FORMAT} />
                    
                  </td>
                  <td>
                  <TimeToText value={item.end} type="date" format={APP_DATE_FORMAT} />
                    
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ karbar }: IRootState) => ({
  karbarEntity: karbar.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(KarbarDetail);
