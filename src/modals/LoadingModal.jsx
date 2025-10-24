import React from 'react';

import ClayLoadingIndicator from '@clayui/loading-indicator';
import ClayModal, {useModal} from '@clayui/modal';

function LoadingModal(props) {

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
          <ClayModal.Header>Loading</ClayModal.Header>
          <ClayModal.Body>
              <ClayLoadingIndicator displayType="primary" shape="squares" size="lg" />
          </ClayModal.Body>
        </ClayModal>
      )}
    </>
  );
}
  
export default LoadingModal;