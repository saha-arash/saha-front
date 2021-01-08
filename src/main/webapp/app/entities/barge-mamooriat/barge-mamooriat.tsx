import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBargeMamooriatProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BargeMamooriat = (props: IBargeMamooriatProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { bargeMamooriatList, match, loading } = props;
  return (
    <div>
      <h2 id="barge-mamooriat-heading">
        <span >برگه ماموریت ها</span>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <span>ایجاد برگه ماموریت</span>
        </Link>
      </h2>
      <div className="table-responsive">
        {bargeMamooriatList && bargeMamooriatList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.vaziat">Vaziat</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.saleMamooriat">Sale Mamooriat</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.shorooMamooriat">Shoroo Mamooriat</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.payanMamooriat">Payan Mamooriat</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.sarparast">Sarparast</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.yegan">Yegan</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.hesabResi">Hesab Resi</Translate>
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
                    {bargeMamooriat.sarparast ? (
                      <Link to={`karbar/${bargeMamooriat.sarparast.id}`}>{bargeMamooriat.sarparast.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{bargeMamooriat.yegan ? <Link to={`yegan/${bargeMamooriat.yegan.id}`}>{bargeMamooriat.yegan.id}</Link> : ''}</td>
                  <td>
                    {bargeMamooriat.hesabResi ? (
                      <Link to={`hesab-resi/${bargeMamooriat.hesabResi.id}`}>{bargeMamooriat.hesabResi.id}</Link>
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
                      <Button tag={Link} to={`${match.url}/${bargeMamooriat.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bargeMamooriat.id}/delete`} color="danger" size="sm">
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
    </div>
  );
};

const mapStateToProps = ({ bargeMamooriat }: IRootState) => ({
  bargeMamooriatList: bargeMamooriat.entities,
  loading: bargeMamooriat.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BargeMamooriat);
