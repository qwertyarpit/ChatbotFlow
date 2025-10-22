import React from "react";

const NodeType = ({ type, label, icon, onDragStart }) => {
  return (
    <div
      className="node-type"
      draggable
      onDragStart={(e) => onDragStart(e, type)}>
      <div className="node-type-icon">{icon}</div>
      <div className="node-type-label">{label}</div>
    </div>
  );
};


const NodesPanel = ({ onDragStart }) => {
  // Define all available node types currenatly only text message
  const nodeTypes = [
    {
      type: "textNode",
      label: "Text Message",
      icon: "💬",
    },

    
  ];

  return (
    <div className="nodes-panel">
      <h3 className="nodes-panel-title">Nodes Panel</h3>
      <div className="nodes-panel-content">
        {nodeTypes.map((nodeType) => (
          <NodeType
            key={nodeType.type}
            type={nodeType.type}
            label={nodeType.label}
            icon={nodeType.icon}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default NodesPanel;
