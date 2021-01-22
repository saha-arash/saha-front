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
import { getEntity, updateEntity, createEntity, reset } from './nameh.reducer';
import { INameh } from 'app/shared/model/nameh.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INamehUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NamehUpdate = (props: INamehUpdateProps) => {
  const [hesabResiId, setHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { namehEntity, hesabResis, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/nameh' + props.location.search);
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
    values.tarikhEblagh = convertDateTimeToServer(values.tarikhEblagh);

    if (errors.length === 0) {
      const entity = {
        ...namehEntity,
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
          <h2 id="sahaApp.nameh.home.createOrEditLabel">
            <Translate contentKey="sahaApp.nameh.home.createOrEditLabel">Create or edit a Nameh</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : namehEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="nameh-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="nameh-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="shomareLabel" for="nameh-shomare">
                  <Translate contentKey="sahaApp.nameh.shomare">Shomare</Translate>
                </Label>
                <AvField id="nameh-shomare" type="text" name="shomare" />
              </AvGroup>
              <AvGroup>
                <Label id="tarikhEblaghLabel" for="nameh-tarikhEblagh">
                  <Translate contentKey="sahaApp.nameh.tarikhEblagh">Tarikh Eblagh</Translate>
                </Label>
                <AvInput
                  id="nameh-tarikhEblagh"
                  type="datetime-local"
                  className="form-control"
                  name="tarikhEblagh"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.namehEntity.tarikhEblagh)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/nameh" replace color="info">
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
  namehEntity: storeState.nameh.entity,
  loading: storeState.nameh.loading,
  updating: storeState.nameh.updating,
  updateSuccess: storeState.nameh.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(NamehUpdate);