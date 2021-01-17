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
        <Translate contentKey="sahaApp.hesabResi.home.title">Hesab Resis</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.hesabResi.home.createLabel">Create new Hesab Resi</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {hesabResiList && hesabResiList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sal')}>
                  <Translate contentKey="sahaApp.hesabResi.sal">Sal</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('vaziateHesabResi')}>
                  <Translate contentKey="sahaApp.hesabResi.vaziateHesabResi">Vaziate Hesab Resi</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.gozaresh">Gozaresh</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.bankEtelaati">Bank Etelaati</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.rafeIradat">Rafe Iradat</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.mostaKhreje">Mosta Khreje</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.bilanSeSalGhabl">Bilan Se Sal Ghabl</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.mohasebeHazineMamooriat">Mohasebe Hazine Mamooriat</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.chekideGardeshKar">Chekide Gardesh Kar</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.gozareshHozoor">Gozaresh Hozoor</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.bilanSalGhabl">Bilan Sal Ghabl</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.madarek">Madarek</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.gardeshkarBarnameHesabresi">Gardeshkar Barname Hesabresi</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.dastoorAmalEjraE">Dastoor Amal Ejra E</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.nameh">Nameh</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.kholaseGozaresh">Kholase Gozaresh</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.gardeshKar">Gardesh Kar</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.barnameHesabResi">Barname Hesab Resi</Translate> <FontAwesomeIcon icon="sort" />
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
                    <Translate contentKey={`sahaApp.VaziateHesabResi.${hesabResi.vaziateHesabResi}`} />
                  </td>
                  <td>{hesabResi.gozareshId ? <Link to={`gozaresh/${hesabResi.gozareshId}`}>{hesabResi.gozareshId}</Link> : ''}</td>
                  <td>
                    {hesabResi.bankEtelaatiId ? (
                      <Link to={`bank-etelaati/${hesabResi.bankEtelaatiId}`}>{hesabResi.bankEtelaatiId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {hesabResi.rafeIradatId ? <Link to={`rafe-iradat/${hesabResi.rafeIradatId}`}>{hesabResi.rafeIradatId}</Link> : ''}
                  </td>
                  <td>
                    {hesabResi.mostaKhrejeId ? <Link to={`mosta-khreje/${hesabResi.mostaKhrejeId}`}>{hesabResi.mostaKhrejeId}</Link> : ''}
                  </td>
                  <td>
                    {hesabResi.bilanSeSalGhablId ? (
                      <Link to={`bilan-se-sal-ghabl/${hesabResi.bilanSeSalGhablId}`}>{hesabResi.bilanSeSalGhablId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {hesabResi.mohasebeHazineMamooriatId ? (
                      <Link to={`mohasebe-hazine-mamooriat/${hesabResi.mohasebeHazineMamooriatId}`}>
                        {hesabResi.mohasebeHazineMamooriatId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {hesabResi.chekideGardeshKarId ? (
                      <Link to={`chekide-gardesh-kar/${hesabResi.chekideGardeshKarId}`}>{hesabResi.chekideGardeshKarId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {hesabResi.gozareshHozoorId ? (
                      <Link to={`gozaresh-hozoor/${hesabResi.gozareshHozoorId}`}>{hesabResi.gozareshHozoorId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {hesabResi.bilanSalGhablId ? (
                      <Link to={`bilan-sal-ghabl/${hesabResi.bilanSalGhablId}`}>{hesabResi.bilanSalGhablId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{hesabResi.madarekId ? <Link to={`madarek/${hesabResi.madarekId}`}>{hesabResi.madarekId}</Link> : ''}</td>
                  <td>
                    {hesabResi.gardeshkarBarnameHesabresiId ? (
                      <Link to={`gardeshkar-barname-hesabresi/${hesabResi.gardeshkarBarnameHesabresiId}`}>
                        {hesabResi.gardeshkarBarnameHesabresiId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {hesabResi.dastoorAmalEjraEId ? (
                      <Link to={`dastoor-amal-ejra-e/${hesabResi.dastoorAmalEjraEId}`}>{hesabResi.dastoorAmalEjraEId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{hesabResi.namehId ? <Link to={`nameh/${hesabResi.namehId}`}>{hesabResi.namehId}</Link> : ''}</td>
                  <td>
                    {hesabResi.kholaseGozareshId ? (
                      <Link to={`kholase-gozaresh/${hesabResi.kholaseGozareshId}`}>{hesabResi.kholaseGozareshId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {hesabResi.gardeshKarId ? <Link to={`gardesh-kar/${hesabResi.gardeshKarId}`}>{hesabResi.gardeshKarId}</Link> : ''}
                  </td>
                  <td>
                    {hesabResi.barnameHesabResiId ? (
                      <Link to={`barname-hesab-resi/${hesabResi.barnameHesabResiId}`}>{hesabResi.barnameHesabResiId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${hesabResi.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${hesabResi.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${hesabResi.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="sahaApp.hesabResi.home.notFound">No Hesab Resis found</Translate>
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
