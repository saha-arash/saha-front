import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IGozaresh } from 'app/shared/model/gozaresh.model';
import { getEntities as getGozareshes } from 'app/entities/gozaresh/gozaresh.reducer';
import { IBankEtelaati } from 'app/shared/model/bank-etelaati.model';
import { getEntities as getBankEtelaatis } from 'app/entities/bank-etelaati/bank-etelaati.reducer';
import { IRafeIradat } from 'app/shared/model/rafe-iradat.model';
import { getEntities as getRafeIradats } from 'app/entities/rafe-iradat/rafe-iradat.reducer';
import { IMostaKhreje } from 'app/shared/model/mosta-khreje.model';
import { getEntities as getMostaKhrejes } from 'app/entities/mosta-khreje/mosta-khreje.reducer';
import { IBilanSeSalGhabl } from 'app/shared/model/bilan-se-sal-ghabl.model';
import { getEntities as getBilanSeSalGhabls } from 'app/entities/bilan-se-sal-ghabl/bilan-se-sal-ghabl.reducer';
import { IMohasebeHazineMamooriat } from 'app/shared/model/mohasebe-hazine-mamooriat.model';
import { getEntities as getMohasebeHazineMamooriats } from 'app/entities/mohasebe-hazine-mamooriat/mohasebe-hazine-mamooriat.reducer';
import { IChekideGardeshKar } from 'app/shared/model/chekide-gardesh-kar.model';
import { getEntities as getChekideGardeshKars } from 'app/entities/chekide-gardesh-kar/chekide-gardesh-kar.reducer';
import { IGozareshHozoor } from 'app/shared/model/gozaresh-hozoor.model';
import { getEntities as getGozareshHozoors } from 'app/entities/gozaresh-hozoor/gozaresh-hozoor.reducer';
import { IBilanSalGhabl } from 'app/shared/model/bilan-sal-ghabl.model';
import { getEntities as getBilanSalGhabls } from 'app/entities/bilan-sal-ghabl/bilan-sal-ghabl.reducer';
import { IMadarek } from 'app/shared/model/madarek.model';
import { getEntities as getMadareks } from 'app/entities/madarek/madarek.reducer';
import { IGardeshkarBarnameHesabresi } from 'app/shared/model/gardeshkar-barname-hesabresi.model';
import { getEntities as getGardeshkarBarnameHesabresis } from 'app/entities/gardeshkar-barname-hesabresi/gardeshkar-barname-hesabresi.reducer';
import { IDastoorAmalEjraE } from 'app/shared/model/dastoor-amal-ejra-e.model';
import { getEntities as getDastoorAmalEjraEs } from 'app/entities/dastoor-amal-ejra-e/dastoor-amal-ejra-e.reducer';
import { INameh } from 'app/shared/model/nameh.model';
import { getEntities as getNamehs } from 'app/entities/nameh/nameh.reducer';
import { IKholaseGozaresh } from 'app/shared/model/kholase-gozaresh.model';
import { getEntities as getKholaseGozareshes } from 'app/entities/kholase-gozaresh/kholase-gozaresh.reducer';
import { IGardeshKar } from 'app/shared/model/gardesh-kar.model';
import { getEntities as getGardeshKars } from 'app/entities/gardesh-kar/gardesh-kar.reducer';
import { IBarnameHesabResi } from 'app/shared/model/barname-hesab-resi.model';
import { getEntities as getBarnameHesabResis } from 'app/entities/barname-hesab-resi/barname-hesab-resi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './hesab-resi.reducer';
import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHesabResiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const HesabResiUpdate = (props: IHesabResiUpdateProps) => {
  const [gozareshId, setGozareshId] = useState('0');
  const [bankEtelaatiId, setBankEtelaatiId] = useState('0');
  const [rafeIradatId, setRafeIradatId] = useState('0');
  const [mostaKhrejeId, setMostaKhrejeId] = useState('0');
  const [bilanSeSalGhablId, setBilanSeSalGhablId] = useState('0');
  const [mohasebeHazineMamooriatId, setMohasebeHazineMamooriatId] = useState('0');
  const [chekideGardeshKarId, setChekideGardeshKarId] = useState('0');
  const [gozareshHozoorId, setGozareshHozoorId] = useState('0');
  const [bilanSalGhablId, setBilanSalGhablId] = useState('0');
  const [madarekId, setMadarekId] = useState('0');
  const [gardeshkarBarnameHesabresiId, setGardeshkarBarnameHesabresiId] = useState('0');
  const [dastoorAmalEjraEId, setDastoorAmalEjraEId] = useState('0');
  const [namehId, setNamehId] = useState('0');
  const [kholaseGozareshId, setKholaseGozareshId] = useState('0');
  const [gardeshKarId, setGardeshKarId] = useState('0');
  const [barnameHesabResiId, setBarnameHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {
    hesabResiEntity,
    gozareshes,
    bankEtelaatis,
    rafeIradats,
    mostaKhrejes,
    bilanSeSalGhabls,
    mohasebeHazineMamooriats,
    chekideGardeshKars,
    gozareshHozoors,
    bilanSalGhabls,
    madareks,
    gardeshkarBarnameHesabresis,
    dastoorAmalEjraES,
    namehs,
    kholaseGozareshes,
    gardeshKars,
    barnameHesabResis,
    loading,
    updating
  } = props;

  const handleClose = () => {
    props.history.push(`/hesab-resi/${props.match.params.id}`);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    // props.getGozareshes();
    // props.getBankEtelaatis();
    // props.getRafeIradats();
    // props.getMostaKhrejes();
    // props.getBilanSeSalGhabls();
    // props.getMohasebeHazineMamooriats();
    // props.getChekideGardeshKars();
    // props.getGozareshHozoors();
    // props.getBilanSalGhabls();
    // props.getMadareks();
    // props.getGardeshkarBarnameHesabresis();
    // props.getDastoorAmalEjraEs();
    // props.getNamehs();
    // props.getKholaseGozareshes();
    // props.getGardeshKars();
    // props.getBarnameHesabResis();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...hesabResiEntity,
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
            ایجاد یا به روز رسانی حسابرسی
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>در حال بارگیری...</p>
          ) : (
            <AvForm model={isNew ? {} : hesabResiEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="hesab-resi-id">
                    شناسه
                  </Label>
                  <AvInput id="hesab-resi-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="salLabel" for="hesab-resi-sal">
                  سال
                </Label>
                <AvField disabled={!isNew} id="hesab-resi-sal" type="string" className="form-control" name="sal" />
              </AvGroup>
              <AvGroup>
                <Label id="vaziateHesabResiLabel" for="hesab-resi-vaziateHesabResi">
                  وضعیت
                </Label>
                <AvInput
                  id="hesab-resi-vaziateHesabResi"
                  type="select"
                  className="form-control"
                  name="vaziateHesabResi"
                  value={(!isNew && hesabResiEntity.vaziateHesabResi) || 'SODOOR_BARGE_MAMOORIAT'}
                >
                  <option value="SODOOR_BARGE_MAMOORIAT">
                    شروع برگه ماموریت
                  </option>
                  <option value="DAR_SHOROF_MAMOORIAT">
                    در شرف ماموریت
                  </option>
                  <option value="DAR_HALE_MAMOORIAT">
                    در حال ماموریت
                  </option>
                  <option value="ETMAM_MAMOORIAT_HOZOOR_DARSAZMAN">
                    اتمام ماموریت حضور در سازمان
                  </option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="tatilLabel" for="tedadRoozayeTatilSal">
                  تعداد روزهای تعطیل سال
                </Label>
                <AvField id="tedadRoozayeTatilSal" type="number" className="form-control" name="tedadRoozayeTatilSal" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to={`/hesab-resi/${props.match.params.id}`} replace color="info">
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
  gozareshes: storeState.gozaresh.entities,
  bankEtelaatis: storeState.bankEtelaati.entities,
  rafeIradats: storeState.rafeIradat.entities,
  mostaKhrejes: storeState.mostaKhreje.entities,
  bilanSeSalGhabls: storeState.bilanSeSalGhabl.entities,
  mohasebeHazineMamooriats: storeState.mohasebeHazineMamooriat.entities,
  chekideGardeshKars: storeState.chekideGardeshKar.entities,
  gozareshHozoors: storeState.gozareshHozoor.entities,
  bilanSalGhabls: storeState.bilanSalGhabl.entities,
  madareks: storeState.madarek.entities,
  gardeshkarBarnameHesabresis: storeState.gardeshkarBarnameHesabresi.entities,
  dastoorAmalEjraES: storeState.dastoorAmalEjraE.entities,
  namehs: storeState.nameh.entities,
  kholaseGozareshes: storeState.kholaseGozaresh.entities,
  gardeshKars: storeState.gardeshKar.entities,
  barnameHesabResis: storeState.barnameHesabResi.entities,
  hesabResiEntity: storeState.hesabResi.entity,
  loading: storeState.hesabResi.loading,
  updating: storeState.hesabResi.updating,
  updateSuccess: storeState.hesabResi.updateSuccess
});

const mapDispatchToProps = {
  getGozareshes,
  getBankEtelaatis,
  getRafeIradats,
  getMostaKhrejes,
  getBilanSeSalGhabls,
  getMohasebeHazineMamooriats,
  getChekideGardeshKars,
  getGozareshHozoors,
  getBilanSalGhabls,
  getMadareks,
  getGardeshkarBarnameHesabresis,
  getDastoorAmalEjraEs,
  getNamehs,
  getKholaseGozareshes,
  getGardeshKars,
  getBarnameHesabResis,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HesabResiUpdate);
