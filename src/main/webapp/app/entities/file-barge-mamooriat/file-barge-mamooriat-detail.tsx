import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './file-barge-mamooriat.reducer';
import { IFileBargeMamooriat } from 'app/shared/model/file-barge-mamooriat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileBargeMamooriatDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileBargeMamooriatDetail = (props: IFileBargeMamooriatDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fileBargeMamooriatEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.fileBargeMamooriat.detail.title">FileBargeMamooriat</Translate> [
          <b>{fileBargeMamooriatEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="madarek">
              <Translate contentKey="sahaApp.fileBargeMamooriat.madarek">Madarek</Translate>
            </span>
          </dt>
          <dd>
            {fileBargeMamooriatEntity.madarek ? (
              <div>
                <a onClick={openFile(fileBargeMamooriatEntity.madarekContentType, fileBargeMamooriatEntity.madarek)}>
                  <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                </a>
                <span>
                  {fileBargeMamooriatEntity.madarekContentType}, {byteSize(fileBargeMamooriatEntity.madarek)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="sahaApp.fileBargeMamooriat.bargeMamooriat">Barge Mamooriat</Translate>
          </dt>
          <dd>{fileBargeMamooriatEntity.bargeMamooriat ? fileBargeMamooriatEntity.bargeMamooriat.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/file-barge-mamooriat" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/file-barge-mamooriat/${fileBargeMamooriatEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fileBargeMamooriat }: IRootState) => ({
  fileBargeMamooriatEntity: fileBargeMamooriat.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileBargeMamooriatDetail);
