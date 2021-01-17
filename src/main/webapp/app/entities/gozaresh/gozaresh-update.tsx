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
import { getEntity, updateEntity, createEntity, reset } from './gozaresh.reducer';
import { IGozaresh } from 'app/shared/model/gozaresh.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGozareshUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GozareshUpdate = (props: IGozareshUpdateProps) => {
  const [hesabResiId, setHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { gozareshEntity, hesabResis, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/gozaresh' + props.location.search);
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
        ...gozareshEntity,
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
          <h2 id="sahaApp.gozaresh.home.createOrEditLabel">
            <Translate contentKey="sahaApp.gozaresh.home.createOrEditLabel">Create or edit a Gozaresh</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : gozareshEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="gozaresh-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="gozaresh-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="vaziatLabel" for="gozaresh-vaziat">
                  <Translate contentKey="sahaApp.gozaresh.vaziat">Vaziat</Translate>
                </Label>
                <AvInput
                  id="gozaresh-vaziat"
                  type="select"
                  className="form-control"
                  name="vaziat"
                  value={(!isNew && gozareshEntity.vaziat) || 'AVALIE'}
                >
                  <option value="AVALIE">{translate('sahaApp.VaziatGozaresh.AVALIE')}</option>
                  <option value="MODIR">{translate('sahaApp.VaziatGozaresh.MODIR')}</option>
                  <option value="MOAVENAT">{translate('sahaApp.VaziatGozaresh.MOAVENAT')}</option>
                  <option value="HEYAT_RAESE_SAZMAN">{translate('sahaApp.VaziatGozaresh.HEYAT_RAESE_SAZMAN')}</option>
                  <option value="HEYATRAESE_AJA_NAHAE">{translate('sahaApp.VaziatGozaresh.HEYATRAESE_AJA_NAHAE')}</option>
                  <option value="EBLAGH_GOZARESH_BEYEGAN_HESABRESI_SHAVANDE">
                    {translate('sahaApp.VaziatGozaresh.EBLAGH_GOZARESH_BEYEGAN_HESABRESI_SHAVANDE')}
                  </option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/gozaresh" replace color="info">
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
  gozareshEntity: storeState.gozaresh.entity,
  loading: storeState.gozaresh.loading,
  updating: storeState.gozaresh.updating,
  updateSuccess: storeState.gozaresh.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(GozareshUpdate);
