import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IBargeMamooriatProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BargeMamooriat = (props: IBargeMamooriatProps) => {
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

  const { bargeMamooriatList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="barge-mamooriat-heading">
        <Translate contentKey="sahaApp.bargeMamooriat.home.title">Barge Mamooriats</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.bargeMamooriat.home.createLabel">Create new Barge Mamooriat</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {bargeMamooriatList && bargeMamooriatList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('vaziat')}>
                  <Translate contentKey="sahaApp.bargeMamooriat.vaziat">Vaziat</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('saleMamooriat')}>
                  <Translate contentKey="sahaApp.bargeMamooriat.saleMamooriat">Sale Mamooriat</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('shorooMamooriat')}>
                  <Translate contentKey="sahaApp.bargeMamooriat.shorooMamooriat">Shoroo Mamooriat</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('payanMamooriat')}>
                  <Translate contentKey="sahaApp.bargeMamooriat.payanMamooriat">Payan Mamooriat</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.sarparast">Sarparast</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.yegan">Yegan</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.hesabResi">Hesab Resi</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
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
                    {bargeMamooriat.sarparastId ? (
                      <Link to={`karbar/${bargeMamooriat.sarparastId}`}>{bargeMamooriat.sarparastId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{bargeMamooriat.yeganId ? <Link to={`yegan/${bargeMamooriat.yeganId}`}>{bargeMamooriat.yeganId}</Link> : ''}</td>
                  <td>
                    {bargeMamooriat.hesabResiId ? (
                      <Link to={`hesab-resi/${bargeMamooriat.hesabResiId}`}>{bargeMamooriat.hesabResiId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bargeMamooriat.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${bargeMamooriat.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${bargeMamooriat.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="sahaApp.bargeMamooriat.home.notFound">No Barge Mamooriats found</Translate>
            </div>
          )
        )}
      </div>
      <div className={bargeMamooriatList && bargeMamooriatList.length > 0 ? '' : 'd-none'}>
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
