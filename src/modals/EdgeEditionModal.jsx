import React, { useCallback, useState, useEffect } from 'react';

import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';
import ClayForm, {ClayInput} from '@clayui/form';

function EdgeEditionModal(props) {

  const [advanced, setAdvanced] = useState(false);
  const [dptUrl, setDptUrl] = useState(null);
  const [modalSize, setModalSize] = useState('lg');

  const { observer, onOpenChange, open, onClose } = useModal({
    onClose: props.onClose
  });

  const [edgeLabel, setEdgeLabel] = useState('');

  useEffect(() => {
    setEdgeLabel(props.label);
    if(props.currentEdge != null) {
      setDptUrl(props.edgeDptBaseUrl + props.currentEdge.id + "?p_p_state=pop_up");
    }
  }, [props]);

  useEffect(() => {
      if(advanced) {
        setModalSize("full-screen");
      } else {
        setModalSize("lg");
      }
    }, [advanced]);
  const handleEdgeLabelChange = function(event) {
    setEdgeLabel(event.target.value);
  }
  
  return (
    <>
      {props.open && (
        <ClayModal
          observer={observer}
          size={modalSize}
          status="info"
        >
          <ClayModal.Header>Update Edge Label</ClayModal.Header>
          {advanced && dptUrl != null ?
            <ClayModal.Body url={dptUrl}>              
            </ClayModal.Body>
          :
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
          }
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
                <ClayButton disabled={advanced} onClick={() => {
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