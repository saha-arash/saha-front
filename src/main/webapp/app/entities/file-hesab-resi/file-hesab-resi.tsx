import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './file-hesab-resi.reducer';
import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import TimeToText from 'app/shared/timeToText/TimeToText';

export interface IFileHesabResiProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FileHesabResi = (props: IFileHesabResiProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const {fileType, hesabresiId}: any = props.match.params;
  const getAllEntities = () => {
    props.getEntities(
      paginationState.activePage - 1, 
      paginationState.itemsPerPage, 
      `${paginationState.sort},${paginationState.order}`,
      fileType , 
      hesabresiId
      );
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

  const { fileHesabResiList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="file-hesab-resi-heading">
        <Translate contentKey="sahaApp.fileHesabResi.home.title">File Hesab Resis</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.fileHesabResi.home.createLabel">Create new File Hesab Resi</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {fileHesabResiList && fileHesabResiList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('file')}>
                  <Translate contentKey="sahaApp.fileHesabResi.file">File</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('shomare')}>
                  <Translate contentKey="sahaApp.fileHesabResi.shomare">Shomare</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('tarikhName')}>
                  <Translate contentKey="sahaApp.fileHesabResi.tarikhName">Tarikh Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('mozoo')}>
                  <Translate contentKey="sahaApp.fileHesabResi.mozoo">Mozoo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fileType')}>
                  <Translate contentKey="sahaApp.fileHesabResi.fileType">File Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.hesabResi">Hesab Resi</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.barnameHesabResi">Barname Hesab Resi</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.bankEtelaati">Bank Etelaati</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.rafeIradat">Rafe Iradat</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.mostaKhreje">Mosta Khreje</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.bilanSeSalGhabl">Bilan Se Sal Ghabl</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.mohasebeHazineMamooriat">Mohasebe Hazine Mamooriat</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.chekideGardeshKar">Chekide Gardesh Kar</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.gozareshHozoor">Gozaresh Hozoor</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.bilanSalGhabl">Bilan Sal Ghabl</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.madarek">Madarek</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.gardeshkarBarnameHesabresi">Gardeshkar Barname Hesabresi</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.dastoorAmalEjraE">Dastoor Amal Ejra E</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.nameh">Nameh</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.kholaseGozaresh">Kholase Gozaresh</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.gardeshKar">Gardesh Kar</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fileHesabResiList.map((fileHesabResi, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${fileHesabResi.id}`} color="link" size="sm">
                      {fileHesabResi.id}
                    </Button>
                  </td>
                  <td>
                    {fileHesabResi.file ? (
                      <div>
                        <a onClick={openFile(fileHesabResi.fileContentType, fileHesabResi.file)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                          &nbsp;
                        </a>
                        <span>
                          {fileHesabResi.fileContentType}, {byteSize(fileHesabResi.file)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{fileHesabResi.shomare}</td>
                  <td>
                    <TimeToText type="date" value={fileHesabResi.tarikhName} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{fileHesabResi.mozoo}</td>
                  <td>
                    <Translate contentKey={`sahaApp.FileType.${fileHesabResi.fileType}`} />
                  </td>
                  <td>
                    {fileHesabResi.hesabResiId ? (
                      <Link to={`hesab-resi/${fileHesabResi.hesabResiId}`}>{fileHesabResi.hesabResiId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.barnameHesabResiId ? (
                      <Link to={`barname-hesab-resi/${fileHesabResi.barnameHesabResiId}`}>{fileHesabResi.barnameHesabResiId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.bankEtelaatiId ? (
                      <Link to={`bank-etelaati/${fileHesabResi.bankEtelaatiId}`}>{fileHesabResi.bankEtelaatiId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.rafeIradatId ? (
                      <Link to={`rafe-iradat/${fileHesabResi.rafeIradatId}`}>{fileHesabResi.rafeIradatId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.mostaKhrejeId ? (
                      <Link to={`mosta-khreje/${fileHesabResi.mostaKhrejeId}`}>{fileHesabResi.mostaKhrejeId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.bilanSeSalGhablId ? (
                      <Link to={`bilan-se-sal-ghabl/${fileHesabResi.bilanSeSalGhablId}`}>{fileHesabResi.bilanSeSalGhablId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.mohasebeHazineMamooriatId ? (
                      <Link to={`mohasebe-hazine-mamooriat/${fileHesabResi.mohasebeHazineMamooriatId}`}>
                        {fileHesabResi.mohasebeHazineMamooriatId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.chekideGardeshKarId ? (
                      <Link to={`chekide-gardesh-kar/${fileHesabResi.chekideGardeshKarId}`}>{fileHesabResi.chekideGardeshKarId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.gozareshHozoorId ? (
                      <Link to={`gozaresh-hozoor/${fileHesabResi.gozareshHozoorId}`}>{fileHesabResi.gozareshHozoorId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.bilanSalGhablId ? (
                      <Link to={`bilan-sal-ghabl/${fileHesabResi.bilanSalGhablId}`}>{fileHesabResi.bilanSalGhablId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{fileHesabResi.madarekId ? <Link to={`madarek/${fileHesabResi.madarekId}`}>{fileHesabResi.madarekId}</Link> : ''}</td>
                  <td>
                    {fileHesabResi.gardeshkarBarnameHesabresiId ? (
                      <Link to={`gardeshkar-barname-hesabresi/${fileHesabResi.gardeshkarBarnameHesabresiId}`}>
                        {fileHesabResi.gardeshkarBarnameHesabresiId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.dastoorAmalEjraEId ? (
                      <Link to={`dastoor-amal-ejra-e/${fileHesabResi.dastoorAmalEjraEId}`}>{fileHesabResi.dastoorAmalEjraEId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{fileHesabResi.namehId ? <Link to={`nameh/${fileHesabResi.namehId}`}>{fileHesabResi.namehId}</Link> : ''}</td>
                  <td>
                    {fileHesabResi.kholaseGozareshId ? (
                      <Link to={`kholase-gozaresh/${fileHesabResi.kholaseGozareshId}`}>{fileHesabResi.kholaseGozareshId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.gardeshKarId ? (
                      <Link to={`gardesh-kar/${fileHesabResi.gardeshKarId}`}>{fileHesabResi.gardeshKarId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fileHesabResi.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${fileHesabResi.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${fileHesabResi.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="sahaApp.fileHesabResi.home.notFound">No File Hesab Resis found</Translate>
            </div>
          )
        )}
      </div>
      <div className={fileHesabResiList && fileHesabResiList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ fileHesabResi }: IRootState) => ({
  fileHesabResiList: fileHesabResi.entities,
  loading: fileHesabResi.loading,
  totalItems: fileHesabResi.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileHesabResi);
