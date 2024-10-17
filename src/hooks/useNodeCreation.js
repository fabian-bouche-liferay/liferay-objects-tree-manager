import { useState, useCallback } from 'react';

export const useNodeCreation = (nodeService, edgeService, setNodes, setEdges) => {

    const [nodeCreationModalOpen, setNodeCreationModalOpen] = useState(false); // For popover position
    const [currentNode, setCurrentNode] = useState(null); // To track clicked edge

    const onConnectEnd = useCallback(
      (event, connectionState) => {
        if (!connectionState.isValid) {
          setCurrentNode(connectionState.fromNode);
          setNodeCreationModalOpen(true);
        }
      },
    );

    const handleNodeCreationModalClose = () => {
      setNodeCreationModalOpen(false);
    }
    
    const handleNodeCreation = (edgeLabel, nodeTitle, nodeText) => {
      nodeService.createNode(nodeTitle, nodeText).then(newNodeData => {
    
        const newNode = {
          id: '' + newNodeData.id,
          type: 'custom',
          position: { x: newNodeData.xPosition, y: newNodeData.yPosition },
          draggable: true,
          data: { 
            nodeTitle: nodeTitle,
            nodeText: nodeText,
            id: newNodeData.id
          }
        }
    
        setNodes((prevNodes) => [...prevNodes, newNode]);
  
        edgeService.createEdge(currentNode.id, newNode.id, edgeLabel).then(newEdgeData => {
  
          const newEdge = {
            id: '' + newEdgeData.id,
            source: '' + newEdgeData.sourceNodeId,
            target: '' + newEdgeData.targetNodeId,
            label: newEdgeData.edgeLabel,
            data: {
              text: newEdgeData.edgeLabel
            }
          }
  
          console.log("New EDGE");
          console.log(newEdge);
  
          setEdges((prevEdges) => [...prevEdges, newEdge]);
  
        });
      });
    }
    
    return {onConnectEnd, handleNodeCreationModalClose, handleNodeCreation, nodeCreationModalOpen};
};

