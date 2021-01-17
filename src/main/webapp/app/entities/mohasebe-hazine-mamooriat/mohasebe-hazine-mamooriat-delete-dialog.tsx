import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IMohasebeHazineMamooriat } from 'app/shared/model/mohasebe-hazine-mamooriat.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './mohasebe-hazine-mamooriat.reducer';

export interface IMohasebeHazineMamooriatDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MohasebeHazineMamooriatDeleteDialog = (props: IMohasebeHazineMamooriatDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/mohasebe-hazine-mamooriat' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.mohasebeHazineMamooriatEntity.id);
  };

  const { mohasebeHazineMamooriatEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="sahaApp.mohasebeHazineMamooriat.delete.question">
        <Translate contentKey="sahaApp.mohasebeHazineMamooriat.delete.question" interpolate={{ id: mohasebeHazineMamooriatEntity.id }}>
          Are you sure you want to delete this MohasebeHazineMamooriat?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-mohasebeHazineMamooriat" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ mohasebeHazineMamooriat }: IRootState) => ({
  mohasebeHazineMamooriatEntity: mohasebeHazineMamooriat.entity,
  updateSuccess: mohasebeHazineMamooriat.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MohasebeHazineMamooriatDeleteDialog);
