import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { getEntities as getBargeMamooriats } from 'app/entities/barge-mamooriat/barge-mamooriat.reducer';
import { IYegan } from 'app/shared/model/yegan.model';
import { getEntities as getYegans } from 'app/entities/yegan/yegan.reducer';
import { IYeganCode } from 'app/shared/model/yegan-code.model';
import { getEntities as getYeganCodes } from 'app/entities/yegan-code/yegan-code.reducer';
import { IDaraje } from 'app/shared/model/daraje.model';
import { getEntities as getDarajes } from 'app/entities/daraje/daraje.reducer';
import { ISemat } from 'app/shared/model/semat.model';
import { getEntities as getSemats } from 'app/entities/semat/semat.reducer';
import { getEntity, updateEntity, createEntity, reset } from './karbar.reducer';
import { IKarbar } from 'app/shared/model/karbar.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import Select from "react-select";
import DatePicker from 'react-datepicker2';
import moment from 'jalali-moment';

export interface IKarbarUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const KarbarUpdate = (props: IKarbarUpdateProps) => {
  const [idsbargeMamoorit, setIdsbargeMamoorit] = useState([]);
  const [idsbinanadeBargeMamoorit, setIdsbinanadeBargeMamoorit] = useState([]);
  const [sarparestemamooriatId, setSarparestemamooriatId] = useState('0');
  const [yeganId, setYeganId] = useState('0');
  const [yeganCodeId, setYeganCodeId] = useState('0');
  const [darajeId, setDarajeId] = useState('0');
  const [sematId, setSematId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [estekhdamDate, setEstekhdamDate] = useState<any>();
  const [bazneshastegiDate, setBazneshasegiDate] = useState<any>();
  const { karbarEntity, bargeMamooriats, yegans, yeganCodes, darajes, semats, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/karbar' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBargeMamooriats();
    props.getYegans();
    props.getYeganCodes();
    props.getDarajes();
    props.getSemats();
  }, []);

  useEffect(() => {
    if(karbarEntity) {
      setSematId(karbarEntity.sematId?.toString());
      setDarajeId(karbarEntity.darajeId?.toString());
      setYeganId(karbarEntity.yeganId?.toString());
      setEstekhdamDate(moment(karbarEntity.tarikhEstekhdam?.toString()));
      setBazneshasegiDate(moment(karbarEntity.tarikhBazneshastegi?.toString()))
    }
  }, [karbarEntity])
  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...karbarEntity,
        ...values,
        darajeId,
        sematId,
        yeganId,
        tarikhBazneshastegi: convertDateTimeToServer(bazneshastegiDate),
        tarikhEstekhdam: convertDateTimeToServer(estekhdamDate),
        // yeganCodeId: 1
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
          <h2 id="sahaApp.karbar.home.createOrEditLabel">
            ایجاد و ویرایش کاربر
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : karbarEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="karbar-id">
                    شناسه
                  </Label>
                  <AvInput id="karbar-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="usernameLabel" for="karbar-username">
                  نام کاربری
                </Label>
                <AvField id="karbar-username" type="text" name="username" />
              </AvGroup>
              <AvGroup>
                <Label id="passwordLabel" for="karbar-password">
                  کلمه عبور
                </Label>
                <AvField id="karbar-password" type="password" name="password" placeholder="****" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="karbar-name">
                  نام
                </Label>
                <AvField id="karbar-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="shoghlSazmaniLabel" for="karbar-shoghlSazmani">
                  شغل سازمانی
                </Label>
                <AvField id="karbar-shoghlSazmani" type="text" name="shoghlSazmani" />
              </AvGroup>
              <AvGroup>
                <Label id="shoghlAmaliLabel" for="karbar-shoghlAmali">
                  شغل عملی
                </Label>
                <AvField id="karbar-shoghlAmali" type="text" name="shoghlAmali" />
              </AvGroup>
              <AvGroup>
                <Label id="codePerseneliLabel" for="karbar-codePerseneli">
                  کد پرسنلی
                </Label>
                <AvField id="karbar-codePerseneli" type="text" name="codePerseneli" />
              </AvGroup>
              <AvGroup check>
                <Label id="bezaneshateLabel">
                  <AvInput id="karbar-bezaneshate" type="checkbox" className="form-check-input" name="bezaneshate" />
                  بازنشسته
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="sazmaniLabel">
                  <AvInput id="karbar-sazmani" type="checkbox" className="form-check-input" name="sazmani" />
                  سازمانی
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="tarikhBazneshastegiLabel" for="karbar-tarikhBazneshastegi">
                  تاریخ بازنشستگی
                </Label>
                <DatePicker

                  isGregorian={false}
                  timePicker={false}
                  onChange={(e) => setBazneshasegiDate(e)}
                  value={bazneshastegiDate}
                  persianDigits
                />
              </AvGroup>
              <AvGroup>
                <Label id="tarikhEstekhdamLabel" for="karbar-tarikhEstekhdam">
                  تاریخ استخدام
                </Label>
                <DatePicker
                  isGregorian={false}
                  timePicker={false}
                  onChange={(e) => setEstekhdamDate(e)}
                  value={estekhdamDate}
                  persianDigits
                />
              </AvGroup>
              
              <AvGroup>
                <Label for="karbar-yegan">
                  یگان
                </Label>
                <Select 
                options={yegans.map(({id, name}) => ({label: name, value: id}))} 
                placeholder=""
                onChange={(e) => setYeganId(e && e.value)}
                value={yegans.length && yegans.map(({id, name}) => ({label: name, value: id})).find(({value}) => value.toString() === yeganId)}
                />
                
              </AvGroup>
              {/* <AvGroup>
                <Label for="karbar-yeganCode">
                  کد یگان
                </Label>
                <Select 
                options={yeganCodes.map(({id, name}) => ({label: name, value: id}))}
                placeholder=""
                ></Select>
                
              </AvGroup> */}
              <AvGroup>
                <Label for="karbar-daraje">
                  درجه
                </Label>
                <Select 
                options={darajes.map(({id, name}) => ({label: name, value: id}))} 
                placeholder=""
                onChange={(e) => setDarajeId(e && e.value)}
                value={darajes.length && darajes.map(({id, name}) => ({label: name, value: id})).find(({value}) => value.toString() === darajeId.toString())}
                ></Select>
                
              </AvGroup>
              <AvGroup>
                <Label for="karbar-semat">
                  سمت
                </Label>
                <Select 
                options={semats.map(({id, onvanShoghli}) => ({label: onvanShoghli, value: id}))} 
                placeholder=""
                onChange={(e) => setSematId(e && e.value)}
                value={semats.length && semats.map(({id, onvanShoghli}) => ({label: onvanShoghli, value: id})).find(({value}) => (value.toString() === sematId))}
                ></Select>
              
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/karbar" replace color="info">
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
  bargeMamooriats: storeState.bargeMamooriat.entities,
  yegans: storeState.yegan.entities,
  yeganCodes: storeState.yeganCode.entities,
  darajes: storeState.daraje.entities,
  semats: storeState.semat.entities,
  karbarEntity: storeState.karbar.entity,
  loading: storeState.karbar.loading,
  updating: storeState.karbar.updating,
  updateSuccess: storeState.karbar.updateSuccess
});

const mapDispatchToProps = {
  getBargeMamooriats,
  getYegans,
  getYeganCodes,
  getDarajes,
  getSemats,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(KarbarUpdate);
