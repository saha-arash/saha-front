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
import { toast } from 'react-toastify';
import axios from 'axios';

const translateToFa = {
  VoroodiBilanSalGhabl: 'بیلان سال قبل',
  VoroodiBilanSeSalGhabl: 'بیلان سه سال قبل',
  BarnameHesabResi: 'برنامه حسابرسی',
  MohasebeHazineMamooriat: 'هزینه ماموریت',
  DastoorAmalEjraE: 'دستورالعمل اجرایی',
  Madarek: 'مدارک',
  MadarekGozaresh: 'گزارش',
  GardeshKar: 'گردش کار',
  MostaKhreje: 'مستخرجه',
  KholaseGozaresh: 'خلاصه گزارش',
  BankEtelaati: 'بانک اطلاعاتی',
  RafeIradat: 'رفع ایرادات',
  Nameh: 'نامه‌ها'
};

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
    // props.history.push(
    //   `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    // );
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/file-hesab-resis/${id}`)
      getAllEntities()
    } catch(e) {
      toast.error('خطا در حذف فایل')
    }
  }

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
        {
          translateToFa[fileType] || 'فایل حسابرسی'
        }
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          ایجاد فایل
        </Link>
      </h2>
      <div className="table-responsive">
        {fileHesabResiList && fileHesabResiList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  شناسه <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('file')}>
                  فایل <FontAwesomeIcon icon="sort" />
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
                  
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      
                      <Button
                        // tag={Link}
                        // to={`${match.url}/${fileHesabResi.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        onClick={() => deleteItem(fileHesabResi.id)}
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
              هیچ فایلی پیدا نشد
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
