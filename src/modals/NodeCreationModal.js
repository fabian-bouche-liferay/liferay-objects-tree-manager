import React, { useCallback, useState, useEffect } from 'react';

import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';
import ClayForm, {ClayInput} from '@clayui/form';

function NodeCreationModal(props) {

  const { observer, onOpenChange, open, onClose } = useModal({
    onClose: props.onClose
  });

  const [edgeLabel, setEdgeLabel] = useState('');
  const [nodeTitle, setNodeTitle] = useState('');
  const [nodeText, setNodeText] = useState('');

  const handleEdgeLabelChange = function(event) {
    setEdgeLabel(event.target.value);
  }
  
  const handleNodeTitleChange = function(event) {
    setNodeTitle(event.target.value);
  }

  const handleNodeTextChange = function(event) {
    setNodeText(event.target.value);
  }

  return (
    <>
      {props.open && (
        <ClayModal
          observer={observer}
          size="lg"
          status="info"
        >
          <ClayModal.Header>Create a new Node</ClayModal.Header>
          <ClayModal.Body>
            <ClayForm.Group>
              <label htmlFor="edgeLabel">Edge Label</label>
              <ClayInput
                id="edgeLabel"
                placeholder="Select a label for the Edge to the new Node"
                value={edgeLabel}
                onChange={handleEdgeLabelChange}
                type="text"
              />
            </ClayForm.Group>
            <ClayForm.Group>
              <label htmlFor="nodeTitle">New Node Title</label>
              <ClayInput
                id="nodeTitle"
                placeholder="Insert a title for the new Node here"
                value={nodeTitle}
                onChange={handleNodeTitleChange}
                type="text"
              />
            </ClayForm.Group>        
            <ClayForm.Group>
              <label htmlFor="nodeText">New Node Text</label>
              <ClayInput
                id="nodeText"
                placeholder="Insert a text for the new Node"
                value={nodeText}
                component="textarea"
                onChange={handleNodeTextChange}
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
                  props.onNodeCreation(edgeLabel, nodeTitle, nodeText);
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
  
export default NodeCreationModal;