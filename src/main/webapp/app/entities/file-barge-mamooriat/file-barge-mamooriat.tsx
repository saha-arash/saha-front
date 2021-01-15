import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './file-barge-mamooriat.reducer';
import { IFileBargeMamooriat } from 'app/shared/model/file-barge-mamooriat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileBargeMamooriatProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FileBargeMamooriat = (props: IFileBargeMamooriatProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);
  console.log(props);

  // TODO: get list of files by mamuriat id
  const { fileBargeMamooriatList, match, loading } = props;
  return (
    <div>
      <h3 id="file-barge-mamooriat-heading">
        <span>فایل های برگه ماموریت</span>
        <Link to={{ pathname: `${match.url}/new`, state: { id: '2' }}} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <span>ایجاد فایل جدید</span>
        </Link>
      </h3>
      <div className="table-responsive">
        {fileBargeMamooriatList && fileBargeMamooriatList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <span>شناسه</span>
                </th>
                <th>
                  {/* <Translate contentKey="sahaApp.fileBargeMamooriat.madarek">مدارک</Translate> */}
                </th>
                <th>
                  <span>شناسه برگه ماموریت</span>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {/* HTU Map  */}
              {fileBargeMamooriatList.map((fileBargeMamooriat, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${fileBargeMamooriat.id}`} color="link" size="sm">
                      {fileBargeMamooriat.id}
                    </Button>
                  </td>
                  <td>
                    {fileBargeMamooriat.madarek ? (
                      <div>
                        <a onClick={openFile(fileBargeMamooriat.madarekContentType, fileBargeMamooriat.madarek)}>
                          
                          <span>باز کردن</span>
                          &nbsp;
                        </a>
                        <span>
                          ({fileBargeMamooriat.madarekContentType}), {/*byteSize(fileBargeMamooriat.madarek)*/}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {fileBargeMamooriat.bargeMamooriat ? (
                      <Link to={`barge-mamooriat/${fileBargeMamooriat.bargeMamooriat.id}`}>{fileBargeMamooriat.bargeMamooriat.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fileBargeMamooriat.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fileBargeMamooriat.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fileBargeMamooriat.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sahaApp.fileBargeMamooriat.home.notFound">No File Barge Mamooriats found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ fileBargeMamooriat }: IRootState) => ({
  fileBargeMamooriatList: fileBargeMamooriat.entities,
  loading: fileBargeMamooriat.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileBargeMamooriat);
