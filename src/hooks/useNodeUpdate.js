import { useState } from 'react';

export const useNodeUpdate = (nodeService, nodes, setNodes) => {

    const [nodeUpdateModalOpen, setNodeUpdateModalOpen] = useState(false); // For popover position
    const [currentNode, setCurrentNode] = useState(null); // To track clicked edge

    const onNodeClick = (event, node) => {
        setCurrentNode(node);
        setNodeUpdateModalOpen(true);
    }

    const handleNodeDelete = () => {

        const updatedNodes = nodes.filter(node => node.id !== currentNode.id);
        setNodes(updatedNodes);

        nodeService.deleteNode(currentNode.id);
    }

    const handleNodeUpdate = (nodeTitle, nodeText) => {

        if (currentNode) {
            const updatedNodes = nodes.map((node) => {
              if (node.id === currentNode.id) {
                return { 
                    ...node, 
                    data: { 
                        ...node.data,  // Keep other properties in data intact
                        title: nodeTitle, 
                        text: nodeText 
                    }
                };
              }
              return node;
            });
        
            nodeService.updateNode(currentNode.id, nodeTitle, nodeText);
            setNodes(updatedNodes);
          }

    }

    const handleNodeUpdateModalClose = () => {
        setNodeUpdateModalOpen(false);
    }

    
    return {onNodeClick, handleNodeUpdateModalClose, handleNodeUpdate, handleNodeDelete, currentNode, nodeUpdateModalOpen};
};

