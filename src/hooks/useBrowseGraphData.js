import { useCallback, useState } from 'react';

export const useBrowseGraphData = (treeService, nodeService, edgeService) => {
  const [startNodeId, setStartNodeId] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const loadGraphData = useCallback((treeERC, setLoading) => {
    setLoading(true);
    treeService.getTree(treeERC).then(tree => {
      nodeService.getNodes(tree.id).then(nodeData => {
        const nodes = nodeData.map(node => ({
          id: '' + node.id,
          nodeTitle: node.nodeTitle,
          nodeText: node.nodeText,
          nodeRoot: node.nodeRoot
        }));

        nodeData.filter(node => {return node.nodeRoot}).forEach(node => {
          setStartNodeId(node.id);
        });
  
        edgeService.getEdges(tree.id).then(edgeData => {
          const edges = edgeData.map(edge => ({
            id: '' + edge.id,
            source: '' + edge.sourceNodeId, 
            target: '' + edge.targetNodeId, 
            label: edge.edgeLabel
          }));
  
          setLoading(false);
          setNodes(nodes);
          setEdges(edges);
        });
      });
    });
  }, [treeService, nodeService, edgeService]);

  return { startNodeId, nodes, edges, loadGraphData };
};