import { useEditor } from "@craftjs/core";

export const useNodeInfo = (nodeId) => {
  const { query } = useEditor();
  const data = JSON.parse(query.serialize());

  const getNodes = (nodeId) => {
    if (!nodeId || !data[nodeId]) return [];
    if (nodeId === 'ROOT' && !data['ROOT'].isCanvas) {
      // Special canvas structure for ROOT node
      return getNodes(data[nodeId].nodes.map(id => ({...data[id], id})).find(node => node.isCanvas).id);
    }
    const nodes = data[nodeId].nodes;
    const linkedNodes = Object.values(data[nodeId].linkedNodes);
    return nodes.length > 0 ? nodes : getNodes(linkedNodes[0]);
  };
  const getCanvas = (nodeId) => {
    if (nodeId === 'ROOT' && !data['ROOT'].isCanvas) {
      // Special canvas structure for ROOT node
      return getCanvas(data[nodeId].nodes.map(id => ({...data[id], id})).find(node => node.isCanvas).id);
    }
    if(data[nodeId].isCanvas) return nodeId;
    const linkedNodes = Object.values(data[nodeId].linkedNodes);
    return getCanvas(linkedNodes[0]);
  }
  const getParent = (nodeId) => {
    if(!data[nodeId]) return null;
    const parentId = data[nodeId].parent;
    if(!parentId || !data[parentId]) return null;
    if (parentId !== 'ROOT' && data[parentId].isCanvas) {
      return getParent(parentId);
    }
    return parentId;
  }

  const getGraph = (node) => {
    if(node.nodes instanceof Array) node.nodes = node.nodes.map(id => ({...data[id], id}));
    if(node.linkedNodes) node.linkedNodes = Object.entries(node.linkedNodes).reduce((r, [k, id]) => ({...r, [k]: {...data[id], id}}), {});
    [...(node.nodes || []), ...Object.values(node.linkedNodes)].forEach(node => getGraph(node));
    return node;
  }

  if(!query.node(nodeId).get()) {
    return { nodes: data, getGraph, getNodes, getCanvas, getParent };
  }

  const node = query.node(nodeId).get().data;
  const parentId = getParent(nodeId);
  const siblings = getNodes(parentId);
  const grandParentId = getParent(parentId);
  const parentSiblings = grandParentId ? getNodes(grandParentId) : [];
  const parentPrev = grandParentId ? parentSiblings[parentSiblings.findIndex(id => id === parentId) - 1] : null;
  const parentNext = grandParentId ? parentSiblings[parentSiblings.findIndex(id => id === parentId) + 1] : null;
  const nodeEle = query.node(nodeId).get().dom;
  const currentIndex = siblings.findIndex(id => id === nodeId);
  const title = node.props.heading || node.props.title || node.props.sectionType || node.props.alt || `at position ${currentIndex + 1}`;

  return { nodeId, nodeEle, node, title, nodes: data, getGraph, getNodes, getCanvas, getParent, currentIndex, parentId, siblings, grandParentId, parentSiblings, parentPrev, parentNext };
}