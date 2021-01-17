import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IBilanSeSalGhabl } from 'app/shared/model/bilan-se-sal-ghabl.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './bilan-se-sal-ghabl.reducer';

export interface IBilanSeSalGhablDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BilanSeSalGhablDeleteDialog = (props: IBilanSeSalGhablDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/bilan-se-sal-ghabl' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.bilanSeSalGhablEntity.id);
  };

  const { bilanSeSalGhablEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="sahaApp.bilanSeSalGhabl.delete.question">
        <Translate contentKey="sahaApp.bilanSeSalGhabl.delete.question" interpolate={{ id: bilanSeSalGhablEntity.id }}>
          Are you sure you want to delete this BilanSeSalGhabl?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-bilanSeSalGhabl" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ bilanSeSalGhabl }: IRootState) => ({
  bilanSeSalGhablEntity: bilanSeSalGhabl.entity,
  updateSuccess: bilanSeSalGhabl.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BilanSeSalGhablDeleteDialog);
