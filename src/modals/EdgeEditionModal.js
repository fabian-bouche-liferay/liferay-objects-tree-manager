import React, { useCallback, useState, useEffect } from 'react';

import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';
import ClayForm, {ClayInput} from '@clayui/form';

function EdgeEditionModal(props) {

  const { observer, onOpenChange, open, onClose } = useModal({
    onClose: props.onClose
  });

  const [edgeLabel, setEdgeLabel] = useState('');

  useEffect(() => {
    setEdgeLabel(props.label);
  }, [props]);

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
          <ClayModal.Header>Update Edge Label</ClayModal.Header>
          <ClayModal.Body>
            <ClayForm.Group>
              <label htmlFor="nodeLabel">Label</label>
              <ClayInput
                id="nodeLabel"
                placeholder="Insert label here"
                value={edgeLabel}
                onChange={handleEdgeLabelChange}
                type="text"
              />
            </ClayForm.Group>
          </ClayModal.Body>
          <ClayModal.Footer
            last={
              <ClayButton.Group spaced>
                <ClayButton
                  displayType="danger"
                  onClick={() => {
                    props.onEdgeDeletion();
                    onOpenChange(false);
                  }}
                >
                  Delete Edge
                </ClayButton>                
                <ClayButton
                  displayType="secondary"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </ClayButton>
                <ClayButton onClick={() => {
                  props.onLabelChange(edgeLabel);
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
  
export default EdgeEditionModal;