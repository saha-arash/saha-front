import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './payam.reducer';
import { IPayam } from 'app/shared/model/payam.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPayamProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Payam = (props: IPayamProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { payamList, match, loading } = props;
  return (
    <div>
      <h2 id="payam-heading">
        <Translate contentKey="sahaApp.payam.home.title">Payams</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.payam.home.createLabel">Create new Payam</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {payamList && payamList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.payam.onvan">Onvan</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.payam.matn">Matn</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.payam.karbarErsalKonande">Karbar Ersal Konande</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.payam.karbarDaryaftKonand">Karbar Daryaft Konand</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.payam.yeganErsalKonanade">Yegan Ersal Konanade</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.payam.yeganDaryaftKonanade">Yegan Daryaft Konanade</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {payamList.map((payam, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${payam.id}`} color="link" size="sm">
                      {payam.id}
                    </Button>
                  </td>
                  <td>{payam.onvan}</td>
                  <td>{payam.matn}</td>
                  <td>
                    {payam.karbarErsalKonande ? (
                      <Link to={`karbar/${payam.karbarErsalKonande.id}`}>{payam.karbarErsalKonande.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {payam.karbarDaryaftKonand ? (
                      <Link to={`karbar/${payam.karbarDaryaftKonand.id}`}>{payam.karbarDaryaftKonand.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {payam.yeganErsalKonanade ? <Link to={`yegan/${payam.yeganErsalKonanade.id}`}>{payam.yeganErsalKonanade.id}</Link> : ''}
                  </td>
                  <td>
                    {payam.yeganDaryaftKonanade ? (
                      <Link to={`yegan/${payam.yeganDaryaftKonanade.id}`}>{payam.yeganDaryaftKonanade.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${payam.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payam.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payam.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sahaApp.payam.home.notFound">No Payams found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ payam }: IRootState) => ({
  payamList: payam.entities,
  loading: payam.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Payam);
