import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IKarbar } from 'app/shared/model/karbar.model';
import { getEntities as getKarbars } from 'app/entities/karbar/karbar.reducer';
import { getEntity, updateEntity, createEntity, reset } from './morkhasi.reducer';
import { IMorkhasi } from 'app/shared/model/morkhasi.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import Select from 'react-select';
import DatePicker from 'react-datepicker2';
import {toast} from 'react-toastify';

export interface IMorkhasiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MorkhasiUpdate = (props: IMorkhasiUpdateProps) => {
  const [karbarId, setKarbarId] = useState(props.match.params.kId || '0');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { morkhasiEntity, karbars, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/morkhasi' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getKarbars();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.begin = convertDateTimeToServer(values.begin);
    values.end = convertDateTimeToServer(values.end);

    if (startDate && endDate && karbarId !== '0') {
      const entity = {
        ...morkhasiEntity,
        ...values,
        begin: convertDateTimeToServer(startDate),
        end: convertDateTimeToServer(endDate),
        karbarId
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    } else {
      toast('لطفا همه‌ی اطلاعات را وارد کنید', {type: 'error'})
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sahaApp.morkhasi.home.createOrEditLabel">
            ایجاد مرخصی‌ جدید
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : morkhasiEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="morkhasi-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="morkhasi-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="beginLabel" for="morkhasi-begin">
                  شروع
                </Label>
                
                <DatePicker
                isGregorian={false}
                timePicker={false}
                onChange={(e) => setStartDate(e)}
                value={startDate}
                persianDigits
              />
              </AvGroup>
              <AvGroup>
                <Label id="endLabel" for="morkhasi-end">
                  پایان
                </Label>
                <DatePicker
                  isGregorian={false}
                  timePicker={false}
                  onChange={(e) => setEndDate(e)}
                  value={endDate}
                  persianDigits
                />
              </AvGroup>
              <AvGroup>
                <Label for="morkhasi-karbar">
                  کاربر
                </Label>
                <Select 
                isDisabled={props.match.params.kId}
                options={karbars.map(({name, id}) => ({label: name, value: id}))} 
                placeholder=""
                onChange={(e) => setKarbarId(e && e.value)}
                value={karbars.map(({name, id}) => ({label: name, value: id})).find(({value}) => String(value) === karbarId)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to={props.match.params.kId ? `/karbar/${props.match.params.kId}` : "/morkhasi"} replace color="info">
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
  morkhasiEntity: storeState.morkhasi.entity,
  loading: storeState.morkhasi.loading,
  updating: storeState.morkhasi.updating,
  updateSuccess: storeState.morkhasi.updateSuccess
});

const mapDispatchToProps = {
  getKarbars,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MorkhasiUpdate);
