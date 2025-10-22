import React from 'react';
import { Handle, Position } from 'reactflow';


const TextNode = ({ data, isConnectable }) => {
  return (
    <div className="text-node">
      {/* Node header */}
      <div className="text-node-header">
        <div className="text-node-title">
          <span className="text-node-icon"></span>
          <span>Text Message</span>
        </div>
        <div className="whatsapp-icon"></div>
      </div>
      
      {/* Node body  */}
      <div className="text-node-body">
        {data.text || 'Enter message...'}
      </div>
      
      {/* Target handle - can have multiple incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        isConnectable={isConnectable}
        className="handle target-handle"
      />
      
      {/* Source handle - can only have one outgoing connection */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        isConnectable={isConnectable}
        className="handle source-handle"
      />
    </div>
  );
};

export default TextNode;
