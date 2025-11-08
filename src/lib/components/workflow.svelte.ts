import { MarkerType, useSvelteFlow, type Edge, type Node } from "@xyflow/svelte";
import StartNode from "./StartNode.svelte";
import TaskNode from "./TaskNode.svelte";
import FinishNode from "./FinishNode.svelte";
import Dagre from '@dagrejs/dagre';
import { tick, type Component, type Snippet } from 'svelte';


export type LayoutOptions = {
  direction: 'TD' | 'LR';
};

export const nodeTypes = {
  startNode: StartNode,
  taskNode: TaskNode,
  finishNode: FinishNode
};

type NodeType = keyof typeof nodeTypes
type NewNode = { id: string, description: string, type: NodeType }

const getLayoutedElements = (nodes: Node[], edges: Edge[], options: LayoutOptions) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: options.direction,
    nodesep: 50,
    ranksep: 100
  });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));

  nodes.forEach((node) => {
    const width = node.measured?.width || node.width || 300;
    const height = node.measured?.height || node.height || 100;

    g.setNode(node.id, {
      ...node,
      width,
      height
    });
  });

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the Svelte Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 150) / 2;
      const y = position.y - (node.measured?.height ?? 50) / 2;

      console.log({ id: node.id, x, y, w: node.measured?.width, h: node.measured?.width });

      return {
        ...node,
        position: { x, y },
        sourcePosition: options.direction === 'LR' ? 'right' : 'bottom',
        targetPosition: options.direction === 'LR' ? 'left' : 'top'
      };
    }),
    edges
  };
};

export class WorkflowState {
  nodes: Node[]
  edges: Edge[]
  options: { layout: LayoutOptions }
  nodeTypes: Record<string, any>
  fitViewFunc?: (options: any) => void

  constructor(nodes: Node[], edges: Edge[], fitViewFunc?: ((options: any) => void), options: { layout: LayoutOptions } = { layout: { direction: 'TD' } }) {
    this.nodes = $state.raw(nodes)
    this.edges = $state.raw(edges)
    this.options = options
    this.fitViewFunc = fitViewFunc

    this.nodeTypes = nodeTypes
  }

  findNode(id: string | undefined) {
    if (!id) return undefined
    return this.nodes.find((n) => n.id === id)
  }


  // Add a node with no edges
  async addNode(data: NewNode, parentId: string | undefined) {
    this.nodes = [...this.nodes, { id: data.id, position: { x: 0, y: 0 }, data: { description: data.description }, type: data.type }]

    if (!parentId) {
      return
    }

    let newEdge = {
      id: `e-${parentId}-${data.id}`,
      source: parentId,
      target: data.id,
      type: 'bezier',
      style: 'stroke: #000000;',
      markerEnd: { type: MarkerType.ArrowClosed, color: '#000000' }
    } as Edge;

    this.edges = [...this.edges, newEdge]

    await this.applyLayout()
  }

  async addDependentNode(parentId: string, data: NewNode) {
    const matchingId = this.nodes.find((n) => n.id === data.id);
    if (matchingId) {
      throw new Error('Matching ID already exists!');
    }

    let newNode = {
      id: data.id,
      position: { x: 0, y: 0 },
      data: { id: data.id, description: data.description, type: 'document' },
      type: 'taskNode'
    };

    let newEdge = {
      id: `e-${parentId}-${data.id}`,
      source: parentId,
      target: data.id,
      type: 'bezier',
      style: 'stroke: #000000;',
      markerEnd: { type: MarkerType.ArrowClosed, color: '#000000' }
    } as Edge;

    this.nodes = [...this.nodes, newNode];
    this.edges = [...this.edges, newEdge];
    await this.applyLayout()
  }

  linkToParent(parentId: string, childId: string) {
    throw new Error("todo")
  }

  addFinishNode(parentId: string) {
    let node: NewNode = {
      id: '__finish',
      description: "The end of the process",
      type: "finishNode"
    }
    return this.addDependentNode(parentId, node)

  }

  removeNode(id: string) {
    this.nodes = [...this.nodes.filter((n) => n.id !== id)];
    this.edges = [
      ...this.edges.filter((e) => e.source !== id && e.target !== id)
    ];
  }

  // A workflow has to have a start and a finish
  check() {
    throw new Error("todo")
  }


  applyLayout = async () => {

    const layouted = getLayoutedElements(this.nodes, this.edges, this.options.layout);

    this.nodes = [...layouted.nodes] as Node[];
    this.edges = [...layouted.edges];

    await tick();

    if (this.fitViewFunc) {
      requestAnimationFrame(() => {
        this.fitViewFunc!({ nodes: this.nodes });
      });
    }
  };

}



function emptyWorkflow() {
  return new WorkflowState([], [])
}
