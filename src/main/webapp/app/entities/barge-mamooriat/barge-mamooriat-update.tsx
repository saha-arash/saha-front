import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { IKarbar } from 'app/shared/model/karbar.model';
import { getEntities as getKarbars } from 'app/entities/karbar/karbar.reducer';
import { IYegan } from 'app/shared/model/yegan.model';
import { getEntities as getYegans } from 'app/entities/yegan/yegan.reducer';
import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { getEntities as getHesabResis } from 'app/entities/hesab-resi/hesab-resi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { AkbariDatePicker } from 'akbari-react-date-picker';
import 'akbari-react-date-picker/dist/index.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


export interface IBargeMamooriatUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BargeMamooriatUpdate = (props: IBargeMamooriatUpdateProps) => {
  const [sarparastId, setSarparastId] = useState('0');
  const [nafarId, setNafarId] = useState('0');
  const [binandeId, setBinandeId] = useState('0');
  const [shorooMamooriat, setShorooMamooriat] = useState('0');
  const [payanMamooriat, setPayanMamooriat] = useState('0');
  const [yeganId, setYeganId] = useState('0');
  const [hesabResiId, setHesabResiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [state, setState] = useState({
    startDate: '',
    endDate: '',
  })

  const [searchedKarbars, setSearchedKarbars] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const subjectRef = React.useRef();
  const { bargeMamooriatEntity, karbars, yegans, hesabResis, loading, updating } = props;
  const [selectedDay, setSelectedDay] = useState(null);



  const handleClose = () => {
    props.history.push('/barge-mamooriat' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getKarbars();
    props.getYegans();
    props.getHesabResis();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.shorooMamooriat = convertDateTimeToServer(values.shorooMamooriat);
    values.payanMamooriat = convertDateTimeToServer(values.payanMamooriat);

    if (errors.length === 0) {
      const entity = {
        ...bargeMamooriatEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  const changeStartDate = (e)=>{
       state.startDate = e;
       setState({...state})
  }
  const changeEndDate = (e)=>{
    state.endDate = e;
    setState({...state})
  }

  const items = [
    {
      id: 0,
      name: 'Cobol'
    },
    {
      id: 1,
      name: 'JavaScript'
    },
    {
      id: 2,
      name: 'Basic'
    },
    {
      id: 3,
      name: 'PHP'
    },
    {
      id: 4,
      name: 'Java'
    }
  ]

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sahaApp.bargeMamooriat.home.createOrEditLabel">
            <span>ایجاد/ویرایش برگه ماموریت</span>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bargeMamooriatEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <span>شناسه</span>
                  <AvInput id="barge-mamooriat-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <span>وضعیت</span>
                <AvInput
                  id="barge-mamooriat-vaziat"
                  type="select"
                  className="form-control"
                  name="vaziat"
                  value={(!isNew && bargeMamooriatEntity.vaziat) || 'SARPARAST_TIME_HESABRESI'}
                >
                  <option value="SARPARAST_TIME_HESABRESI">{translate('sahaApp.VaziatBargeMamooriat.SARPARAST_TIME_HESABRESI')}</option>
                  <option value="DAR_ENTEZAR_TAEED_MODIR_HESABRESI">
                    {translate('sahaApp.VaziatBargeMamooriat.DAR_ENTEZAR_TAEED_MODIR_HESABRESI')}
                  </option>
                  <option value="DAR_ENTEZAR_TAEED_MOAVEN_HESABRESI">
                    {translate('sahaApp.VaziatBargeMamooriat.DAR_ENTEZAR_TAEED_MOAVEN_HESABRESI')}
                  </option>
                  <option value="DAR_ENTEZAR_TAEED_JANESHIN_SAZMAN">
                    {translate('sahaApp.VaziatBargeMamooriat.DAR_ENTEZAR_TAEED_JANESHIN_SAZMAN')}
                  </option>
                  <option value="DAR_ENTEZAR_TAEED_RIASATSAZMAN">
                    {translate('sahaApp.VaziatBargeMamooriat.DAR_ENTEZAR_TAEED_RIASATSAZMAN')}
                  </option>
                  <option value="DAR_ENTEZAR_TAEED_HEYAT_RAESE_AJA">
                    {translate('sahaApp.VaziatBargeMamooriat.DAR_ENTEZAR_TAEED_HEYAT_RAESE_AJA')}
                  </option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <span>سال ماموریت</span>
                <AvField id="barge-mamooriat-saleMamooriat" type="string" className="form-control" name="saleMamooriat" />
              </AvGroup>
              <AvGroup>
                <span>شروع ماموریت</span>
                <AkbariDatePicker min_date="1370/1/1" max_date="1450/1/1" input_type="jalali"  on_change_date={(e) => changeStartDate(e)} />
              </AvGroup>
              <AvGroup>
                <Label id="payanMamooriatLabel" for="barge-mamooriat-payanMamooriat">
                  <span>پایان ماموریت</span>
                </Label>
                <AkbariDatePicker min_date="1370/1/1" max_date="1450/1/1" input_type="jalali"  on_change_date={(e) => changeEndDate(e)}/>
              </AvGroup>
              <AvGroup>
                <Label for="barge-mamooriat-sarparast">
                  <span>سرپرست</span>
                </Label>

                <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
          />

                <AvInput id="barge-mamooriat-sarparast" type="select" className="form-control" name="sarparastId">
                  <option value="" key="0" />
                  {searchedKarbars
                    ? searchedKarbars.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="barge-mamooriat-yegan">
                  <span>یگان</span>
                </Label>
                <AvInput id="barge-mamooriat-yegan" type="select" className="form-control" name="yeganId">
                  <option value="" key="0" />
                  {yegans
                    ? yegans.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="barge-mamooriat-hesabResi">
                  <span>حسابرسی</span>
                </Label>
                <AvInput id="barge-mamooriat-hesabResi" type="select" className="form-control" name="hesabResiId">
                  <option value="" key="0" />
                  {hesabResis
                    ? hesabResis.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/barge-mamooriat" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <span>بازگشت</span>
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
  karbars: storeState.karbar.entities,
  yegans: storeState.yegan.entities,
  hesabResis: storeState.hesabResi.entities,
  bargeMamooriatEntity: storeState.bargeMamooriat.entity,
  loading: storeState.bargeMamooriat.loading,
  updating: storeState.bargeMamooriat.updating,
  updateSuccess: storeState.bargeMamooriat.updateSuccess
});

const mapDispatchToProps = {
  getKarbars,
  getYegans,
  getHesabResis,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BargeMamooriatUpdate);
