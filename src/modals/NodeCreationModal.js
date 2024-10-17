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
    console.log("Handle Edge Label Change: " + event.target.value);
    setEdgeLabel(event.target.value);
  }
  
  const handleNodeTitleChange = function(event) {
    console.log("Handle Node Title Change: " + event.target.value);
    setNodeTitle(event.target.value);
  }

  const handleNodeTextChange = function(event) {
    console.log("Handle Node Text Change: " + event.target.value);
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
          <ClayModal.Header>Create new Node</ClayModal.Header>
          <ClayModal.Body>
            <ClayForm.Group>
              <label htmlFor="edgeLabel">Transition Label</label>
              <ClayInput
                id="edgeLabel"
                placeholder="Insert label here"
                value={edgeLabel}
                onChange={handleEdgeLabelChange}
                type="text"
              />
            </ClayForm.Group>
            <ClayForm.Group>
              <label htmlFor="nodeTitle">New question Title</label>
              <ClayInput
                id="nodeTitle"
                placeholder="Insert title here"
                value={nodeTitle}
                onChange={handleNodeTitleChange}
                type="text"
              />
            </ClayForm.Group>        
            <ClayForm.Group>
              <label htmlFor="nodeText">New question Text</label>
              <ClayInput
                id="nodeText"
                placeholder="Insert text here"
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