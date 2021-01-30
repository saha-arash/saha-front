import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './barge-mamooriat.scss';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import bargeMamuriatData from '../../../i18n/fa/vaziatBargeMamooriat.json';
import loggerMiddleware from 'app/config/logger-middleware';
import TimeToText from 'app/shared/timeToText/TimeToText';


export interface IBargeMamooriatProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BargeMamooriat = (props: IBargeMamooriatProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [vaziat, setVaziat] = useState(null);
  const [sal, setSal] = useState(null);
  const [hesabresiShode, setHesabresiShode] = useState(null);
  const [isDropDownToggle, setDropDownToggle] = useState(false);
  const [salInput, setSalInput] = useState(null);

  const getAllEntities = () => {
    // props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
    console.log("H EEEEE YYY",vaziat,sal);
    props.getEntities(0,0,``,vaziat,sal);
  };

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, vaziat, sal]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const vaziatChanged = (selectedVaziat: string) => {
    setVaziat(selectedVaziat);
  };

  const salChanged = (selectedSal?: string) => {
    setSal(salInput);
  };

  const hesabresiShodeChanged = (selectedState: boolean) => {
    setHesabresiShode(selectedState);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const { bargeMamooriatList, match, loading, totalItems } = props;
  return (
    <div>
      <div className="horzontalList">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret className="dropbtn">
          وضعیت
        </DropdownToggle>
        <DropdownMenu right caret>
          <DropdownItem header caret>
            انتخاب وضعیت
          </DropdownItem>
          {Object.keys(bargeMamuriatData.sahaApp.VaziatBargeMamooriat).map(item => (
            <DropdownItem key={item} onClick={() => vaziatChanged(item)}>
              {bargeMamuriatData.sahaApp.VaziatBargeMamooriat[item]}
            </DropdownItem>
          ))}
        </DropdownMenu>
        </Dropdown>
        <input type="text" size="8" placeholder="سال" value={salInput} onChange={e => setSalInput(e.target.value)}/>
        <button className="inputBtn" onClick={ () => salChanged()}>تایید</button>
        {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
        <span> جهت بررسی </span>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
        <span>جهت پیگیری</span> */}
      </div>
      

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
                  <span>وضعیت</span>
                </div>
              </th>
              <th>
                <span>سال</span>
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
                    <TimeToText type="date" value={bargeMamooriat.shorooMamooriat} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TimeToText type="date" value={bargeMamooriat.payanMamooriat} format={APP_DATE_FORMAT} />
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
            !loading && <div className="alert alert-warning centered">!برگه ماموریتی یافت نشد</div>
          )}
        </Table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ bargeMamooriat }: IRootState) => ({
  bargeMamooriatList: bargeMamooriat.entities,
  loading: bargeMamooriat.loading,
  totalItems: bargeMamooriat.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BargeMamooriat);
