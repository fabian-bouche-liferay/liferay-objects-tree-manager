import { useState, useCallback } from 'react';

import {
  useReactFlow,
} from '@xyflow/react';


export const useNodeCreation = (nodeService, edgeService, setNodes, setEdges, treeId) => {

    const [nodeCreationModalOpen, setNodeCreationModalOpen] = useState(false); // For popover position
    const [currentNode, setCurrentNode] = useState(null); // To track clicked edge
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(0);
    const { screenToFlowPosition } = useReactFlow();

    const onConnectEnd = useCallback(
      (event, connectionState) => {
        if (!connectionState.isValid) {
          setCurrentNode(connectionState.fromNode);
          const { clientX, clientY } =
            'changedTouches' in event ? event.changedTouches[0] : event;
          setXPosition(clientX);
          setYPosition(clientY);
          setNodeCreationModalOpen(true);
        }
      },
      [screenToFlowPosition],
    );

    const handleNodeCreationModalClose = () => {
      setNodeCreationModalOpen(false);
    }
    
    const handleNodeCreation = (edgeLabel, nodeTitle, nodeText) => {
      nodeService.createNode(treeId, nodeTitle, nodeText, xPosition, yPosition).then(newNodeData => {
    
        const newNode = {
          id: '' + newNodeData.id,
          type: 'custom',
          position: screenToFlowPosition({
            x: xPosition,
            y: yPosition,
          }),
          draggable: true,
          data: { 
            nodeTitle: nodeTitle,
            nodeText: nodeText,
            id: newNodeData.id
          }
        }
    
        setNodes((prevNodes) => [...prevNodes, newNode]);
  
        edgeService.createEdge(treeId, currentNode.id, newNode.id, edgeLabel).then(newEdgeData => {
  
          const newEdge = {
            id: '' + newEdgeData.id,
            source: '' + newEdgeData.sourceNodeId,
            target: '' + newEdgeData.targetNodeId,
            label: newEdgeData.edgeLabel,
            data: {
              text: newEdgeData.edgeLabel
            }
          }
  
          setEdges((prevEdges) => [...prevEdges, newEdge]);
  
        });
      });
    }
    
    return {onConnectEnd, handleNodeCreationModalClose, handleNodeCreation, nodeCreationModalOpen};
};

