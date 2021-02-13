import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import TimeToText from '../../shared/timeToText/TimeToText';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
export interface IBargeMamooriatDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const translateStat = {
  "null": "همه",
  "SARPARAST_TIME_HESABRESI": "سرپرست تیم حسابرسی",
  "DAR_ENTEZAR_TAEED_MODIR_HESABRESI": "در اتظار تایید مدیر حسابرسی",
  "DAR_ENTEZAR_TAEED_MOAVEN_HESABRESI": "در انتظار تایید معاون حسابرسی",
  "DAR_ENTEZAR_TAEED_JANESHIN_SAZMAN": "در انتظار تایید جانشین سازمان",
  "DAR_ENTEZAR_TAEED_RIASATSAZMAN": "در انتظار تایید ریاست سازمان",
  "DAR_ENTEZAR_TAEED_HEYAT_RAESE_AJA": "در انتظار تایید ریاست آجا"
}
export const BargeMamooriatDetail = (props: IBargeMamooriatDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bargeMamooriatEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          برگه ماموریت [<b>{bargeMamooriatEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="vaziat">
              وضعیت
            </span>
          </dt>
          <dd>{translateStat[bargeMamooriatEntity.vaziat]}</dd>
          <dt>
            <span id="saleMamooriat">
              <span>سال ماموریت</span>
            </span>
          </dt>
          <dd>{bargeMamooriatEntity.saleMamooriat}</dd>
          <dt>
            <span id="shorooMamooriat">
              شروع ماموریت
            </span>
          </dt>
          <dd>
            <TimeToText value={bargeMamooriatEntity.shorooMamooriat} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="payanMamooriat">
              پایان ماموریت
            </span>
          </dt>
          <dd>
            <TimeToText value={bargeMamooriatEntity.payanMamooriat} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            سرپرست
          </dt>
          <dd>{bargeMamooriatEntity.sarparatDTO ? bargeMamooriatEntity.sarparatDTO.name : ''}</dd>
          <dt>
            یگان
          </dt>
          <dd>{bargeMamooriatEntity.yeganDTO ? bargeMamooriatEntity.yeganDTO.name : ''}</dd>
          <dt>
            حسابرسی
          </dt>
          <dd>{bargeMamooriatEntity.hesabResiDTO ? bargeMamooriatEntity.hesabResiDTO.sal : ''}</dd>
        </dl>
        <div className="mb-3">
        <Button 
          tag={Link} 
          to={{
            pathname: '/file-barge-mamooriat',
            state: { id: bargeMamooriatEntity.id }
          }} 
          color="warning" 
          className="px-4">
          <FontAwesomeIcon icon='file' />{' '}
          <span className="d-none d-md-inline">
            <span>
              فایل‌ها
            </span>
          </span>
        </Button>
        </div>

        <Button tag={Link} to="/barge-mamooriat" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        {
          props.isAdmin && (
            <Button tag={Link} to={`/barge-mamooriat/${bargeMamooriatEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
          )
          
        }
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bargeMamooriat, authentication }: IRootState) => ({
  bargeMamooriatEntity: bargeMamooriat.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BargeMamooriatDetail);
