import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './file-hesab-resi.reducer';
import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileHesabResiProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FileHesabResi = (props: IFileHesabResiProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { fileHesabResiList, match, loading } = props;
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
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.file">File</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.shomare">Shomare</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.tarikhName">Tarikh Name</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.mozoo">Mozoo</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.fileType">File Type</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.hesabResi">Hesab Resi</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileHesabResi.barnameHesabResi">Barname Hesab Resi</Translate>
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
                    <TextFormat type="date" value={fileHesabResi.tarikhName} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{fileHesabResi.mozoo}</td>
                  <td>
                    <Translate contentKey={`sahaApp.FileType.${fileHesabResi.fileType}`} />
                  </td>
                  <td>
                    {fileHesabResi.hesabResi ? (
                      <Link to={`hesab-resi/${fileHesabResi.hesabResi.id}`}>{fileHesabResi.hesabResi.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {fileHesabResi.barnameHesabResi ? (
                      <Link to={`barname-hesab-resi/${fileHesabResi.barnameHesabResi.id}`}>{fileHesabResi.barnameHesabResi.id}</Link>
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
                      <Button tag={Link} to={`${match.url}/${fileHesabResi.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fileHesabResi.id}/delete`} color="danger" size="sm">
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
    </div>
  );
};

const mapStateToProps = ({ fileHesabResi }: IRootState) => ({
  fileHesabResiList: fileHesabResi.entities,
  loading: fileHesabResi.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileHesabResi);
