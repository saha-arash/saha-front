import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IDastoorAmalEjraE } from 'app/shared/model/dastoor-amal-ejra-e.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './dastoor-amal-ejra-e.reducer';

export interface IDastoorAmalEjraEDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DastoorAmalEjraEDeleteDialog = (props: IDastoorAmalEjraEDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/dastoor-amal-ejra-e' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.dastoorAmalEjraEEntity.id);
  };

  const { dastoorAmalEjraEEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="sahaApp.dastoorAmalEjraE.delete.question">
        <Translate contentKey="sahaApp.dastoorAmalEjraE.delete.question" interpolate={{ id: dastoorAmalEjraEEntity.id }}>
          Are you sure you want to delete this DastoorAmalEjraE?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-dastoorAmalEjraE" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ dastoorAmalEjraE }: IRootState) => ({
  dastoorAmalEjraEEntity: dastoorAmalEjraE.entity,
  updateSuccess: dastoorAmalEjraE.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DastoorAmalEjraEDeleteDialog);
