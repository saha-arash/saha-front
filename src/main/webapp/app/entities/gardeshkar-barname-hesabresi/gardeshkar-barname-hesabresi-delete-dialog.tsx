import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IGardeshkarBarnameHesabresi } from 'app/shared/model/gardeshkar-barname-hesabresi.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './gardeshkar-barname-hesabresi.reducer';

export interface IGardeshkarBarnameHesabresiDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GardeshkarBarnameHesabresiDeleteDialog = (props: IGardeshkarBarnameHesabresiDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/gardeshkar-barname-hesabresi' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.gardeshkarBarnameHesabresiEntity.id);
  };

  const { gardeshkarBarnameHesabresiEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="sahaApp.gardeshkarBarnameHesabresi.delete.question">
        <Translate
          contentKey="sahaApp.gardeshkarBarnameHesabresi.delete.question"
          interpolate={{ id: gardeshkarBarnameHesabresiEntity.id }}
        >
          Are you sure you want to delete this GardeshkarBarnameHesabresi?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-gardeshkarBarnameHesabresi" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ gardeshkarBarnameHesabresi }: IRootState) => ({
  gardeshkarBarnameHesabresiEntity: gardeshkarBarnameHesabresi.entity,
  updateSuccess: gardeshkarBarnameHesabresi.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GardeshkarBarnameHesabresiDeleteDialog);
