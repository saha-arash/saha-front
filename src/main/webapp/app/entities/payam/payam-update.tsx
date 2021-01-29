import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IKarbar } from 'app/shared/model/karbar.model';
import { getEntities as getKarbars } from 'app/entities/karbar/karbar.reducer';
import { IYegan } from 'app/shared/model/yegan.model';
import { getEntities as getYegans } from 'app/entities/yegan/yegan.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './payam.reducer';
import { IPayam } from 'app/shared/model/payam.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import Select from 'react-select';

export interface IPayamUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const PayamUpdate = (props: IPayamUpdateProps) => {
  const [karbarErsalKonandeId, setKarbarErsalKonandeId] = useState('0');
  const [karbarDaryaftKonandId, setKarbarDaryaftKonandId] = useState('0');
  const [yeganErsalKonanadeId, setYeganErsalKonanadeId] = useState('0');
  const [yeganDaryaftKonanadeId, setYeganDaryaftKonanadeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [receiver, setReceiver] = useState<'karbar' | 'yegan'>('karbar');
  const { payamEntity, karbars, yegans, loading, updating } = props;

  const { matn } = payamEntity;

  const handleClose = () => {
    props.history.push('/payam' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getKarbars();
    props.getYegans();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const [selectedYegan, setSelectedYegan] = useState('0');
  const [selectedKarbar, setSelectedKarbar] = useState('0');

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...payamEntity,
        ...values
      };

      if(receiver === 'karbar') {
        entity.karbarDaryaftKonandId = selectedKarbar
      } else {
        entity.yeganDaryaftKonandId = selectedYegan
      }

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
          <h2 id="sahaApp.payam.home.createOrEditLabel">
            ایجاد پیام
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
              <AvForm model={isNew ? {} : payamEntity} onSubmit={saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="payam-id">
                      شناسه
                  </Label>
                    <AvInput id="payam-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="onvanLabel" for="payam-onvan">
                    عنوان
                </Label>
                  <AvField id="payam-onvan" type="text" name="onvan" />
                </AvGroup>
                <AvGroup>
                  <Label id="matnLabel" for="payam-matn">
                    متن پیام
                </Label>
                  <AvInput id="payam-matn" type="textarea" name="matn" />
                </AvGroup>
                <AvGroup>
                  <span>
                    دریافت کننده:
                </span>
                  <Label className="d-block">
                    <Input 
                    type="radio" 
                    name="receiver" 
                    value="karbar" 
                    checked={receiver === 'karbar'} 
                    onChange={(e) => setReceiver(e.currentTarget.value)}
                    />{' '}
                    کاربر
                  </Label>
                  <Label className="d-block">
                    <Input 
                    type="radio" 
                    name="receiver" 
                    value="yegan" 
                    checked={receiver === 'yegan'}
                    onChange={(e) => setReceiver(e.currentTarget.value)}
                    />{' '}
                    یگان
                  </Label>
                </AvGroup>
                {/* <AvGroup>
                <Label for="payam-karbarErsalKonande">
                  <Translate contentKey="sahaApp.payam.karbarErsalKonande">Karbar Ersal Konande</Translate>
                </Label>
                <AvInput id="payam-karbarErsalKonande" type="select" className="form-control" name="karbarErsalKonandeId">
                  <option value="" key="0" />
                  {karbars
                    ? karbars.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup> */}
              {
                receiver === 'karbar' ? (
                <AvGroup>
                  <Label for="payam-karbarDaryaftKonand">
                    کاربر دریافت کننده
                </Label>
                  <Select 
                  options={karbars.map(({ name, id }) => ({ label: name, value: id }))} 
                  onChange={(e) => setSelectedKarbar(e && e.value)}
                  placeholder="" />
                  
                </AvGroup>
                ) : (
                <AvGroup>
                  <Label for="payam-yeganDaryaftKonanade">
                    یگان دریافت کننده
                </Label>
                  <Select 
                  options={yegans.map(({ name, id }) => ({ label: name, value: id }))} 
                  onChange={(e) => setSelectedYegan(e && e.value)}
                  placeholder="" />
                </AvGroup>
                )
              }
                
                
                {/* <AvGroup>
                <Label for="payam-yeganErsalKonanade">
                  <Translate contentKey="sahaApp.payam.yeganErsalKonanade">Yegan Ersal Konanade</Translate>
                </Label>
                <AvInput id="payam-yeganErsalKonanade" type="select" className="form-control" name="yeganErsalKonanadeId">
                  <option value="" key="0" />
                  {yegans
                    ? yegans.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup> */}
                
                <Button tag={Link} id="cancel-save" to="/payam" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
              &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
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
  payamEntity: storeState.payam.entity,
  loading: storeState.payam.loading,
  updating: storeState.payam.updating,
  updateSuccess: storeState.payam.updateSuccess
});

const mapDispatchToProps = {
  getKarbars,
  getYegans,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PayamUpdate);
