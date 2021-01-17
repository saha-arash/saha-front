import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IKholaseGozaresh } from 'app/shared/model/kholase-gozaresh.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './kholase-gozaresh.reducer';

export interface IKholaseGozareshDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const KholaseGozareshDeleteDialog = (props: IKholaseGozareshDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/kholase-gozaresh' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.kholaseGozareshEntity.id);
  };

  const { kholaseGozareshEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="sahaApp.kholaseGozaresh.delete.question">
        <Translate contentKey="sahaApp.kholaseGozaresh.delete.question" interpolate={{ id: kholaseGozareshEntity.id }}>
          Are you sure you want to delete this KholaseGozaresh?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-kholaseGozaresh" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ kholaseGozaresh }: IRootState) => ({
  kholaseGozareshEntity: kholaseGozaresh.entity,
  updateSuccess: kholaseGozaresh.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(KholaseGozareshDeleteDialog);
