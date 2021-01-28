import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './hesab-resi.reducer';
import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IHesabResiProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const statusToFarsi = {
  DAR_SHOROF_MAMOORIAT: 'در شرف ماموریت',
  DAR_HALE_MAMOORIAT: 'در حال ماموریت',
  SODOOR_BARGE_MAMOORIAT: 'صدور برگه ماموریت',
  ETMAM_MAMOORIAT_HOZOOR_DARSAZMAN: 'اتمام ماموریت حضور در سازمان'
}

export const HesabResi = (props: IHesabResiProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

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

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const { hesabResiList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="hesab-resi-heading">
        حسابرسی ها
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          ایجاد حسابرسی جدید
        </Link>
      </h2>
      <div className="table-responsive">
        {hesabResiList && hesabResiList.length > 0 ? (
          //  <div>
          //   {hesabResiList.map((hesabResi, i) => ( 
          //    <button key={hesabResi.id} className="cardd-1" onClick={() =>false}>
          //     <strong>
          //       {hesabResi.vaziateHesabResi}
          //     </strong>
          //     <br></br>
          //     <span>
          //       {hesabResi.sal}
          //     </span>
          //   </button>
          // ))}
          // </div>
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  شناسه <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sal')}>
                  سال <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('vaziateHesabResi')}>
                  وضعیت حسابرسی <FontAwesomeIcon icon="sort" />
                </th>
                
                <th />
              </tr>
            </thead>
            <tbody>
              {hesabResiList.map((hesabResi, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${hesabResi.id}`} color="link" size="sm">
                      {hesabResi.id}
                    </Button>
                  </td>
                  <td>{hesabResi.sal}</td>
                  <td>
                  {statusToFarsi[hesabResi.vaziateHesabResi] || hesabResi.vaziateHesabResi}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${hesabResi.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          بازکردن
                        </span>
                      </Button>
                      {/* <Button
                        tag={Link}
                        to={`${match.url}/${hesabResi.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          به روز رسانی وضعیت
                        </span>
                      </Button> */}
                      <Button
                        tag={Link}
                        to={`${match.url}/${hesabResi.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          حذف حسابرسی
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
              حسابرسی ای یافت نشد
            </div>
          )
        )}
      </div>
      <div className={hesabResiList && hesabResiList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ hesabResi }: IRootState) => ({
  hesabResiList: hesabResi.entities,
  loading: hesabResi.loading,
  totalItems: hesabResi.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HesabResi);
