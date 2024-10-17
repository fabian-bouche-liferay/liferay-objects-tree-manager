import React, { useCallback, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    Panel,
    useReactFlow,
  } from '@xyflow/react';

import CustomNode from './flow-customization/CustomNode';
import { useNodeCreation } from './hooks/useNodeCreation';
import { useNodeUpdate } from './hooks/useNodeUpdate';
import { useEdgeCreation } from './hooks/useEdgeCreation';
import { useEdgeUpdate } from './hooks/useEdgeUpdate';
import { useGraphData } from './hooks/useGraphData';
import { getLayoutedElements } from './utils/layoutUtils';
import EdgeCreationModal from './modals/EdgeCreationModal';
import EdgeEditionModal from './modals/EdgeEditionModal';
import NodeCreationModal from './modals/NodeCreationModal';
import NodeUpdateModal from './modals/NodeUpdateModal';

const nodeTypes = { custom: CustomNode };

function GraphEditor(props) {

    const { fitView } = useReactFlow();
    const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, loadGraphData } = useGraphData(props.nodeService, props.edgeService, fitView);
    const { onConnect, handleEdgeCreationModalClose, handleEdgeCreation, edgeCreationModalOpen } = useEdgeCreation(props.edgeService, setEdges);
    const { onConnectEnd, handleNodeCreationModalClose, handleNodeCreation, nodeCreationModalOpen } = useNodeCreation(props.nodeService, props.edgeService, setNodes, setEdges);
    const { onNodeClick, onNodeDragStop, handleNodeUpdateModalClose, handleNodeUpdate, handleNodeDelete, nodeUpdateModalOpen, currentNode } = useNodeUpdate(props.nodeService, nodes, setNodes);
    const { onEdgeClick, handleEdgeEditionModalClose, handleEdgeLabelChange, handleEdgeDelete, edgeEditionModalOpen, currentEdge } = useEdgeUpdate(props.edgeService, edges, setEdges)

    const onLayout = useCallback(
      (direction) => {
        console.log(nodes);
        const layouted = getLayoutedElements(nodes, edges, { direction }, props.nodeService);
  
        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);
  
        window.requestAnimationFrame(() => {
          fitView();
        });
      },
      [nodes, edges],
    );
    
    return (
        <div>
            <style>
                {props.parentStyles}
            </style>
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
                      <button onClick={() => loadGraphData()}>load data</button>
                      <button onClick={() => onLayout('TB')}>vertical layout</button>
                    </Panel>
                  </ReactFlow>
              </div>
            </div>
            <EdgeCreationModal
              open={edgeCreationModalOpen}
              onClose={handleEdgeCreationModalClose}
              onEdgeCreation={handleEdgeCreation} />            
            <EdgeEditionModal
              open={edgeEditionModalOpen}
              label={currentEdge ? currentEdge.label : ''}
              currentEdge={currentEdge}
              onClose={handleEdgeEditionModalClose}
              onEdgeDeletion={handleEdgeDelete}
              onLabelChange={handleEdgeLabelChange} />
            <NodeCreationModal
              open={nodeCreationModalOpen}
              onClose={handleNodeCreationModalClose}
              onNodeCreation={handleNodeCreation} />
            <NodeUpdateModal
              open={nodeUpdateModalOpen}
              nodeTitle={currentNode ? currentNode.data.nodeTitle : ''}
              nodeText={currentNode ? currentNode.data.nodeText : ''}
              onClose={handleNodeUpdateModalClose}
              onNodeDeletion={handleNodeDelete}
              onNodeUpdate={handleNodeUpdate} />              
        </div>
    );
}

export default GraphEditor;