import React, { useCallback, useEffect, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    Panel,
    useReactFlow,
  } from '@xyflow/react';

import ClayButton from '@clayui/button';
import CustomNode from './flow-customization/CustomNode';
import { useTreeCreation } from './hooks/useTreeCreation';
import { useTreeDeletion } from './hooks/useTreeDeletion';
import { useTreeSelection } from './hooks/useTreeSelection';
import { useNodeCreation } from './hooks/useNodeCreation';
import { useNodeUpdate } from './hooks/useNodeUpdate';
import { useEdgeCreation } from './hooks/useEdgeCreation';
import { useEdgeUpdate } from './hooks/useEdgeUpdate';
import { useTreeData } from './hooks/useTreeData';
import { useGraphData } from './hooks/useGraphData';
import { getLayoutedElements } from './utils/layoutUtils';
import LoadingModal from './modals/LoadingModal';
import EdgeCreationModal from './modals/EdgeCreationModal';
import EdgeEditionModal from './modals/EdgeEditionModal';
import NodeCreationModal from './modals/NodeCreationModal';
import NodeUpdateModal from './modals/NodeUpdateModal';
import TreeSelectionModal from './modals/TreeSelectionModal';
import TreeDeletionModal from './modals/TreeDeletionModal';
import TreeCreationModal from './modals/TreeCreationModal';

const nodeTypes = { custom: CustomNode };

function GraphEditor(props) {

    const { fitView } = useReactFlow();
    const [ loading, setLoading ] = useState(false);
    const [ treeId, setTreeId ] = useState();
    const { trees, loadTreeData } = useTreeData(props.treeService, setTreeId);
    const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, loadGraphData, wipeGraphData } = useGraphData(props.nodeService, props.edgeService, fitView);
    const { onConnect, handleEdgeCreationModalClose, handleEdgeCreation, edgeCreationModalOpen } = useEdgeCreation(props.edgeService, setEdges, treeId);
    const { onConnectEnd, handleNodeCreationModalClose, handleNodeCreation, nodeCreationModalOpen } = useNodeCreation(props.nodeService, props.edgeService, setNodes, setEdges, treeId);
    const { onNodeClick, onNodeDragStop, handleNodeUpdateModalClose, handleNodeUpdate, handleNodeDelete, handleNodeSetAsStart, nodeUpdateModalOpen, currentNode } = useNodeUpdate(props.nodeService, nodes, setNodes);
    const { onEdgeClick, handleEdgeEditionModalClose, handleEdgeLabelChange, handleEdgeDelete, edgeEditionModalOpen, currentEdge } = useEdgeUpdate(props.edgeService, edges, setEdges);
    const { onSelectTree, handleTreeSelectionModalClose, handleTreeSelection, treeSelectionModalOpen } = useTreeSelection(setTreeId);
    const { onCreateTree, handleTreeCreationModalClose, handleTreeCreation, treeCreationModalOpen } = useTreeCreation(props.treeService, props.nodeService, loadTreeData, loadGraphData, setLoading);
    const { onDeleteTree, handleTreeDeletionModalClose, handleTreeDeletion, treeDeletionModalOpen } = useTreeDeletion(props.treeService, loadTreeData);

    const onLayout = useCallback(
      (direction) => {
        const layouted = getLayoutedElements(nodes, edges, { direction }, props.nodeService);
  
        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);
  
        window.requestAnimationFrame(() => {
          fitView();
        });
      },
      [nodes, edges],
    );

    useEffect(() => {
      loadTreeData();
      if(props.treeId != null) {
        setTreeId(props.treeId);
      }
    }, [props]);

    useEffect(() => {
      if(treeId != null) {
        loadGraphData(treeId, setLoading);
      } else {
        wipeGraphData();
      }
    }, [treeId]);
    
    return (
        <div>
            <div className="container">
              <div style={{ width: '100%', height: '800px' }}>

                <ReactFlow 
                    nodes={nodes}
                    edges={edges}
                    onNodeClick={onNodeClick}
                    onConnect={onConnect}
                    onConnectEnd={onConnectEnd}
                    onNodeDragStop={onNodeDragStop}
                    onEdgeClick={onEdgeClick}
                    nodesDraggable={true}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}                     
                    nodeTypes={nodeTypes}>
                  <Controls />
                  <MiniMap />
                  <Background variant="dots" gap={12} size={1} />
                  <Panel position="top-right">
                    <h1>{(trees != null && treeId != null) ? trees.find(tree => tree.id == treeId).treeLabel : 'No tree selected'}</h1>
                    <ClayButton.Group spaced>
                      { treeId != null ?
                        <>
                          <ClayButton
                            displayType="secondary"
                            onClick={() => {if(treeId != null) { 
                              loadGraphData(treeId, setLoading) }}}
                          >
                            Refresh Data
                          </ClayButton>

                          <ClayButton 
                            displayType="secondary"
                            onClick={() => onLayout('TB')}
                          >
                            Auto Layout
                          </ClayButton>

                          <ClayButton 
                            displayType="danger"
                            onClick={onDeleteTree}
                          >
                            Delete Tree
                          </ClayButton>

                        </> 
                      :
                        <></>
                      }
                      <ClayButton 
                        displayType="secondary"
                        onClick={onSelectTree}
                      >
                        Select Tree
                      </ClayButton>
                      <ClayButton 
                        displayType="primary"
                        onClick={onCreateTree}
                      >
                        Create Tree
                      </ClayButton>                      
                    </ClayButton.Group>                      
                  </Panel>
                </ReactFlow>
              </div>
            </div>

            <LoadingModal 
              open={loading}
            />
            <TreeSelectionModal
              open={treeSelectionModalOpen && !loading}
              trees={trees}
              treeId={treeId}
              onClose={handleTreeSelectionModalClose}
              onTreeSelection={handleTreeSelection} />                
            <TreeCreationModal
              open={treeCreationModalOpen && !loading}
              onClose={handleTreeCreationModalClose}
              onTreeCreation={handleTreeCreation} />                 
            <TreeDeletionModal
              open={treeDeletionModalOpen && !loading}
              onClose={handleTreeDeletionModalClose}
              treeId={treeId}
              treeLabel={(trees != null && treeId != null) ? trees.find(tree => tree.id == treeId).treeLabel : ''}
              onTreeDeletion={handleTreeDeletion} />                 
            <EdgeCreationModal
              open={edgeCreationModalOpen && !loading}
              onClose={handleEdgeCreationModalClose}
              onEdgeCreation={handleEdgeCreation} />            
            <EdgeEditionModal
              edgeDptBaseUrl={props.edgeDptBaseUrl}
              open={edgeEditionModalOpen && !loading}
              label={currentEdge ? currentEdge.label : ''}
              currentEdge={currentEdge}
              loadGraphData={loadGraphData}
              onClose={handleEdgeEditionModalClose}
              onEdgeDeletion={handleEdgeDelete}
              onLabelChange={handleEdgeLabelChange} />
            <NodeCreationModal
              open={nodeCreationModalOpen && !loading}
              onClose={handleNodeCreationModalClose}
              onNodeCreation={handleNodeCreation} />
            <NodeUpdateModal
              nodeDptBaseUrl={props.nodeDptBaseUrl}
              open={nodeUpdateModalOpen && !loading}
              currentNode={currentNode}
              loadGraphData={loadGraphData}
              nodeRoot={currentNode ? currentNode.data.nodeRoot : false}
              nodeTitle={currentNode ? currentNode.data.nodeTitle : ''}
              nodeText={currentNode ? currentNode.data.nodeText : ''}
              onClose={handleNodeUpdateModalClose}
              onNodeSetAsStart={handleNodeSetAsStart}
              onNodeDeletion={handleNodeDelete}
              onNodeUpdate={handleNodeUpdate} />              
        </div>
    );
}

export default GraphEditor;