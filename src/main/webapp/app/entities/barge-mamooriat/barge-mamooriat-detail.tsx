import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBargeMamooriatDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BargeMamooriatDetail = (props: IBargeMamooriatDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bargeMamooriatEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.bargeMamooriat.detail.title">BargeMamooriat</Translate> [<b>{bargeMamooriatEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="vaziat">
              <Translate contentKey="sahaApp.bargeMamooriat.vaziat">Vaziat</Translate>
            </span>
          </dt>
          <dd>{bargeMamooriatEntity.vaziat}</dd>
          <dt>
            <span id="saleMamooriat">
              <Translate contentKey="sahaApp.bargeMamooriat.saleMamooriat">Sale Mamooriat</Translate>
            </span>
          </dt>
          <dd>{bargeMamooriatEntity.saleMamooriat}</dd>
          <dt>
            <span id="shorooMamooriat">
              <Translate contentKey="sahaApp.bargeMamooriat.shorooMamooriat">Shoroo Mamooriat</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={bargeMamooriatEntity.shorooMamooriat} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="payanMamooriat">
              <Translate contentKey="sahaApp.bargeMamooriat.payanMamooriat">Payan Mamooriat</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={bargeMamooriatEntity.payanMamooriat} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="sahaApp.bargeMamooriat.sarparast">Sarparast</Translate>
          </dt>
          <dd>{bargeMamooriatEntity.sarparast ? bargeMamooriatEntity.sarparast.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.bargeMamooriat.yegan">Yegan</Translate>
          </dt>
          <dd>{bargeMamooriatEntity.yegan ? bargeMamooriatEntity.yegan.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.bargeMamooriat.hesabResi">Hesab Resi</Translate>
          </dt>
          <dd>{bargeMamooriatEntity.hesabResi ? bargeMamooriatEntity.hesabResi.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/barge-mamooriat" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/barge-mamooriat/${bargeMamooriatEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
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
