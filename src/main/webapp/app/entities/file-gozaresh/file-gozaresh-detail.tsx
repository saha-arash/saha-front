import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './file-gozaresh.reducer';
import { IFileGozaresh } from 'app/shared/model/file-gozaresh.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileGozareshDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileGozareshDetail = (props: IFileGozareshDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fileGozareshEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.fileGozaresh.detail.title">FileGozaresh</Translate> [<b>{fileGozareshEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="file">
              <Translate contentKey="sahaApp.fileGozaresh.file">File</Translate>
            </span>
          </dt>
          <dd>
            {fileGozareshEntity.file ? (
              <div>
                <a onClick={openFile(fileGozareshEntity.fileContentType, fileGozareshEntity.file)}>
                  <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                </a>
                <span>
                  {fileGozareshEntity.fileContentType}, {byteSize(fileGozareshEntity.file)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="sahaApp.fileGozaresh.hesabResi">Hesab Resi</Translate>
          </dt>
          <dd>{fileGozareshEntity.hesabResi ? fileGozareshEntity.hesabResi.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/file-gozaresh" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/file-gozaresh/${fileGozareshEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fileGozaresh }: IRootState) => ({
  fileGozareshEntity: fileGozaresh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileGozareshDetail);
