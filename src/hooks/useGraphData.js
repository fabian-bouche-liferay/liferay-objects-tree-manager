import { useState, useCallback } from 'react';
import {
    useNodesState,
    useEdgesState,
  } from '@xyflow/react';


export const useGraphData = (nodeService, edgeService, fitView) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const loadGraphData = useCallback(() => {
    nodeService.getNodes().then(nodeData => {
      const nodes = nodeData.map(node => ({
        id: '' + node.id,
        type: 'custom',
        position: { x: node.xPosition, y: node.yPosition },
        draggable: true,
        data: { 
          nodeTitle: node.nodeTitle,
          nodeText: node.nodeText,
          id: node.id
        }
      }));

      edgeService.getEdges().then(edgeData => {
        const edges = edgeData.map(edge => ({
          id: '' + edge.id,
          source: '' + edge.sourceNodeId, 
          target: '' + edge.targetNodeId, 
          label: edge.edgeLabel,
          data: { text: edge.edgeLabel }
        }));

        setNodes(nodes);
        setEdges(edges);
        fitView();
      });
    });
  }, [nodeService, edgeService, fitView]);

  return { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, loadGraphData };
};