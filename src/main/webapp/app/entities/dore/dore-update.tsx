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
import { getEntity, updateEntity, createEntity, reset } from './dore.reducer';
import { IDore } from 'app/shared/model/dore.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import Select from 'react-select';
import DatePicker from 'react-datepicker2';
import {toast} from 'react-toastify';

export interface IDoreUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DoreUpdate = (props: IDoreUpdateProps) => {
  const [karbarId, setKarbarId] = useState('0');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { doreEntity, karbars, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/dore' + props.location.search);
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
        ...doreEntity,
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
          <h2 id="sahaApp.dore.home.createOrEditLabel">
            ایجاد دوره جدید
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : doreEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="dore-id">
                    شناسه
                  </Label>
                  <AvInput id="dore-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="beginLabel" for="dore-begin">
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
                <Label id="endLabel" for="dore-end">
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
                <Label for="dore-karbar">
                  کاربر
                </Label>
                <Select 
                options={karbars.map(({name, id}) => ({label: name, value: id}))} 
                placeholder=""
                onChange={(e) => setKarbarId(e && e.value)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/dore" replace color="info">
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
  doreEntity: storeState.dore.entity,
  loading: storeState.dore.loading,
  updating: storeState.dore.updating,
  updateSuccess: storeState.dore.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(DoreUpdate);
