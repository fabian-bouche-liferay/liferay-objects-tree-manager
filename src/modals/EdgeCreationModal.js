import React, { useCallback, useState, useEffect } from 'react';

import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';
import ClayForm, {ClayInput} from '@clayui/form';

function EdgeCreationModal(props) {

  const { observer, onOpenChange, open, onClose } = useModal({
    onClose: props.onClose
  });

  const [edgeLabel, setEdgeLabel] = useState('');

  const handleEdgeLabelChange = function(event) {
    setEdgeLabel(event.target.value);
  }
  
  return (
    <>
      {props.open && (
        <ClayModal
          observer={observer}
          size="lg"
          status="info"
        >
          <ClayModal.Header>Create a new Edge</ClayModal.Header>
          <ClayModal.Body>
            <ClayForm.Group>
              <label htmlFor="nodeLabel">Label</label>
              <ClayInput
                id="nodeLabel"
                placeholder="Choose a label for the Edge"
                onChange={handleEdgeLabelChange}
                type="text"
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
                <ClayButton onClick={() => {
                  props.onEdgeCreation(edgeLabel);
                  onOpenChange(false);
                }}>
                  Save changes
                </ClayButton>
              </ClayButton.Group>
            }
          />
        </ClayModal>
      )}
    </>
  );
}
  
export default EdgeCreationModal;