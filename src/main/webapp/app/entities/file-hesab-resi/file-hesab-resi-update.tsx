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
import { getEntity, updateEntity, createEntity, setBlob, reset } from './file-hesab-resi.reducer';
import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFileHesabResiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileHesabResiUpdate = (props: IFileHesabResiUpdateProps) => {
  const [hesabResiId, setHesabResiId] = useState('0');
  const [barnameHesabResiId, setBarnameHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fileHesabResiEntity, hesabResis, barnameHesabResis, loading, updating } = props;

  const { file, fileContentType } = fileHesabResiEntity;

  const handleClose = () => {
    props.history.push('/file-hesab-resi');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getHesabResis();
    props.getBarnameHesabResis();
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
    values.tarikhName = convertDateTimeToServer(values.tarikhName);

    if (errors.length === 0) {
      const entity = {
        ...fileHesabResiEntity,
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
          <h2 id="sahaApp.fileHesabResi.home.createOrEditLabel">
            <Translate contentKey="sahaApp.fileHesabResi.home.createOrEditLabel">Create or edit a FileHesabResi</Translate>
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
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="file-hesab-resi-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvGroup>
                  <Label id="fileLabel" for="file">
                    <Translate contentKey="sahaApp.fileHesabResi.file">File</Translate>
                  </Label>
                  <br />
                  {file ? (
                    <div>
                      <a onClick={openFile(fileContentType, file)}>
                        <Translate contentKey="entity.action.open">Open</Translate>
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
                <AvInput id="file-hesab-resi-hesabResi" type="select" className="form-control" name="hesabResi.id">
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
                <AvInput id="file-hesab-resi-barnameHesabResi" type="select" className="form-control" name="barnameHesabResi.id">
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
  fileHesabResiEntity: storeState.fileHesabResi.entity,
  loading: storeState.fileHesabResi.loading,
  updating: storeState.fileHesabResi.updating,
  updateSuccess: storeState.fileHesabResi.updateSuccess
});

const mapDispatchToProps = {
  getHesabResis,
  getBarnameHesabResis,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileHesabResiUpdate);
