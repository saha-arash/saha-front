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
import { getEntity, updateEntity, createEntity, reset } from './rafe-iradat.reducer';
import { IRafeIradat } from 'app/shared/model/rafe-iradat.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRafeIradatUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RafeIradatUpdate = (props: IRafeIradatUpdateProps) => {
  const [hesabResiId, setHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { rafeIradatEntity, hesabResis, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/rafe-iradat' + props.location.search);
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
        ...rafeIradatEntity,
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
          <h2 id="sahaApp.rafeIradat.home.createOrEditLabel">
            <Translate contentKey="sahaApp.rafeIradat.home.createOrEditLabel">Create or edit a RafeIradat</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : rafeIradatEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="rafe-iradat-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="rafe-iradat-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <Button tag={Link} id="cancel-save" to="/rafe-iradat" replace color="info">
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
  rafeIradatEntity: storeState.rafeIradat.entity,
  loading: storeState.rafeIradat.loading,
  updating: storeState.rafeIradat.updating,
  updateSuccess: storeState.rafeIradat.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(RafeIradatUpdate);
