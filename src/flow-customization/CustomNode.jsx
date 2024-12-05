import { useCallback } from 'react';

import { Handle, Position } from '@xyflow/react';
import ClayPanel from '@clayui/panel';

function CustomNode({ data, isConnectable }) {

  return (
    <div className="custom-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <ClayPanel
        displayTitle={data.nodeTitle + (data.nodeRoot ? ' [ROOT]' : '')}
        displayType="secondary"
        style={{
          marginBottom: 0,
          width: '240px',
          height: '180px',
          overflow: 'hidden'
        }}
      >
        <ClayPanel.Body>
          {data.nodeText}
        </ClayPanel.Body>
      </ClayPanel>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomNode;