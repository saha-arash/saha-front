import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './barge-mamooriat.scss';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import bargeMamuriatData from '../../../i18n/fa/vaziatBargeMamooriat.json';

export interface IBargeMamooriatProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
export const BargeMamooriat = (props: IBargeMamooriatProps) => {
  const [vaziat, setVaziat] = useState(null);
  const [sal, setSal] = useState(null);
  const [hesabresiShode, setHesabresiShode] = useState(null);
  useEffect(() => {
    console.log("***USE EFECT CALLED \n\n\n",0, 0,"", vaziat,sal, hesabresiShode,"\n\n\n\n");
    
    props.getEntities(0, 0,"", vaziat,sal, hesabresiShode);
  }, [vaziat, sal, hesabresiShode]);

  window.onclick = event => {
    if (event.target.matches('.dropbtn')) {
      return;
    }
    const dropDownMenu = document.getElementById('dropDownMenu');
    dropDownMenu.style.display = 'none';
  };

  const vaziatDropDownTapped = () => {
    const dropDownMenu = document.getElementById('dropDownMenu');
    const visibility = dropDownMenu.style.display === 'none' ? 'block' : 'none';
    dropDownMenu.style.display = visibility;
  };

  const vaziateChanged = (selectedVaziat: string) => {
    console.log("HERE",selectedVaziat);
    
    setVaziat(selectedVaziat);
  };

  const salChanged = (selectedSal: string) => {
    setSal(selectedSal);
  };

  const hesabresiShodeChanged = (selectedState: boolean) => {
    setHesabresiShode(selectedState);
  };
  const { bargeMamooriatList, match, loading } = props;
  console.log(props);
  return (
    <div>
      <h2 id="barge-mamooriat-heading">
        <span>برگه ماموریت ها</span>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <span>ایجاد برگه ماموریت</span>
        </Link>
      </h2>
      <div className="table-responsive">
        
          {/*  a list of barge mamuraits */}
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <span>شناسه</span>
                </th>
                <th>
                  <div className="dropdown">
                    <button onClick={vaziatDropDownTapped} className="dropbtn">
                      وضعیت
                    </button>
                    <div id="dropDownMenu">
                      {Object.keys(bargeMamuriatData.sahaApp.VaziatBargeMamooriat).map(item => (
                        <button key={item} className="dropDownbtn" onClick={() => vaziateChanged(item)}>
                          {bargeMamuriatData.sahaApp.VaziatBargeMamooriat[item]}
                        </button>
                      ))}
                    </div>
                  </div>
                </th>
                <th>
                  <input type="text" size="8" placeholder="سال" className="input" />
                </th>
                <th>
                  <span>شروع ماموریت</span>
                </th>
                <th>
                  <span> پایان ماموریت</span>
                </th>
                <th>
                  <span>سرپرست</span>
                </th>
                <th>
                  <span>یگان</span>
                </th>
                {/* <th>
                  <span>Hesab Resi</span>
                </th> */}
                <th />
              </tr>
            </thead>
            {bargeMamooriatList && bargeMamooriatList.length > 0 ? (
            <tbody>
              {bargeMamooriatList.map((bargeMamooriat, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${bargeMamooriat.id}`} color="link" size="sm">
                      {bargeMamooriat.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`sahaApp.VaziatBargeMamooriat.${bargeMamooriat.vaziat}`} />
                  </td>
                  <td>{bargeMamooriat.saleMamooriat}</td>
                  <td>
                    <TextFormat type="date" value={bargeMamooriat.shorooMamooriat} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={bargeMamooriat.payanMamooriat} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {bargeMamooriat.sarparast ? (
                      <Link to={`karbar/${bargeMamooriat.sarparast.id}`}>{bargeMamooriat.sarparast.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{bargeMamooriat.yegan ? <Link to={`yegan/${bargeMamooriat.yegan.id}`}>{bargeMamooriat.yegan.id}</Link> : ''}</td>
                  <td>
                    {bargeMamooriat.hesabResi ? (
                      <Link to={`hesab-resi/${bargeMamooriat.hesabResi.id}`}>{bargeMamooriat.hesabResi.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bargeMamooriat.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <span>مشاهده</span>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bargeMamooriat.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <span>ویرایش</span>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bargeMamooriat.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <span>حذف</span>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          
        ) : (
          // no barge mamuriat
          !loading && (
            <div className="alert alert-warning">
              <span>!برگه ماموریتی یافت نشد</span>
            </div>
          )
        )}
        </Table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ bargeMamooriat }: IRootState) => ({
  bargeMamooriatList: bargeMamooriat.entities,
  loading: bargeMamooriat.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BargeMamooriat);
