import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import TextNode from "./TextNode";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";

// custom node types
const nodeTypes = {
  textNode: TextNode,
};


const FlowContent = () => {
  // State management
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nodeIdCounter, setNodeIdCounter] = useState(0);

  const reactFlowWrapper = useRef(null);

  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setShowSettings(true);
    setErrorMessage(""); // Clear any previous errors messagaes
  }, []);

  // edge connections
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  //  drag start from nodes panel
  const onDragStart = useCallback((event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }, []);

  // Handle drag over on flow area
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle drop of new nodes
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // Calculate position of  relative to the flow area
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      // Create new node based on type
      const newNode = {
        id: `node-${nodeIdCounter}`,
        type: type,
        position,
        data: { text: `New ${type === "textNode" ? "message" : "node"}` },
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeIdCounter((counter) => counter + 1);
    },
    [nodeIdCounter, setNodes]
  );

  // Update node data
  const onNodeUpdate = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      );

      // Update selected node if this is the  one being edited
      if (selectedNode && selectedNode.id === nodeId) {
        setSelectedNode((prev) => ({
          ...prev,
          data: { ...prev.data, ...newData },
        }));
      }
    },
    [setNodes, selectedNode]
  );

  // Close settings panel
  const onCloseSettings = useCallback(() => {
    setShowSettings(false);
    setSelectedNode(null);
  }, []);

  // Delete node buton
  const onDeleteNode = useCallback(
    (nodeId) => {
      // Remove the node
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));

      // Remove edges connected to this node
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  // Validate flow before saving
  const validateFlow = useCallback(() => {
    if (nodes.length <= 1) {
      return true; // Single node or no nodes is valid
    }

    // Check if more than one node has empty target handles
    const nodesWithEmptyTargets = nodes.filter((node) => {
      const hasIncomingEdges = edges.some((edge) => edge.target === node.id);
      return !hasIncomingEdges;
    });

    return nodesWithEmptyTargets.length <= 1; // Only one node can have empty target (the start node)
  }, [nodes, edges]);

  // Save flow
  const onSave = useCallback(() => {
    if (!validateFlow()) {
      setErrorMessage("Cannot save Flow");
      return;
    }

    setErrorMessage("");
    // Here you would typically save to a backend or local storage
    console.log("Flow saved successfully!", { nodes, edges });
    alert("Flow saved successfully!");
  }, [validateFlow, nodes, edges]);

  return (
    <div className="flow-builder">
      {/* Error message banner */}
      {errorMessage && <div className="error-banner">{errorMessage}</div>}

      {/* Header with save button */}
      <div className="flow-header">
        <button className="save-button" onClick={onSave}>
          Save Changes
        </button>
      </div>

      {/* Main flow area */}
      <div className="flow-content">
        <div className="flow-canvas" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView>
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>

        {/* Right panel - either nodes panel or settings panel */}
        <div className="right-panel">
          {showSettings ? (
            <SettingsPanel
              selectedNode={selectedNode}
              onNodeUpdate={onNodeUpdate}
              onClose={onCloseSettings}
              onDeleteNode={onDeleteNode}
            />
          ) : (
            <NodesPanel onDragStart={onDragStart} />
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * FlowBuilder component
 * required for React Flow to work properly
 */
const FlowBuilder = () => {
  return (
    <ReactFlowProvider>
      <FlowContent />
    </ReactFlowProvider>
  );
};

export default FlowBuilder;
