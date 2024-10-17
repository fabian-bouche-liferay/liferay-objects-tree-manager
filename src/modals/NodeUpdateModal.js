import React, { useCallback, useState, useEffect } from 'react';

import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';
import ClayForm, {ClayInput} from '@clayui/form';

function NodeUpdateModal(props) {

  const { observer, onOpenChange, open, onClose } = useModal({
    onClose: props.onClose
  });

  const [nodeTitle, setNodeTitle] = useState('');
  const [nodeText, setNodeText] = useState('');

  useEffect(() => {
    setNodeTitle(props.nodeTitle);
    setNodeText(props.nodeText);
  }, [props]);

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
          <ClayModal.Header>Update a Node</ClayModal.Header>
          <ClayModal.Body>
            <ClayForm.Group>
              <label htmlFor="nodeTitle">Node Title</label>
              <ClayInput
                id="nodeTitle"
                placeholder="Insert a title for the Node here"
                value={nodeTitle}
                onChange={handleNodeTitleChange}
                type="text"
              />
            </ClayForm.Group>        
            <ClayForm.Group>
              <label htmlFor="nodeText">Node Text</label>
              <ClayInput
                id="nodeText"
                placeholder="Insert a text for the Node"
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
                  displayType="danger"
                  onClick={() => {
                    props.onNodeDeletion();
                    onOpenChange(false);
                  }}
                >
                  Delete Node
                </ClayButton>

                <ClayButton
                  displayType="secondary"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </ClayButton>
                <ClayButton onClick={() => {
                  props.onNodeUpdate(nodeTitle, nodeText);
                  onOpenChange(false);
                }}
                >
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
  
export default NodeUpdateModal;