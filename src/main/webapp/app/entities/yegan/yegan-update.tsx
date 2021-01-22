import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getYegans } from 'app/entities/yegan/yegan.reducer';
import { IYeganCode } from 'app/shared/model/yegan-code.model';
import { getEntities as getYeganCodes } from 'app/entities/yegan-code/yegan-code.reducer';
import { INirooCode } from 'app/shared/model/niroo-code.model';
import { getEntities as getNirooCodes } from 'app/entities/niroo-code/niroo-code.reducer';
import { IShahr } from 'app/shared/model/shahr.model';
import { getEntities as getShahrs } from 'app/entities/shahr/shahr.reducer';
import { IYeganType } from 'app/shared/model/yegan-type.model';
import { getEntities as getYeganTypes } from 'app/entities/yegan-type/yegan-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './yegan.reducer';
import { IYegan } from 'app/shared/model/yegan.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IYeganUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const YeganUpdate = (props: IYeganUpdateProps) => {
  const [idszirYegan, setIdszirYegan] = useState([]);
  const [yeganId, setYeganId] = useState('0');
  const [yeganCodeId, setYeganCodeId] = useState('0');
  const [nirooCodeId, setNirooCodeId] = useState('0');
  const [shahrId, setShahrId] = useState('0');
  const [yeganTypeId, setYeganTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { yeganEntity, yegans, yeganCodes, nirooCodes, shahrs, yeganTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/yegan' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getYegans();
    props.getYeganCodes();
    props.getNirooCodes();
    props.getShahrs();
    props.getYeganTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...yeganEntity,
        ...values,
        zirYegans: mapIdList(values.zirYegans)
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
          <h2 id="sahaApp.yegan.home.createOrEditLabel">
            ایجاد یا ویرایش یگان
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : yeganEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="yegan-id">
                    شناسه
                  </Label>
                  <AvInput id="yegan-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="yegan-name">
                 نام یگان
                </Label>
                <AvField id="yegan-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="yegan-code">
                  کدیگان
                </Label>
                <AvField id="yegan-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label for="yegan-zirYegan">
                  زیر یگان ها
                </Label>
                <AvInput
                  id="yegan-zirYegan"
                  type="select"
                  multiple
                  className="form-control"
                  name="zirYegans"
                  value={yeganEntity.zirYegans && yeganEntity.zirYegans.map(e => e.id)}
                >
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
                <Label for="yegan-nirooCode">
                  نیرو ها
                </Label>
                <AvInput id="yegan-nirooCode" type="select" className="form-control" name="nirooCodeId">
                  <option value="" key="0" />
                  {nirooCodes
                    ? nirooCodes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="yegan-shahr">
                  شهر
                </Label>
                <AvInput id="yegan-shahr" type="select" className="form-control" name="shahrId">
                  <option value="" key="0" />
                  {shahrs
                    ? shahrs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="yegan-yeganType">
                  نوع یگان
                </Label>
                <AvInput id="yegan-yeganType" type="select" className="form-control" name="yeganTypeId">
                  <option value="" key="0" />
                  {yeganTypes
                    ? yeganTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/yegan" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  بازگشت
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                ذخیره
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  yegans: storeState.yegan.entities,
  yeganCodes: storeState.yeganCode.entities,
  nirooCodes: storeState.nirooCode.entities,
  shahrs: storeState.shahr.entities,
  yeganTypes: storeState.yeganType.entities,
  yeganEntity: storeState.yegan.entity,
  loading: storeState.yegan.loading,
  updating: storeState.yegan.updating,
  updateSuccess: storeState.yegan.updateSuccess
});

const mapDispatchToProps = {
  getYegans,
  getYeganCodes,
  getNirooCodes,
  getShahrs,
  getYeganTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(YeganUpdate);
