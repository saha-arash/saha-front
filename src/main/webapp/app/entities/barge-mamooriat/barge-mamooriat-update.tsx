import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IKarbar } from 'app/shared/model/karbar.model';
import { getEntities as getKarbars } from 'app/entities/karbar/karbar.reducer';
import { IYegan } from 'app/shared/model/yegan.model';
import { getEntities as getYegans } from 'app/entities/yegan/yegan.reducer';
import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { getEntities as getHesabResis } from 'app/entities/hesab-resi/hesab-resi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBargeMamooriatUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BargeMamooriatUpdate = (props: IBargeMamooriatUpdateProps) => {
  const [sarparastId, setSarparastId] = useState('0');
  const [nafarId, setNafarId] = useState('0');
  const [binandeId, setBinandeId] = useState('0');
  const [yeganId, setYeganId] = useState('0');
  const [hesabResiId, setHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bargeMamooriatEntity, karbars, yegans, hesabResis, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/barge-mamooriat');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getKarbars();
    props.getYegans();
    props.getHesabResis();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.shorooMamooriat = convertDateTimeToServer(values.shorooMamooriat);
    values.payanMamooriat = convertDateTimeToServer(values.payanMamooriat);

    if (errors.length === 0) {
      const entity = {
        ...bargeMamooriatEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2>
            <span>ایجاد/ویرایش برگه ماموریت</span>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bargeMamooriatEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="barge-mamooriat-id">
                    <span>شناسه</span>
                  </Label>
                  <AvInput id="barge-mamooriat-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="vaziatLabel" for="barge-mamooriat-vaziat">
                  <span>وضعیت</span>
                </Label>
                <AvInput
                  id="barge-mamooriat-vaziat"
                  type="select"
                  className="form-control"
                  name="vaziat"
                  value={(!isNew && bargeMamooriatEntity.vaziat) || 'SARPARAST_TIME_HESABRESI'}
                >
                  <option value="SARPARAST_TIME_HESABRESI">{translate('sahaApp.VaziatBargeMamooriat.SARPARAST_TIME_HESABRESI')}</option>
                  <option value="DAR_ENTEZAR_TAEED_MODIR_HESABRESI">
                    {translate('sahaApp.VaziatBargeMamooriat.DAR_ENTEZAR_TAEED_MODIR_HESABRESI')}
                  </option>
                  <option value="DAR_ENTEZAR_TAEED_MOAVEN_HESABRESI">
                    {translate('sahaApp.VaziatBargeMamooriat.DAR_ENTEZAR_TAEED_MOAVEN_HESABRESI')}
                  </option>
                  <option value="DAR_ENTEZAR_TAEED_JANESHIN_SAZMAN">
                    {translate('sahaApp.VaziatBargeMamooriat.DAR_ENTEZAR_TAEED_JANESHIN_SAZMAN')}
                  </option>
                  <option value="DAR_ENTEZAR_TAEED_RIASATSAZMAN">
                    {translate('sahaApp.VaziatBargeMamooriat.DAR_ENTEZAR_TAEED_RIASATSAZMAN')}
                  </option>
                  <option value="DAR_ENTEZAR_TAEED_HEYAT_RAESE_AJA">
                    {translate('sahaApp.VaziatBargeMamooriat.DAR_ENTEZAR_TAEED_HEYAT_RAESE_AJA')}
                  </option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="saleMamooriatLabel" for="barge-mamooriat-saleMamooriat">
                  <span>سال</span>
                </Label>
                <AvField id="barge-mamooriat-saleMamooriat" type="string" className="form-control" name="saleMamooriat" />
              </AvGroup>
              <AvGroup>
                <Label id="shorooMamooriatLabel" for="barge-mamooriat-shorooMamooriat">
                  <span>شروع ماموریت</span>
                </Label>
                <AvInput
                  id="barge-mamooriat-shorooMamooriat"
                  type="datetime-local"
                  className="form-control"
                  name="shorooMamooriat"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.bargeMamooriatEntity.shorooMamooriat)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="payanMamooriatLabel" for="barge-mamooriat-payanMamooriat">
                  <span>پایان ماموریت</span>
                </Label>
                <AvInput
                  id="barge-mamooriat-payanMamooriat"
                  type="datetime-local"
                  className="form-control"
                  name="payanMamooriat"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.bargeMamooriatEntity.payanMamooriat)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="barge-mamooriat-sarparast">
                  <span>انتخاب سرپرست</span>
                </Label>
                <AvInput id="barge-mamooriat-sarparast" type="select" className="form-control" name="sarparast.id">
                  <option value="" key="0" />
                  {karbars
                    ? karbars.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="barge-mamooriat-yegan">
                  <span>انتخاب یگان</span>
                </Label>
                <AvInput id="barge-mamooriat-yegan" type="select" className="form-control" name="yegan.id">
                  <option value="" key="0" />
                  {yegans
                    ? yegans.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="barge-mamooriat-hesabResi">
                  <span>شناسه حسابرسی</span>
                </Label>
                <AvInput id="barge-mamooriat-hesabResi" type="select" className="form-control" name="hesabResi.id">
                  <option value="" key="0" />
                  {hesabResis
                    ? hesabResis.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/barge-mamooriat" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <span>بازگشت</span>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <span>ذخیره</span>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  karbars: storeState.karbar.entities,
  yegans: storeState.yegan.entities,
  hesabResis: storeState.hesabResi.entities,
  bargeMamooriatEntity: storeState.bargeMamooriat.entity,
  loading: storeState.bargeMamooriat.loading,
  updating: storeState.bargeMamooriat.updating,
  updateSuccess: storeState.bargeMamooriat.updateSuccess
});

const mapDispatchToProps = {
  getKarbars,
  getYegans,
  getHesabResis,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BargeMamooriatUpdate);
