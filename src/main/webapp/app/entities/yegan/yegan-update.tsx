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
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import Select from 'react-select';
import omitEmpty from 'omit-empty';

export interface IYeganUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const YeganUpdate = (props: IYeganUpdateProps) => {
  const [idszirYegan, setIdszirYegan] = useState([]);
  const [yeganId, setYeganId] = useState('0');
  const [yeganCodeId, setYeganCodeId] = useState('0');
  const [nirooCodeId, setNirooCodeId] = useState('0');
  const [shahrId, setShahrId] = useState('0');
  const [yeganTypeId, setYeganTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [niroos, setNiroos] = useState();
  const [yeganTypeList, setYeganTypeList] = useState();
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
    const getNiroos = async () => {
      const res = await axios.get('/api/niroo-codes');
      setNiroos(res.data.map(item => ({ value: item.id, label: item.name })));
    };

    const getYeganTypeList = async () => {
      const res = await axios.get('/api/yegan-types');
      setYeganTypeList(res.data.map(item => ({ value: item.id, label: item.name })));
    }
    getYeganTypeList();
    getNiroos();
  }, [])

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    console.log('shahr id',shahrId)
    // return
    if (errors.length === 0) {
      const entity = {
        ...yeganEntity,
        ...values,
        nirooCodeId,
        shahrId,
        yeganTypeId,
        zirYegans: idszirYegan.map((item) => ({id: item.value}))
      };
      delete entity.address
      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  const searchCities = (inputValue, callback) => {
    setTimeout(() => {
      axios.get('/api/shahrs/search', { params: { name: inputValue } }).then((res) => {
        callback(res.data.map(item => ({ value: item.id, label: item.name })))
      })
    }, 1000)
  };

  const searchYegans = (inputValue, callback) => {
    setTimeout(() => {
      axios.get('/api/yegans/serach', { params: { name: inputValue } }).then((res) => {
        callback(res.data.map(item => ({ value: item.id, label: item.name })))
      })
    }, 1000)
  };

  const searchUsers = (inputValue, callback) => {
    setTimeout(() => {
      axios.get('/api/karbars/search', { params: { name: inputValue }}).then((res) => {
        callback(res.data.map(item => ({ value: item.id, label: item.name })))
      })
    }, 1000)
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
                <Label id="username-label" for="username">
                 نام کاربری
                </Label>
                <AvField id="username" type="text" name="username" />
              </AvGroup>
              <AvGroup>
                <Label id="password-label" for="password">
                 کلمه عبور
                </Label>
                <AvField id="password" type="password" name="password" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="yegan-name">
                 نام یگان
                </Label>
                <AvField id="yegan-name" type="text" name="name" />
              </AvGroup>
              {!isNew ?  (<AvGroup>
                <Label id="codeLabel" for="yegan-code">
                  کدیگان
                </Label>
                <AvField id="yegan-code" type="text" name="code" disabled/>
              </AvGroup>) : null}
              <AvGroup>
                <Label for="yegan-zirYegan">
                  زیر یگان ها
                </Label>
                <AsyncSelect
                loadOptions={searchYegans}
                defaultOptions={true}
                placeholder="" isClearable 
                isMulti
                onChange={(e) => setIdszirYegan(e)}
              />
              </AvGroup>
              <AvGroup>
                <Label for="yegan-nirooCode">
                  نیرو ها
                </Label>
                <Select 
                options={niroos} 
                placeholder="" 
                isClearable
                onChange={(e) => setNirooCodeId(e && e.value)}
                ></Select>
                
              </AvGroup>
              <AvGroup>
                <Label for="yegan-shahr">
                  شهر
                </Label>
                <AsyncSelect
                loadOptions={searchCities}
                defaultOptions={true}
                placeholder="" isClearable 
                onChange={(e) => setShahrId(e.value)}
              />
              </AvGroup>
              <AvGroup>
                <Label for="yegan-yeganType">
                  نوع یگان
                </Label>
                <Select
                 options={yeganTypeList} placeholder="" isClearable
                 onChange={(e) => setYeganTypeId(e && e.value)}
                ></Select>
              </AvGroup>
              <AvGroup>
                <Label for="yegan-shahr">
                  فرمانده
                </Label>
                <AsyncSelect
                loadOptions={searchUsers}
                defaultOptions={true}
                placeholder="" isClearable 
                onChange={(e) => false}
              />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="address">
                 آدرس
                </Label>
                <AvField id="address" type="text" name="address" />
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
