import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { getEntities as getHesabResis } from 'app/entities/hesab-resi/hesab-resi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './dastoor-amal-ejra-e.reducer';
import { IDastoorAmalEjraE } from 'app/shared/model/dastoor-amal-ejra-e.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDastoorAmalEjraEUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DastoorAmalEjraEUpdate = (props: IDastoorAmalEjraEUpdateProps) => {
  const [hesabResiId, setHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { dastoorAmalEjraEEntity, hesabResis, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/dastoor-amal-ejra-e' + props.location.search);
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
        ...dastoorAmalEjraEEntity,
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
          <h2 id="sahaApp.dastoorAmalEjraE.home.createOrEditLabel">
            <Translate contentKey="sahaApp.dastoorAmalEjraE.home.createOrEditLabel">Create or edit a DastoorAmalEjraE</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : dastoorAmalEjraEEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="dastoor-amal-ejra-e-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="dastoor-amal-ejra-e-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <Button tag={Link} id="cancel-save" to="/dastoor-amal-ejra-e" replace color="info">
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
  dastoorAmalEjraEEntity: storeState.dastoorAmalEjraE.entity,
  loading: storeState.dastoorAmalEjraE.loading,
  updating: storeState.dastoorAmalEjraE.updating,
  updateSuccess: storeState.dastoorAmalEjraE.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(DastoorAmalEjraEUpdate);
