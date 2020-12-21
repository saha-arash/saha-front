import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './hesab-resi.reducer';
import { IHesabResi } from 'app/shared/model/hesab-resi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHesabResiProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const HesabResi = (props: IHesabResiProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { hesabResiList, match, loading } = props;
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
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.sal">Sal</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.vaziateHesabResi">Vaziate Hesab Resi</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.gozaresh">Gozaresh</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.hesabResi.barnameHesabResi">Barname Hesab Resi</Translate>
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
                  <td>{hesabResi.gozaresh ? <Link to={`gozaresh/${hesabResi.gozaresh.id}`}>{hesabResi.gozaresh.id}</Link> : ''}</td>
                  <td>
                    {hesabResi.barnameHesabResi ? (
                      <Link to={`barname-hesab-resi/${hesabResi.barnameHesabResi.id}`}>{hesabResi.barnameHesabResi.id}</Link>
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
                      <Button tag={Link} to={`${match.url}/${hesabResi.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${hesabResi.id}/delete`} color="danger" size="sm">
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
    </div>
  );
};

const mapStateToProps = ({ hesabResi }: IRootState) => ({
  hesabResiList: hesabResi.entities,
  loading: hesabResi.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HesabResi);
