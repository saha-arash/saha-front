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
import TimeToText from 'app/shared/timeToText/TimeToText';

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
            <TimeToText value={fileHesabResiEntity.tarikhName} type="date" format={APP_DATE_FORMAT} />
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
          <dd>{fileHesabResiEntity.hesabResiId ? fileHesabResiEntity.hesabResiId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.barnameHesabResi">Barname Hesab Resi</Translate>
          </dt>
          <dd>{fileHesabResiEntity.barnameHesabResiId ? fileHesabResiEntity.barnameHesabResiId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.bankEtelaati">Bank Etelaati</Translate>
          </dt>
          <dd>{fileHesabResiEntity.bankEtelaatiId ? fileHesabResiEntity.bankEtelaatiId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.rafeIradat">Rafe Iradat</Translate>
          </dt>
          <dd>{fileHesabResiEntity.rafeIradatId ? fileHesabResiEntity.rafeIradatId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.mostaKhreje">Mosta Khreje</Translate>
          </dt>
          <dd>{fileHesabResiEntity.mostaKhrejeId ? fileHesabResiEntity.mostaKhrejeId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.bilanSeSalGhabl">Bilan Se Sal Ghabl</Translate>
          </dt>
          <dd>{fileHesabResiEntity.bilanSeSalGhablId ? fileHesabResiEntity.bilanSeSalGhablId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.mohasebeHazineMamooriat">Mohasebe Hazine Mamooriat</Translate>
          </dt>
          <dd>{fileHesabResiEntity.mohasebeHazineMamooriatId ? fileHesabResiEntity.mohasebeHazineMamooriatId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.chekideGardeshKar">Chekide Gardesh Kar</Translate>
          </dt>
          <dd>{fileHesabResiEntity.chekideGardeshKarId ? fileHesabResiEntity.chekideGardeshKarId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.gozareshHozoor">Gozaresh Hozoor</Translate>
          </dt>
          <dd>{fileHesabResiEntity.gozareshHozoorId ? fileHesabResiEntity.gozareshHozoorId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.bilanSalGhabl">Bilan Sal Ghabl</Translate>
          </dt>
          <dd>{fileHesabResiEntity.bilanSalGhablId ? fileHesabResiEntity.bilanSalGhablId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.madarek">Madarek</Translate>
          </dt>
          <dd>{fileHesabResiEntity.madarekId ? fileHesabResiEntity.madarekId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.gardeshkarBarnameHesabresi">Gardeshkar Barname Hesabresi</Translate>
          </dt>
          <dd>{fileHesabResiEntity.gardeshkarBarnameHesabresiId ? fileHesabResiEntity.gardeshkarBarnameHesabresiId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.dastoorAmalEjraE">Dastoor Amal Ejra E</Translate>
          </dt>
          <dd>{fileHesabResiEntity.dastoorAmalEjraEId ? fileHesabResiEntity.dastoorAmalEjraEId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.nameh">Nameh</Translate>
          </dt>
          <dd>{fileHesabResiEntity.namehId ? fileHesabResiEntity.namehId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.kholaseGozaresh">Kholase Gozaresh</Translate>
          </dt>
          <dd>{fileHesabResiEntity.kholaseGozareshId ? fileHesabResiEntity.kholaseGozareshId : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.fileHesabResi.gardeshKar">Gardesh Kar</Translate>
          </dt>
          <dd>{fileHesabResiEntity.gardeshKarId ? fileHesabResiEntity.gardeshKarId : ''}</dd>
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
