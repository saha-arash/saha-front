import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './file-hesab-resi.reducer';
import { IFileHesabResi } from 'app/shared/model/file-hesab-resi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileHesabResiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileHesabResiDetail = (props: IFileHesabResiDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fileHesabResiEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.fileHesabResi.detail.title">FileHesabResi</Translate> [<b>{fileHesabResiEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="file">
              <Translate contentKey="sahaApp.fileHesabResi.file">File</Translate>
            </span>
          </dt>
          <dd>
            {fileHesabResiEntity.file ? (
              <div>
                <a onClick={openFile(fileHesabResiEntity.fileContentType, fileHesabResiEntity.file)}>
                  <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                </a>
                <span>
                  {fileHesabResiEntity.fileContentType}, {byteSize(fileHesabResiEntity.file)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="shomare">
              <Translate contentKey="sahaApp.fileHesabResi.shomare">Shomare</Translate>
            </span>
          </dt>
          <dd>{fileHesabResiEntity.shomare}</dd>
          <dt>
            <span id="tarikhName">
              <Translate contentKey="sahaApp.fileHesabResi.tarikhName">Tarikh Name</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={fileHesabResiEntity.tarikhName} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="mozoo">
              <Translate contentKey="sahaApp.fileHesabResi.mozoo">Mozoo</Translate>
            </span>
          </dt>
          <dd>{fileHesabResiEntity.mozoo}</dd>
          <dt>
            <span id="fileType">
              <Translate contentKey="sahaApp.fileHesabResi.fileType">File Type</Translate>
            </span>
          </dt>
          <dd>{fileHesabResiEntity.fileType}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.hesabResi">Hesab Resi</Translate>
          </dt>
          <dd>{fileHesabResiEntity.hesabResi ? fileHesabResiEntity.hesabResi.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.barnameHesabResi">Barname Hesab Resi</Translate>
          </dt>
          <dd>{fileHesabResiEntity.barnameHesabResi ? fileHesabResiEntity.barnameHesabResi.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/file-hesab-resi" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/file-hesab-resi/${fileHesabResiEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fileHesabResi }: IRootState) => ({
  fileHesabResiEntity: fileHesabResi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileHesabResiDetail);
