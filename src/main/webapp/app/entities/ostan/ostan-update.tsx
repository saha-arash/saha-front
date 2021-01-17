import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMantaghe } from 'app/shared/model/mantaghe.model';
import { getEntities as getMantaghes } from 'app/entities/mantaghe/mantaghe.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ostan.reducer';
import { IOstan } from 'app/shared/model/ostan.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOstanUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OstanUpdate = (props: IOstanUpdateProps) => {
  const [mantagheId, setMantagheId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ostanEntity, mantaghes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ostan' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMantaghes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...ostanEntity,
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
          <h2 id="sahaApp.ostan.home.createOrEditLabel">
            <Translate contentKey="sahaApp.ostan.home.createOrEditLabel">Create or edit a Ostan</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ostanEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="ostan-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="ostan-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="ostan-name">
                  <Translate contentKey="sahaApp.ostan.name">Name</Translate>
                </Label>
                <AvField id="ostan-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label for="ostan-mantaghe">
                  <Translate contentKey="sahaApp.ostan.mantaghe">Mantaghe</Translate>
                </Label>
                <AvInput id="ostan-mantaghe" type="select" className="form-control" name="mantagheId">
                  <option value="" key="0" />
                  {mantaghes
                    ? mantaghes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/ostan" replace color="info">
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
  mantaghes: storeState.mantaghe.entities,
  ostanEntity: storeState.ostan.entity,
  loading: storeState.ostan.loading,
  updating: storeState.ostan.updating,
  updateSuccess: storeState.ostan.updateSuccess
});

const mapDispatchToProps = {
  getMantaghes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OstanUpdate);
