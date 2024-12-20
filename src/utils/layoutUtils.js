import Dagre from '@dagrejs/dagre';

export const getLayoutedElements = (nodes, edges, options, nodeService) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => {
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 300,
      height: node.measured?.height ?? 80,
    });
  });

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      const x = position.x - (node.measured?.width ?? 300) / 2;
      const y = position.y - (node.measured?.height ?? 80) / 2;

      nodeService.updateNodePosition(node.id, x, y);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};
