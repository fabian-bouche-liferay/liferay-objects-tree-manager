import React, { useCallback, useEffect, useState } from 'react';
import ClayButton from '@clayui/button';

import LoadingModal from './modals/LoadingModal';

import { useBrowseGraphData } from './hooks/useBrowseGraphData';

function GraphNavigator(props) {

  const [ loading, setLoading ] = useState(true);
  const [ currentNodeId, setCurrentNodeId ] = useState(null);

  const { startNodeId, nodes, edges, loadGraphData } = useBrowseGraphData(props.treeService, props.nodeService, props.edgeService);

  useEffect(() => {
    loadGraphData(props.treeERC, setLoading);
  }, [props]);

  useEffect(() => {
    setCurrentNodeId(startNodeId);
  }, [startNodeId]);

  return (
      <div>
        <style>
          {props.parentStyles}
        </style>

        {nodes.filter(node => {return node.id == currentNodeId }).map(node => 
          (
            <>
              <h2>{node.nodeTitle}</h2>
              <p>{node.nodeText}</p>
            </>
          )
        )}

        <ClayButton.Group spaced>

          {edges.filter(edge => {return edge.source == currentNodeId}).map(edge =>
            (
              <ClayButton 
                displayType="secondary"
                onClick={() => {setCurrentNodeId(edge.target)}}
              >
                {edge.label}
              </ClayButton>

            )
          )}

        </ClayButton.Group> 

        <LoadingModal 
              open={loading}
        />

      </div>
  );
}

export default GraphNavigator;