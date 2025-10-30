import React, { useState, useEffect } from 'react';

import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';
import ClayForm, {ClayInput} from '@clayui/form';

function TreeDeletionModal(props) {

  const { observer, onOpenChange, open, onClose } = useModal({
    onClose: props.onClose
  });

  return (
    <>
      {props.open && (
        <ClayModal
          observer={observer}
          size="lg"
          status="info"
        >
          <ClayModal.Header>Delete tree</ClayModal.Header>
          <ClayModal.Body>
            <ClayForm.Group>
              <label htmlFor="treeLabel">Tree Title</label>
              <ClayInput
                id="treeLabel"
                disabled={true}
                placeholder="Choose a label for the Tree"
                type="text"
                value={props.treeLabel}
              />              
            </ClayForm.Group>        
          </ClayModal.Body>
          <ClayModal.Footer
            last={
              <ClayButton.Group spaced>
                <ClayButton
                  displayType="secondary"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </ClayButton>
                <ClayButton 
                  displayType="danger"
                  onClick={() => {
                    props.onTreeDeletion(props.treeId);
                    onOpenChange(false);
                  }}
                >
                  Delete
                </ClayButton>
              </ClayButton.Group>
            }
          />
        </ClayModal>
      )}
    </>
  );
}
  
export default TreeDeletionModal;