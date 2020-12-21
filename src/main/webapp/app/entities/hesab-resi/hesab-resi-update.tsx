import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IGozaresh } from 'app/shared/model/gozaresh.model';
import { getEntities as getGozareshes } from 'app/entities/gozaresh/gozaresh.reducer';
import { IBarnameHesabResi } from 'app/shared/model/barname-hesab-resi.model';
import { getEntities as getBarnameHesabResis } from 'app/entities/barname-hesab-resi/barname-hesab-resi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './hesab-resi.reducer';
import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHesabResiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const HesabResiUpdate = (props: IHesabResiUpdateProps) => {
  const [gozareshId, setGozareshId] = useState('0');
  const [barnameHesabResiId, setBarnameHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { hesabResiEntity, gozareshes, barnameHesabResis, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/hesab-resi');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getGozareshes();
    props.getBarnameHesabResis();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...hesabResiEntity,
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
          <h2 id="sahaApp.hesabResi.home.createOrEditLabel">
            <Translate contentKey="sahaApp.hesabResi.home.createOrEditLabel">Create or edit a HesabResi</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : hesabResiEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="hesab-resi-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="hesab-resi-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="salLabel" for="hesab-resi-sal">
                  <Translate contentKey="sahaApp.hesabResi.sal">Sal</Translate>
                </Label>
                <AvField id="hesab-resi-sal" type="string" className="form-control" name="sal" />
              </AvGroup>
              <AvGroup>
                <Label id="vaziateHesabResiLabel" for="hesab-resi-vaziateHesabResi">
                  <Translate contentKey="sahaApp.hesabResi.vaziateHesabResi">Vaziate Hesab Resi</Translate>
                </Label>
                <AvInput
                  id="hesab-resi-vaziateHesabResi"
                  type="select"
                  className="form-control"
                  name="vaziateHesabResi"
                  value={(!isNew && hesabResiEntity.vaziateHesabResi) || 'SODOOR_BARGE_MAMOORIAT'}
                >
                  <option value="SODOOR_BARGE_MAMOORIAT">{translate('sahaApp.VaziateHesabResi.SODOOR_BARGE_MAMOORIAT')}</option>
                  <option value="DAR_SHOROF_MAMOORIAT">{translate('sahaApp.VaziateHesabResi.DAR_SHOROF_MAMOORIAT')}</option>
                  <option value="DAR_HALE_MAMOORIAT">{translate('sahaApp.VaziateHesabResi.DAR_HALE_MAMOORIAT')}</option>
                  <option value="ETMAM_MAMOORIAT_HOZOOR_DARSAZMAN">
                    {translate('sahaApp.VaziateHesabResi.ETMAM_MAMOORIAT_HOZOOR_DARSAZMAN')}
                  </option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="hesab-resi-gozaresh">
                  <Translate contentKey="sahaApp.hesabResi.gozaresh">Gozaresh</Translate>
                </Label>
                <AvInput id="hesab-resi-gozaresh" type="select" className="form-control" name="gozaresh.id">
                  <option value="" key="0" />
                  {gozareshes
                    ? gozareshes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="hesab-resi-barnameHesabResi">
                  <Translate contentKey="sahaApp.hesabResi.barnameHesabResi">Barname Hesab Resi</Translate>
                </Label>
                <AvInput id="hesab-resi-barnameHesabResi" type="select" className="form-control" name="barnameHesabResi.id">
                  <option value="" key="0" />
                  {barnameHesabResis
                    ? barnameHesabResis.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/hesab-resi" replace color="info">
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
  gozareshes: storeState.gozaresh.entities,
  barnameHesabResis: storeState.barnameHesabResi.entities,
  hesabResiEntity: storeState.hesabResi.entity,
  loading: storeState.hesabResi.loading,
  updating: storeState.hesabResi.updating,
  updateSuccess: storeState.hesabResi.updateSuccess
});

const mapDispatchToProps = {
  getGozareshes,
  getBarnameHesabResis,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HesabResiUpdate);
