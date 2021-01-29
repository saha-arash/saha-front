import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hesab-resi.reducer';
import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

const statusToFarsi = {
  DAR_SHOROF_MAMOORIAT: 'در شرف ماموریت',
  DAR_HALE_MAMOORIAT: 'در حال ماموریت',
  SODOOR_BARGE_MAMOORIAT: 'صدور برگه ماموریت',
  ETMAM_MAMOORIAT_HOZOOR_DARSAZMAN: 'اتمام ماموریت حضور در سازمان'
}

export interface IHesabResiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const HesabResiDetail = (props: IHesabResiDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const [role, setRole] = useState(localStorage.getItem('role'));

  const { hesabResiEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          حسابرسی [<b>{hesabResiEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="sal">
              سال
            </span>
          </dt>
          <dd>{hesabResiEntity.sal}</dd>
          <dt>
            <span id="vaziateHesabResi">
              وضعیت حسابرسی
            </span>
          </dt>
          <dd>
            {statusToFarsi[hesabResiEntity.vaziateHesabResi] || hesabResiEntity.vaziateHesabResi}
            </dd>
          <dl className="d-flex flex-wrap">
            <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
              مدارک
          </dt>
            <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
              رفع ایرادات
          </dt>
            <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
              برگه ماموریت‌ها
          </dt>

            {
              (role === 'ROLE_ADMIN' || role === 'ROLE_KARBAR') && (
                <>
                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    بیلان سه سال قبل
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    بیلان سال قبل
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    برنامه حسابرسی
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    لیست یگان‌های گزینش شده
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    لیست یگان‌های جهت پیگیری
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    لیست یگان‌های خارج از مرکز
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    هزینه ماموریت
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    دستور العمل اجرایی
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    گردش کار
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    گزارش
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    گزارش حضور
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    خلاصه گزارش
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    مستخرجه
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    بانک اطلاعاتی
                  </dt>

                  <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
                    نامه
                  </dt>
                </>
              )
            }

            {/* <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
              چکیده گردش کار
          </dt>
            <dt className="cardd-1 d-flex text-center justify-content-center align-items-center">
              گردش کار برنامه حسابرسی
            </dt> */}
          </dl>

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
