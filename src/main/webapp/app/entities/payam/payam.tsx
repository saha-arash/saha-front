import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Nav, NavLink, NavItem } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './payam.reducer';
import { IPayam } from 'app/shared/model/payam.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import classnames from 'classnames';

export interface IPayamProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Payam = (props: IPayamProps) => {

  const [activeTab, setActiveTab] = useState('inbox');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }


  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`, activeTab === 'sent');
  };

  useEffect(() => {
    getAllEntities()
  } ,[activeTab])

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage => {
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });
  }
    
  const { payamList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="payam-heading">
        پیام‌ها
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          ارسال پیام
        </Link>
      </h2>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'inbox' })}
            onClick={() => { toggle('inbox'); }}
          >
            صندوق ورودی
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'sent' })}
            onClick={() => { toggle('sent'); }}
          >
            صندوق خروجی
          </NavLink>
        </NavItem>
      </Nav>
      <div className="table-responsive">
        {payamList && payamList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                    شناسه <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('onvan')}>
                  عنوان <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('matn')}>
                  متن <FontAwesomeIcon icon="sort" />
                </th>
                {/* <th>
                  <Translate contentKey="sahaApp.payam.karbarErsalKonande">Karbar Ersal Konande</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.payam.karbarDaryaftKonand">Karbar Daryaft Konand</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.payam.yeganErsalKonanade">Yegan Ersal Konanade</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.payam.yeganDaryaftKonanade">Yegan Daryaft Konanade</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th> */}
                <th />
              </tr>
            </thead>
            <tbody>
              {payamList.map((payam, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${payam.id}`} color="link" size="sm">
                      {payam.id}
                    </Button>
                  </td>
                  <td>{payam.onvan}</td>
                  <td>{payam.matn}</td>
                  {/* <td>
                    {payam.karbarErsalKonandeId ? (
                      <Link to={`karbar/${payam.karbarErsalKonandeId}`}>{payam.karbarErsalKonandeId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {payam.karbarDaryaftKonandId ? (
                      <Link to={`karbar/${payam.karbarDaryaftKonandId}`}>{payam.karbarDaryaftKonandId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {payam.yeganErsalKonanadeId ? <Link to={`yegan/${payam.yeganErsalKonanadeId}`}>{payam.yeganErsalKonanadeId}</Link> : ''}
                  </td>
                  <td>
                    {payam.yeganDaryaftKonanadeId ? (
                      <Link to={`yegan/${payam.yeganDaryaftKonanadeId}`}>{payam.yeganDaryaftKonanadeId}</Link>
                    ) : (
                      ''
                    )}
                  </td> */}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${payam.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {/* <Button
                        tag={Link}
                        to={`${match.url}/${payam.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button> */}
                      <Button
                        tag={Link}
                        to={`${match.url}/${payam.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              پیامی یافت نشد
            </div>
          )
        )}
      </div>
      <div className={payamList && payamList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={paginationState.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={paginationState.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = ({ payam }: IRootState) => ({
  payamList: payam.entities,
  loading: payam.loading,
  totalItems: payam.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Payam);
