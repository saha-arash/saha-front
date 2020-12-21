import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './negahbani.reducer';
import { INegahbani } from 'app/shared/model/negahbani.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INegahbaniProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Negahbani = (props: INegahbaniProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { negahbaniList, match, loading } = props;
  return (
    <div>
      <h2 id="negahbani-heading">
        <Translate contentKey="sahaApp.negahbani.home.title">Negahbanis</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.negahbani.home.createLabel">Create new Negahbani</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {negahbaniList && negahbaniList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.negahbani.begin">Begin</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.negahbani.end">End</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.negahbani.karbar">Karbar</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {negahbaniList.map((negahbani, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${negahbani.id}`} color="link" size="sm">
                      {negahbani.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={negahbani.begin} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={negahbani.end} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{negahbani.karbar ? <Link to={`karbar/${negahbani.karbar.id}`}>{negahbani.karbar.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${negahbani.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${negahbani.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${negahbani.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sahaApp.negahbani.home.notFound">No Negahbanis found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ negahbani }: IRootState) => ({
  negahbaniList: negahbani.entities,
  loading: negahbani.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Negahbani);
