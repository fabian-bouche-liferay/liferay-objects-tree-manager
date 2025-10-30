import React, { useState, useEffect } from 'react';

import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';
import ClayForm, {ClayInput} from '@clayui/form';

function NodeUpdateModal(props) {

  const [advanced, setAdvanced] = useState(false);
  const [dptUrl, setDptUrl] = useState(null);
  const [modalSize, setModalSize] = useState('lg');

  const { observer, onOpenChange, open, onClose } = useModal({
    onClose: props.onClose
  });

  const [nodeTitle, setNodeTitle] = useState('');
  const [nodeText, setNodeText] = useState('');
  const [nodeRoot, setNodeRoot] = useState(false);

  useEffect(() => {
    setNodeTitle(props.nodeTitle);
    setNodeText(props.nodeText);
    setNodeRoot(props.nodeRoot);
    console.log(props);
    if(props.currentNode != null) {
      setDptUrl(props.nodeDptBaseUrl + props.currentNode.id + "?p_p_state=pop_up");
    }
  }, [props]);

  useEffect(() => {
    if(advanced) {
      setModalSize("full-screen");
    } else {
      setModalSize("lg");
    }
  }, [advanced]);

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
          size={modalSize}
          status="info"
        >
          <ClayModal.Header>Update a Node {nodeRoot ? "[Root node]" : ''}</ClayModal.Header>
          {advanced && dptUrl != null ?
            <ClayModal.Body url={dptUrl}>              
            </ClayModal.Body>
          :
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
          }          
          <ClayModal.Footer
            last={
              <ClayButton.Group spaced>
                
                <ClayButton
                  displayType="danger"
                  disabled={!nodeRoot}
                  onClick={() => {
                    props.onNodeDeletion();
                    onOpenChange(false);
                  }}
                >
                  Delete Node
                </ClayButton>

                <ClayButton
                  displayType="secondary"
                  onClick={() => setAdvanced(!advanced)}
                >
                  Toggle Advanced
                </ClayButton>                   

                <ClayButton
                  displayType="secondary"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </ClayButton>

                <ClayButton 
                  displayType="secondary"
                  onClick={
                    () => {
                      props.onNodeSetAsStart();
                      setNodeRoot(true);
                      onOpenChange(false);
                    }
                  }
                >
                  Set as start node
                </ClayButton>

                <ClayButton disabled={advanced} onClick={() => {
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
