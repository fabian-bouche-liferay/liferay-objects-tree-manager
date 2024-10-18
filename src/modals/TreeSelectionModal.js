import React, { useState, useEffect } from 'react';

import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';
import ClayForm, {ClaySelect} from '@clayui/form';

function TreeSelectionModal(props) {

  const { observer, onOpenChange, open, onClose } = useModal({
    onClose: props.onClose
  });

  const [treeId, setTreeId] = useState(null);
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    setTrees(props.trees)
  }, [props]);

  useEffect(() => {
    if((props.treeId == null || props.treeId == undefined) && trees != null && trees.length > 0) {
      setTreeId(trees[0].id);
    } else {
      setTreeId(props.treeId);
    }
  }, [trees])

  const handleTreeChange = function(event) {
    setTreeId(event.target.value);
  }

  return (
    <>
      {props.open && (
        <ClayModal
          observer={observer}
          size="lg"
          status="info"
        >
          <ClayModal.Header>Select tree</ClayModal.Header>
          <ClayModal.Body>
            <ClayForm.Group>
              <label htmlFor="nodeTitle">Node Title</label>
              <ClaySelect aria-label="Select Tree" id="treeSelect" value={treeId} onChange={handleTreeChange}>
                {trees.map(item => (
                  <ClaySelect.Option
                    key={item.id}
                    label={item.treeLabel}
                    value={item.id}
                  />
                ))}
              </ClaySelect>
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
                  props.onTreeSelection(treeId);
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
  
export default TreeSelectionModal;