import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { getEntities as getHesabResis } from 'app/entities/hesab-resi/hesab-resi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './gardesh-kar.reducer';
import { IGardeshKar } from 'app/shared/model/gardesh-kar.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGardeshKarUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GardeshKarUpdate = (props: IGardeshKarUpdateProps) => {
  const [hesabResiId, setHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { gardeshKarEntity, hesabResis, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/gardesh-kar' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getHesabResis();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.tarikh = convertDateTimeToServer(values.tarikh);

    if (errors.length === 0) {
      const entity = {
        ...gardeshKarEntity,
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
          <h2 id="sahaApp.gardeshKar.home.createOrEditLabel">
            <Translate contentKey="sahaApp.gardeshKar.home.createOrEditLabel">Create or edit a GardeshKar</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : gardeshKarEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="gardesh-kar-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="gardesh-kar-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tarikhLabel" for="gardesh-kar-tarikh">
                  <Translate contentKey="sahaApp.gardeshKar.tarikh">Tarikh</Translate>
                </Label>
                <AvInput
                  id="gardesh-kar-tarikh"
                  type="datetime-local"
                  className="form-control"
                  name="tarikh"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.gardeshKarEntity.tarikh)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="mozooLabel" for="gardesh-kar-mozoo">
                  <Translate contentKey="sahaApp.gardeshKar.mozoo">Mozoo</Translate>
                </Label>
                <AvField id="gardesh-kar-mozoo" type="text" name="mozoo" />
              </AvGroup>
              <AvGroup>
                <Label id="shomareLabel" for="gardesh-kar-shomare">
                  <Translate contentKey="sahaApp.gardeshKar.shomare">Shomare</Translate>
                </Label>
                <AvField id="gardesh-kar-shomare" type="string" className="form-control" name="shomare" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/gardesh-kar" replace color="info">
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
  gardeshKarEntity: storeState.gardeshKar.entity,
  loading: storeState.gardeshKar.loading,
  updating: storeState.gardeshKar.updating,
  updateSuccess: storeState.gardeshKar.updateSuccess
});

const mapDispatchToProps = {
  getHesabResis,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GardeshKarUpdate);