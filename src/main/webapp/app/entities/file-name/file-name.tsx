import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './file-name.reducer';
import { IFileName } from 'app/shared/model/file-name.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileNameProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FileName = (props: IFileNameProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { fileNameList, match, loading } = props;
  return (
    <div>
      <h2 id="file-name-heading">
        <Translate contentKey="sahaApp.fileName.home.title">File Names</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.fileName.home.createLabel">Create new File Name</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {fileNameList && fileNameList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileName.madrak">Madrak</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.fileName.name">Name</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fileNameList.map((fileName, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${fileName.id}`} color="link" size="sm">
                      {fileName.id}
                    </Button>
                  </td>
                  <td>
                    {fileName.madrak ? (
                      <div>
                        <a onClick={openFile(fileName.madrakContentType, fileName.madrak)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                          &nbsp;
                        </a>
                        <span>
                          {fileName.madrakContentType}, {byteSize(fileName.madrak)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{fileName.name ? <Link to={`payam/${fileName.name.id}`}>{fileName.name.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fileName.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fileName.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fileName.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sahaApp.fileName.home.notFound">No File Names found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ fileName }: IRootState) => ({
  fileNameList: fileName.entities,
  loading: fileName.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileName);
