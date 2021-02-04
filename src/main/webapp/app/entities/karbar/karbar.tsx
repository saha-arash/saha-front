import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './karbar.reducer';
import { IKarbar } from 'app/shared/model/karbar.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import TimeToText from 'app/shared/timeToText/TimeToText';

export interface IKarbarProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Karbar = (props: IKarbarProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    // props.history.push(
    //   `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    // );
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

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const { karbarList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="karbar-heading">
        کاربرها
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <span>
            ایحاد کاربر جدید
          </span>
        </Link>
      </h2>
      <div className="table-responsive">
        {karbarList && karbarList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  شناسه <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('name')}>
                  نام <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('shoghlSazmani')}>
                  شغل سازمانی <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('shoghlAmali')}>
                  شغل عملی <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('codePerseneli')}>
                  کد پرسنلی <FontAwesomeIcon icon="sort" />
                </th>
                {/* <th className="hand" onClick={sort('bezaneshate')}>
                  بازنشسته <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sazmani')}>
                  سازمانی <FontAwesomeIcon icon="sort" />
                </th> */}
                {/* <th className="hand" onClick={sort('tarikhBazneshastegi')}>
                  تاریخ بازنشستگی{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('tarikhEstekhdam')}>
                  تاریخ استخدام<FontAwesomeIcon icon="sort" />
                </th> */}
                {/* <th>
                  یگان <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  کد یگان<FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  درجه <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  سمت <FontAwesomeIcon icon="sort" />
                </th> */}
                <th />
              </tr>
            </thead>
            <tbody>
              {karbarList.map((karbar, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${karbar.id}`} color="link" size="sm">
                      {karbar.id}
                    </Button>
                  </td>
                  <td>{karbar.name}</td>
                  <td>{karbar.shoghlSazmani}</td>
                  <td>{karbar.shoghlAmali}</td>
                  <td>{karbar.codePerseneli}</td>
                  {/* <td>{karbar.bezaneshate ? 'true' : 'false'}</td>
                  <td>{karbar.sazmani ? 'true' : 'false'}</td> */}
                  {/* <td>
                    <TimeToText type="date" value={karbar.tarikhBazneshastegi} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TimeToText type="date" value={karbar.tarikhEstekhdam} format={APP_DATE_FORMAT} />
                  </td> */}
                  {/* <td>{karbar.yeganId ? <Link to={`yegan/${karbar.yeganId}`}>{karbar.yeganId}</Link> : ''}</td>
                  <td>{karbar.yeganCodeId ? <Link to={`yegan-code/${karbar.yeganCodeId}`}>{karbar.yeganCodeId}</Link> : ''}</td>
                  <td>{karbar.darajeId ? <Link to={`daraje/${karbar.darajeId}`}>{karbar.darajeId}</Link> : ''}</td>
                  <td>{karbar.sematId ? <Link to={`semat/${karbar.sematId}`}>{karbar.sematId}</Link> : ''}</td> */}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${karbar.id}`} replace color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${karbar.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${karbar.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              کاربری یافت نشد
            </div>
          )
        )}
      </div>
      <div className={karbarList && karbarList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ karbar }: IRootState) => ({
  karbarList: karbar.entities,
  loading: karbar.loading,
  totalItems: karbar.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Karbar);
