import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { getEntities as getBargeMamooriats } from 'app/entities/barge-mamooriat/barge-mamooriat.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './file-barge-mamooriat.reducer';
import { IFileBargeMamooriat } from 'app/shared/model/file-barge-mamooriat.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFileBargeMamooriatUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}
//TODO: pass id to the entity
//TODO: how props are sent
export const FileBargeMamooriatUpdate = (props: IFileBargeMamooriatUpdateProps) => {
  const [bargeMamooriatId, setBargeMamooriatId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fileBargeMamooriatEntity, bargeMamooriats, loading, updating } = props;

  const { madarek, madarekContentType } = fileBargeMamooriatEntity;

  const handleClose = () => {
    props.history.push('/file-barge-mamooriat');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBargeMamooriats();
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
        ...fileBargeMamooriatEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  console.log(props);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h3 id="sahaApp.fileBargeMamooriat.home.createOrEditLabel">
            <span> ایجاد/ ویرایش برگه ماموریت</span>
          </h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fileBargeMamooriatEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="file-barge-mamooriat-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="file-barge-mamooriat-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvGroup>
                  {madarek ? (
                    <div>
                      <a onClick={openFile(madarekContentType, madarek)}>
                        <span>باز کردن</span>
                      </a>
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {madarekContentType}, {byteSize(madarek)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('madarek')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_madarek" type="file" onChange={onBlobChange(false, 'madarek')} />
                  <AvInput type="hidden" name="madarek" value={madarek} />
                </AvGroup>
              </AvGroup>
              {/* <AvGroup>
                <Label for="file-barge-mamooriat-bargeMamooriat">
                  <Translate contentKey="sahaApp.fileBargeMamooriat.bargeMamooriat">Barge Mamooriat</Translate>
                </Label>
                <AvInput id="file-barge-mamooriat-bargeMamooriat" type="select" className="form-control" name="bargeMamooriat.id" value={props.location.state.id} type="hidden">
                  <option value="" key="0" />
                  {bargeMamooriats
                    ? bargeMamooriats.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup> */}
              <Button tag={Link} id="cancel-save" to="/file-barge-mamooriat" replace color="info">
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
  bargeMamooriats: storeState.bargeMamooriat.entities,
  fileBargeMamooriatEntity: storeState.fileBargeMamooriat.entity,
  loading: storeState.fileBargeMamooriat.loading,
  updating: storeState.fileBargeMamooriat.updating,
  updateSuccess: storeState.fileBargeMamooriat.updateSuccess
});

const mapDispatchToProps = {
  getBargeMamooriats,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileBargeMamooriatUpdate);
