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
import { getEntity, updateEntity, createEntity, reset } from './barname-hesab-resi.reducer';
import { IBarnameHesabResi } from 'app/shared/model/barname-hesab-resi.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBarnameHesabResiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BarnameHesabResiUpdate = (props: IBarnameHesabResiUpdateProps) => {
  const [hesabResiId, setHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { barnameHesabResiEntity, hesabResis, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/barname-hesab-resi');
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
    if (errors.length === 0) {
      const entity = {
        ...barnameHesabResiEntity,
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
          <h2 id="sahaApp.barnameHesabResi.home.createOrEditLabel">
            <Translate contentKey="sahaApp.barnameHesabResi.home.createOrEditLabel">Create or edit a BarnameHesabResi</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : barnameHesabResiEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="barname-hesab-resi-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="barname-hesab-resi-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="noeBarnameHesabResiLabel" for="barname-hesab-resi-noeBarnameHesabResi">
                  <Translate contentKey="sahaApp.barnameHesabResi.noeBarnameHesabResi">Noe Barname Hesab Resi</Translate>
                </Label>
                <AvInput
                  id="barname-hesab-resi-noeBarnameHesabResi"
                  type="select"
                  className="form-control"
                  name="noeBarnameHesabResi"
                  value={(!isNew && barnameHesabResiEntity.noeBarnameHesabResi) || 'HESABRESI_BARNAMEE'}
                >
                  <option value="HESABRESI_BARNAMEE">{translate('sahaApp.NoeBarnameHesabResi.HESABRESI_BARNAMEE')}</option>
                  <option value="HESABRESI_PEYGIRI">{translate('sahaApp.NoeBarnameHesabResi.HESABRESI_PEYGIRI')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/barname-hesab-resi" replace color="info">
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
  barnameHesabResiEntity: storeState.barnameHesabResi.entity,
  loading: storeState.barnameHesabResi.loading,
  updating: storeState.barnameHesabResi.updating,
  updateSuccess: storeState.barnameHesabResi.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(BarnameHesabResiUpdate);
