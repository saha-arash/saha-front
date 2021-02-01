import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { getEntities as getHesabResis } from 'app/entities/hesab-resi/hesab-resi.reducer';
import { IBarnameHesabResi } from 'app/shared/model/barname-hesab-resi.model';
import { getEntities as getBarnameHesabResis } from 'app/entities/barname-hesab-resi/barname-hesab-resi.reducer';
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
import { getEntity, updateEntity, createEntity, setBlob, reset } from './file-hesab-resi.reducer';
import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import translateToFa from '../hesab-resi/translate';

export interface IFileHesabResiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileHesabResiUpdate = (props: IFileHesabResiUpdateProps) => {

  const { fileType, hesabresiId }: any = props.match.params;

  const [hesabResiId, setHesabResiId] = useState('0');
  const [barnameHesabResiId, setBarnameHesabResiId] = useState('0');
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
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {
    fileHesabResiEntity,
    hesabResis,
    barnameHesabResis,
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
    loading,
    updating
  } = props;

  const { file, fileContentType } = fileHesabResiEntity;

  const handleClose = () => {
    props.history.push(`/file-hesab-resi/${fileType}/${hesabresiId}` + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    // props.getHesabResis();
    // props.getBarnameHesabResis();
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
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    // values.tarikhName = convertDateTimeToServer(values.tarikhName);

    if (errors.length === 0) {
      const entity = {
        ...fileHesabResiEntity,
        ...values,
        bankEtelaatiId: hesabresiId,
        fileType
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
          <h2 id="sahaApp.fileHesabResi.home.createOrEditLabel">
            ایجاد {translateToFa[fileType]}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fileHesabResiEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="file-hesab-resi-id">
                    شناسه
                  </Label>
                  <AvInput id="file-hesab-resi-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvGroup>
                  <Label id="fileLabel" for="file">
                    فایل
                  </Label>
                  <br />
                  {file ? (
                    <div>
                      <a onClick={openFile(fileContentType, file)}>
                        باز کردن
                      </a>
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {fileContentType}, {byteSize(file)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('file')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_file" type="file" onChange={onBlobChange(false, 'file')} />
                  <AvInput type="hidden" name="file" value={file} />
                </AvGroup>
                </AvGroup>
              {/* 
              <AvGroup>
                <Label id="shomareLabel" for="file-hesab-resi-shomare">
                  <Translate contentKey="sahaApp.fileHesabResi.shomare">Shomare</Translate>
                </Label>
                <AvField id="file-hesab-resi-shomare" type="string" className="form-control" name="shomare" />
              </AvGroup>
              <AvGroup>
                <Label id="tarikhNameLabel" for="file-hesab-resi-tarikhName">
                  <Translate contentKey="sahaApp.fileHesabResi.tarikhName">Tarikh Name</Translate>
                </Label>
                <AvInput
                  id="file-hesab-resi-tarikhName"
                  type="datetime-local"
                  className="form-control"
                  name="tarikhName"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.fileHesabResiEntity.tarikhName)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="mozooLabel" for="file-hesab-resi-mozoo">
                  <Translate contentKey="sahaApp.fileHesabResi.mozoo">Mozoo</Translate>
                </Label>
                <AvField id="file-hesab-resi-mozoo" type="text" name="mozoo" />
              </AvGroup>
              <AvGroup>
                <Label id="fileTypeLabel" for="file-hesab-resi-fileType">
                  <Translate contentKey="sahaApp.fileHesabResi.fileType">File Type</Translate>
                </Label>
                <AvInput
                  id="file-hesab-resi-fileType"
                  type="select"
                  className="form-control"
                  name="fileType"
                  value={(!isNew && fileHesabResiEntity.fileType) || 'MadarekBarnameHesabResi'}
                >
                  <option value="MadarekBarnameHesabResi">{translate('sahaApp.FileType.MadarekBarnameHesabResi')}</option>
                  <option value="MohasebeHazineMamooriat">{translate('sahaApp.FileType.MohasebeHazineMamooriat')}</option>
                  <option value="VoroodiBilanSalGhabl">{translate('sahaApp.FileType.VoroodiBilanSalGhabl')}</option>
                  <option value="DastoorAmalEjraE">{translate('sahaApp.FileType.DastoorAmalEjraE')}</option>
                  <option value="GardeshkarBarnameHesabresi">{translate('sahaApp.FileType.GardeshkarBarnameHesabresi')}</option>
                  <option value="Madarek">{translate('sahaApp.FileType.Madarek')}</option>
                  <option value="KhoroojiBilanSalGhabl">{translate('sahaApp.FileType.KhoroojiBilanSalGhabl')}</option>
                  <option value="VoroodiBilanSeSalGhabl">{translate('sahaApp.FileType.VoroodiBilanSeSalGhabl')}</option>
                  <option value="KhoroojiBilanSeSalGhabl">{translate('sahaApp.FileType.KhoroojiBilanSeSalGhabl')}</option>
                  <option value="MadarekGozaresh">{translate('sahaApp.FileType.MadarekGozaresh')}</option>
                  <option value="MostaKhreje">{translate('sahaApp.FileType.MostaKhreje')}</option>
                  <option value="KholaseGozaresh">{translate('sahaApp.FileType.KholaseGozaresh')}</option>
                  <option value="BankEtelaati">{translate('sahaApp.FileType.BankEtelaati')}</option>
                  <option value="Nameh">{translate('sahaApp.FileType.Nameh')}</option>
                  <option value="RafeIradat">{translate('sahaApp.FileType.RafeIradat')}</option>
                  <option value="GardeshKar">{translate('sahaApp.FileType.GardeshKar')}</option>
                  <option value="NoeBarnameHesabResi">{translate('sahaApp.FileType.NoeBarnameHesabResi')}</option>
                  <option value="BarnameHesabResi">{translate('sahaApp.FileType.BarnameHesabResi')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-hesabResi">
                  <Translate contentKey="sahaApp.fileHesabResi.hesabResi">Hesab Resi</Translate>
                </Label>
                <AvInput id="file-hesab-resi-hesabResi" type="select" className="form-control" name="hesabResiId">
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
              <AvGroup>
                <Label for="file-hesab-resi-barnameHesabResi">
                  <Translate contentKey="sahaApp.fileHesabResi.barnameHesabResi">Barname Hesab Resi</Translate>
                </Label>
                <AvInput id="file-hesab-resi-barnameHesabResi" type="select" className="form-control" name="barnameHesabResiId">
                  <option value="" key="0" />
                  {barnameHesabResis
                    ? barnameHesabResis.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-bankEtelaati">
                  <Translate contentKey="sahaApp.fileHesabResi.bankEtelaati">Bank Etelaati</Translate>
                </Label>
                <AvInput id="file-hesab-resi-bankEtelaati" type="select" className="form-control" name="bankEtelaatiId">
                  <option value="" key="0" />
                  {bankEtelaatis
                    ? bankEtelaatis.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-rafeIradat">
                  <Translate contentKey="sahaApp.fileHesabResi.rafeIradat">Rafe Iradat</Translate>
                </Label>
                <AvInput id="file-hesab-resi-rafeIradat" type="select" className="form-control" name="rafeIradatId">
                  <option value="" key="0" />
                  {rafeIradats
                    ? rafeIradats.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-mostaKhreje">
                  <Translate contentKey="sahaApp.fileHesabResi.mostaKhreje">Mosta Khreje</Translate>
                </Label>
                <AvInput id="file-hesab-resi-mostaKhreje" type="select" className="form-control" name="mostaKhrejeId">
                  <option value="" key="0" />
                  {mostaKhrejes
                    ? mostaKhrejes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-bilanSeSalGhabl">
                  <Translate contentKey="sahaApp.fileHesabResi.bilanSeSalGhabl">Bilan Se Sal Ghabl</Translate>
                </Label>
                <AvInput id="file-hesab-resi-bilanSeSalGhabl" type="select" className="form-control" name="bilanSeSalGhablId">
                  <option value="" key="0" />
                  {bilanSeSalGhabls
                    ? bilanSeSalGhabls.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-mohasebeHazineMamooriat">
                  <Translate contentKey="sahaApp.fileHesabResi.mohasebeHazineMamooriat">Mohasebe Hazine Mamooriat</Translate>
                </Label>
                <AvInput
                  id="file-hesab-resi-mohasebeHazineMamooriat"
                  type="select"
                  className="form-control"
                  name="mohasebeHazineMamooriatId"
                >
                  <option value="" key="0" />
                  {mohasebeHazineMamooriats
                    ? mohasebeHazineMamooriats.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-chekideGardeshKar">
                  <Translate contentKey="sahaApp.fileHesabResi.chekideGardeshKar">Chekide Gardesh Kar</Translate>
                </Label>
                <AvInput id="file-hesab-resi-chekideGardeshKar" type="select" className="form-control" name="chekideGardeshKarId">
                  <option value="" key="0" />
                  {chekideGardeshKars
                    ? chekideGardeshKars.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-gozareshHozoor">
                  <Translate contentKey="sahaApp.fileHesabResi.gozareshHozoor">Gozaresh Hozoor</Translate>
                </Label>
                <AvInput id="file-hesab-resi-gozareshHozoor" type="select" className="form-control" name="gozareshHozoorId">
                  <option value="" key="0" />
                  {gozareshHozoors
                    ? gozareshHozoors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-bilanSalGhabl">
                  <Translate contentKey="sahaApp.fileHesabResi.bilanSalGhabl">Bilan Sal Ghabl</Translate>
                </Label>
                <AvInput id="file-hesab-resi-bilanSalGhabl" type="select" className="form-control" name="bilanSalGhablId">
                  <option value="" key="0" />
                  {bilanSalGhabls
                    ? bilanSalGhabls.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-madarek">
                  <Translate contentKey="sahaApp.fileHesabResi.madarek">Madarek</Translate>
                </Label>
                <AvInput id="file-hesab-resi-madarek" type="select" className="form-control" name="madarekId">
                  <option value="" key="0" />
                  {madareks
                    ? madareks.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-gardeshkarBarnameHesabresi">
                  <Translate contentKey="sahaApp.fileHesabResi.gardeshkarBarnameHesabresi">Gardeshkar Barname Hesabresi</Translate>
                </Label>
                <AvInput
                  id="file-hesab-resi-gardeshkarBarnameHesabresi"
                  type="select"
                  className="form-control"
                  name="gardeshkarBarnameHesabresiId"
                >
                  <option value="" key="0" />
                  {gardeshkarBarnameHesabresis
                    ? gardeshkarBarnameHesabresis.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-dastoorAmalEjraE">
                  <Translate contentKey="sahaApp.fileHesabResi.dastoorAmalEjraE">Dastoor Amal Ejra E</Translate>
                </Label>
                <AvInput id="file-hesab-resi-dastoorAmalEjraE" type="select" className="form-control" name="dastoorAmalEjraEId">
                  <option value="" key="0" />
                  {dastoorAmalEjraES
                    ? dastoorAmalEjraES.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-nameh">
                  <Translate contentKey="sahaApp.fileHesabResi.nameh">Nameh</Translate>
                </Label>
                <AvInput id="file-hesab-resi-nameh" type="select" className="form-control" name="namehId">
                  <option value="" key="0" />
                  {namehs
                    ? namehs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-kholaseGozaresh">
                  <Translate contentKey="sahaApp.fileHesabResi.kholaseGozaresh">Kholase Gozaresh</Translate>
                </Label>
                <AvInput id="file-hesab-resi-kholaseGozaresh" type="select" className="form-control" name="kholaseGozareshId">
                  <option value="" key="0" />
                  {kholaseGozareshes
                    ? kholaseGozareshes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="file-hesab-resi-gardeshKar">
                  <Translate contentKey="sahaApp.fileHesabResi.gardeshKar">Gardesh Kar</Translate>
                </Label>
                <AvInput id="file-hesab-resi-gardeshKar" type="select" className="form-control" name="gardeshKarId">
                  <option value="" key="0" />
                  {gardeshKars
                    ? gardeshKars.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup> */}
              <Button tag={Link} id="cancel-save" to="/file-hesab-resi" replace color="info">
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
  hesabResis: storeState.hesabResi.entities,
  barnameHesabResis: storeState.barnameHesabResi.entities,
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
  fileHesabResiEntity: storeState.fileHesabResi.entity,
  loading: storeState.fileHesabResi.loading,
  updating: storeState.fileHesabResi.updating,
  updateSuccess: storeState.fileHesabResi.updateSuccess
});

const mapDispatchToProps = {
  getHesabResis,
  getBarnameHesabResis,
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
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileHesabResiUpdate);
