import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOstan } from 'app/shared/model/ostan.model';
import { getEntities as getOstans } from 'app/entities/ostan/ostan.reducer';
import { getEntity, updateEntity, createEntity, reset } from './shahr.reducer';
import { IShahr } from 'app/shared/model/shahr.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IShahrUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ShahrUpdate = (props: IShahrUpdateProps) => {
  const [ostanId, setOstanId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { shahrEntity, ostans, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/shahr' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getOstans();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...shahrEntity,
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
          <h2 id="sahaApp.shahr.home.createOrEditLabel">
            <Translate contentKey="sahaApp.shahr.home.createOrEditLabel">Create or edit a Shahr</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : shahrEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="shahr-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="shahr-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="shahr-name">
                  <Translate contentKey="sahaApp.shahr.name">Name</Translate>
                </Label>
                <AvField id="shahr-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="zaribAboHavaLabel" for="shahr-zaribAboHava">
                  <Translate contentKey="sahaApp.shahr.zaribAboHava">Zarib Abo Hava</Translate>
                </Label>
                <AvField id="shahr-zaribAboHava" type="string" className="form-control" name="zaribAboHava" />
              </AvGroup>
              <AvGroup>
                <Label id="zaribTashilatLabel" for="shahr-zaribTashilat">
                  <Translate contentKey="sahaApp.shahr.zaribTashilat">Zarib Tashilat</Translate>
                </Label>
                <AvField id="shahr-zaribTashilat" type="string" className="form-control" name="zaribTashilat" />
              </AvGroup>
              <AvGroup>
                <Label id="masafatTaMarkazLabel" for="shahr-masafatTaMarkaz">
                  <Translate contentKey="sahaApp.shahr.masafatTaMarkaz">Masafat Ta Markaz</Translate>
                </Label>
                <AvField id="shahr-masafatTaMarkaz" type="string" className="form-control" name="masafatTaMarkaz" />
              </AvGroup>
              <AvGroup>
                <Label for="shahr-ostan">
                  <Translate contentKey="sahaApp.shahr.ostan">Ostan</Translate>
                </Label>
                <AvInput id="shahr-ostan" type="select" className="form-control" name="ostanId">
                  <option value="" key="0" />
                  {ostans
                    ? ostans.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/shahr" replace color="info">
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
  ostans: storeState.ostan.entities,
  shahrEntity: storeState.shahr.entity,
  loading: storeState.shahr.loading,
  updating: storeState.shahr.updating,
  updateSuccess: storeState.shahr.updateSuccess
});

const mapDispatchToProps = {
  getOstans,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShahrUpdate);
