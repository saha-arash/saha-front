import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IGozaresh } from 'app/shared/model/gozaresh.model';
import { getEntities as getGozareshes } from 'app/entities/gozaresh/gozaresh.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './file-gozaresh.reducer';
import { IFileGozaresh } from 'app/shared/model/file-gozaresh.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFileGozareshUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileGozareshUpdate = (props: IFileGozareshUpdateProps) => {
  const [hesabResiId, setHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fileGozareshEntity, gozareshes, loading, updating } = props;

  const { file, fileContentType } = fileGozareshEntity;

  const handleClose = () => {
    props.history.push('/file-gozaresh' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getGozareshes();
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
    if (errors.length === 0) {
      const entity = {
        ...fileGozareshEntity,
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
          <h2 id="sahaApp.fileGozaresh.home.createOrEditLabel">
            <Translate contentKey="sahaApp.fileGozaresh.home.createOrEditLabel">Create or edit a FileGozaresh</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fileGozareshEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="file-gozaresh-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="file-gozaresh-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvGroup>
                  <Label id="fileLabel" for="file">
                    <Translate contentKey="sahaApp.fileGozaresh.file">File</Translate>
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
                <Label for="file-gozaresh-hesabResi">
                  <Translate contentKey="sahaApp.fileGozaresh.hesabResi">Hesab Resi</Translate>
                </Label>
                <AvInput id="file-gozaresh-hesabResi" type="select" className="form-control" name="hesabResiId">
                  <option value="" key="0" />
                  {gozareshes
                    ? gozareshes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/file-gozaresh" replace color="info">
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
  fileGozareshEntity: storeState.fileGozaresh.entity,
  loading: storeState.fileGozaresh.loading,
  updating: storeState.fileGozaresh.updating,
  updateSuccess: storeState.fileGozaresh.updateSuccess
});

const mapDispatchToProps = {
  getGozareshes,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileGozareshUpdate);
