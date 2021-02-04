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
import gardeshKar from '../gardesh-kar/gardesh-kar';

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
            {
              (role === 'ROLE_YEGAN' || role === 'ROLE_ZIR_YEGAN') && (
                <>
                <Button tag={Link} color="primary" to={`/barge-mamooriat/${props.match.params.id}/${hesabResiEntity.sal}`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    برگه ماموریت‌ها
                </Button>
                <Button tag={Link} color="primary" to={`./${props.match.params.id}/Madarek`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    مدارک
                </Button>
                  <Button tag={Link} color="primary" to={`./${props.match.params.id}/RafeIradat`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    رفع ایرادات
                </Button>
                </>
              )
            }
          
            {
              (role === 'ROLE_ADMIN' || role === 'ROLE_KARBAR') && (
                <>
                  <Button tag={Link} color="primary" to={{
                    pathname: `./${props.match.params.id}/VoroodiBilanSalGhabl`,
                    state: {sal: hesabResiEntity.sal}
                  }} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    بیلان سال قبل
                  </Button>

                  <Button tag={Link} color="primary" to={{
                    pathname: `./${props.match.params.id}/VoroodiBilanSeSalGhabl`,
                    state: {sal: hesabResiEntity.sal}
                  }} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    بیلان سه سال قبل
                  </Button>

                  <Button tag={Link} color="primary" to={`./${props.match.params.id}/BarnameHesabResi`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    برنامه حسابرسی
                  </Button>

                  <Button tag={Link} color="primary" to={`/yegan/${props.match.params.id}/jahateHesabResi`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    لیست یگان‌های گزینش شده
                  </Button>

                  <Button tag={Link} color="primary" to={`/yegan/${props.match.params.id}/jahatePeygiri`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    لیست یگان‌های جهت پیگیری
                  </Button>

                  <Button tag={Link} color="primary" to={`/yegan/${props.match.params.id}/kharejAzMarkaz`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    لیست یگان‌های خارج از مرکز
                  </Button>

                  <Button tag={Link} color="primary" to={`./${props.match.params.id}/MohasebeHazineMamooriat`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    هزینه ماموریت
                  </Button>

                  <Button tag={Link} color="primary" to={`./${props.match.params.id}/DastoorAmalEjraE`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    دستور العمل اجرایی
                  </Button>

                  <Button tag={Link} color="primary" to={`/gardesh-kar/${hesabResiEntity.gardeshkarBarnameHesabresiId}/edit`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    گردش کار
                  </Button>

                  <Button tag={Link} color="primary" to={`/barge-mamooriat/${props.match.params.id}/${hesabResiEntity.sal}`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    برگه ماموریت‌ها
                  </Button>

                  <Button tag={Link} color="primary" to={`./${props.match.params.id}/Madarek`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    مدارک
                  </Button>

                  <Button tag={Link} color="primary" to={`./${props.match.params.id}/MadarekGozaresh`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    گزارش
                  </Button>

                  <Button tag={Link} color="primary" to={`./${props.match.params.id}/GOZARESH_HOZOOR`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    گزارش حضور
                  </Button>

                  <Button tag={Link} color="primary" to={`./${props.match.params.id}/KholaseGozaresh`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    خلاصه گزارش
                  </Button>

                  <Button tag={Link} color="primary" to={`./${props.match.params.id}/MostaKhreje`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    مستخرجه
                  </Button>

                  <Button tag={Link} color="primary" to={`./${props.match.params.id}/RafeIradat`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    رفع ایرادات
                  </Button>

                  <Button tag={Link} color="primary" to={`./${props.match.params.id}/BankEtelaati`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    بانک اطلاعاتی
                  </Button>

                  <Button tag={Link} color="primary" to={`/nameh/${hesabResiEntity.namehId}/edit`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
                    نامه‌ها
                  </Button>
                </>
              )
            }

            {/* <Button tag={Link} color="primary" to={`./${props.match.params.id}/VoroodiBilanSalGhabl`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
              چکیده گردش کار
          </Button>
            <Button tag={Link} color="primary" to={`./${props.match.params.id}/VoroodiBilanSalGhabl`} className="cardd-1 d-flex text-center justify-content-center align-items-center text-dark bg-white">
              گردش کار برنامه حسابرسی
            </Button> */}
          </dl>

        </dl>
        <Button tag={Link} to="/hesab-resi" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`./hesab-resi/${hesabResiEntity.id}/edit`} replace color="primary">
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
