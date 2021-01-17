import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IChekideGardeshKar } from 'app/shared/model/chekide-gardesh-kar.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './chekide-gardesh-kar.reducer';

export interface IChekideGardeshKarDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChekideGardeshKarDeleteDialog = (props: IChekideGardeshKarDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/chekide-gardesh-kar' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.chekideGardeshKarEntity.id);
  };

  const { chekideGardeshKarEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="sahaApp.chekideGardeshKar.delete.question">
        <Translate contentKey="sahaApp.chekideGardeshKar.delete.question" interpolate={{ id: chekideGardeshKarEntity.id }}>
          Are you sure you want to delete this ChekideGardeshKar?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-chekideGardeshKar" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ chekideGardeshKar }: IRootState) => ({
  chekideGardeshKarEntity: chekideGardeshKar.entity,
  updateSuccess: chekideGardeshKar.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChekideGardeshKarDeleteDialog);
