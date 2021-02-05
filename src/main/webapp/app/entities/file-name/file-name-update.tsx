import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPayam } from 'app/shared/model/payam.model';
import { getEntities as getPayams } from 'app/entities/payam/payam.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './file-name.reducer';
import { IFileName } from 'app/shared/model/file-name.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFileNameUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileNameUpdate = (props: IFileNameUpdateProps) => {
  const [nameId, setNameId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fileNameEntity, payams, loading, updating } = props;

  const { madrak, madrakContentType } = fileNameEntity;

  const handleClose = () => {
    props.history.push('/file-name' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPayams();
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
        ...fileNameEntity,
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
          <h2 id="sahaApp.fileName.home.createOrEditLabel">
            <Translate contentKey="sahaApp.fileName.home.createOrEditLabel">Create or edit a FileName</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>در حال بارگیری...</p>
          ) : (
            <AvForm model={isNew ? {} : fileNameEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="file-name-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="file-name-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvGroup>
                  <Label id="madrakLabel" for="madrak">
                    <Translate contentKey="sahaApp.fileName.madrak">Madrak</Translate>
                  </Label>
                  <br />
                  {madrak ? (
                    <div>
                      <a onClick={openFile(madrakContentType, madrak)}>
                        <Translate contentKey="entity.action.open">Open</Translate>
                      </a>
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {madrakContentType}, {byteSize(madrak)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('madrak')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_madrak" type="file" onChange={onBlobChange(false, 'madrak')} />
                  <AvInput type="hidden" name="madrak" value={madrak} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label for="file-name-name">
                  <Translate contentKey="sahaApp.fileName.name">Name</Translate>
                </Label>
                <AvInput id="file-name-name" type="select" className="form-control" name="nameId">
                  <option value="" key="0" />
                  {payams
                    ? payams.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/file-name" replace color="info">
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
  payams: storeState.payam.entities,
  fileNameEntity: storeState.fileName.entity,
  loading: storeState.fileName.loading,
  updating: storeState.fileName.updating,
  updateSuccess: storeState.fileName.updateSuccess
});

const mapDispatchToProps = {
  getPayams,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileNameUpdate);
