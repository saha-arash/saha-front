import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'jalali-moment';
import { IRootState } from 'app/shared/reducers';
import { getEntity } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import './barge-mamooriat-detail.scss';

export interface IBargeMamooriatDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BargeMamooriatDetail = (props: IBargeMamooriatDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  function getVaziatTitle(key: string): string {
    //TODO: get title through the json file
    {
      /*
          <button className="dropDownbtn" onClick={() => vaziateChanged("null")}>همه</button>
                          <button className="dropDownbtn" onClick={() => vaziateChanged("SARPARAST_TIME_HESABRESI")}>سرپرست تیم حسابرسی</button>
                          <button className="dropDownbtn" onClick={() => vaziateChanged("DAR_ENTEZAR_TAEED_MODIR_HESABRESI")}>در انتظار تایید مدیر حسابرسی</button>
                          <button className="dropDownbtn" onClick={() => vaziateChanged("DAR_ENTEZAR_TAEED_MOAVEN_HESABRESI")}>در انتظار تایید معاون حسابرسی</button>
                          <button className="dropDownbtn" onClick={() => vaziateChanged("DAR_ENTEZAR_TAEED_JANESHIN_SAZMAN")}>در انتظار تایید جانشین سازمان</button>
                          <button className="dropDownbtn" onClick={() => vaziateChanged("DAR_ENTEZAR_TAEED_RIASATSAZMAN")}>در انتظار تایید ریاست سازمان</button>
                          <button className="dropDownbtn" onClick={() => vaziateChanged("DAR_ENTEZAR_TAEED_HEYAT_RAESE_AJA")}>در انتظار تایید هیئت رئیسه آجا</button>
          */
    }
    return '';
  }

  const { bargeMamooriatEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <span>جزییات برگه ماموریت</span>

          {/* - شناسه:<b>{bargeMamooriatEntity.id}</b> */}
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="vaziat">
              <span>وضعیت</span>
            </span>
          </dt>
          <dd>
            {
              //TODO: use getTitle() and json file
              bargeMamooriatEntity.vaziat
            }
          </dd>
          <dt>
            <span id="saleMamooriat">
              <span>سال</span>
            </span>
          </dt>
          <dd>{bargeMamooriatEntity.saleMamooriat}</dd>
          <dt>
            <span id="shorooMamooriat">
              <span>شروع ماموریت</span>
            </span>
          </dt>
          <dd>
            <TextFormat value={bargeMamooriatEntity.shorooMamooriat} type="date" format={APP_DATE_FORMAT} />
          </dd>
          {/* TODO: convert date to jalali using momnet jalali also with persin digits what you suggest*/}
          {/* <dd>{moment(bargeMamooriatEntity.shorooMamooriat, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</dd> */}
          <dt>
            <span id="payanMamooriat">
              <span>پایان ماموریت</span>
            </span>
          </dt>
          <dd>
            <TextFormat value={bargeMamooriatEntity.payanMamooriat} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span>سرپرست</span>
          </dt>
          <dd>{bargeMamooriatEntity.sarparast ? bargeMamooriatEntity.sarparast.id : ''}</dd>
          <dt>
            <span>یگان</span>
          </dt>
          <dd>{bargeMamooriatEntity.yegan ? bargeMamooriatEntity.yegan.id : ''}</dd>
          {/* <dt>
            <Translate contentKey="sahaApp.bargeMamooriat.hesabResi">Hesab Resi</Translate>
          </dt> */}
          {/* <dd>{bargeMamooriatEntity.hesabResi ? bargeMamooriatEntity.hesabResi.id : ''}</dd> */}
        </dl>
        <div>
          <Button tag={Link} to="/file-barge-mamooriat" replace color="warning" className="margined">
            <span className="d-none d-md-inline">
              <span>فایل ها</span>
            </span>
          </Button>
        </div>
  
        &nbsp;
        <Button tag={Link} to="/barge-mamooriat" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <span>بازگشت</span>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/barge-mamooriat/${bargeMamooriatEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <span>ویرایش</span>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bargeMamooriat }: IRootState) => ({
  bargeMamooriatEntity: bargeMamooriat.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BargeMamooriatDetail);
