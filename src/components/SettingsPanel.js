import React from "react";


const SettingsPanel = ({
  selectedNode,
  onNodeUpdate,
  onClose,
  onDeleteNode,
}) => {
  // If no node is selected, dont render anything
  if (!selectedNode) {
    return null;
  }

  // Handle text change for text nodes
  const handleTextChange = (event) => {
    const newText = event.target.value;
    onNodeUpdate(selectedNode.id, { text: newText });
  };

  // Handle going back to nodes panel
  const handleBack = () => {
    onClose();
  };

  // Handleng delete node
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this node?")) {
      onDeleteNode(selectedNode.id);
      onClose(); // Close settings panel after deletion
    }
  };

  return (
    <div className="settings-panel">
      {/* Header with back button, title, and delete button */}
      <div className="settings-panel-header">
        <div className="settings-panel-header-left">
          <button className="back-button" onClick={handleBack}>
            ←
          </button>
          <h3 className="settings-panel-title">Message</h3>
        </div>
        <button
          className="delete-button"
          onClick={handleDelete}
          title="Delete node">
          Delete
        </button>
      </div>

      {/* Settings content based on node type for */}
      <div className="settings-panel-content">
        {selectedNode.type === "textNode" && (
          <div className="text-settings">
            <label className="settings-label">Text</label>
            <textarea
              className="settings-textarea"
              value={selectedNode.data?.text || ""}
              onChange={handleTextChange}
              placeholder="Enter your message..."
              rows={4}
            />
          </div>
        )}

        {}
      </div>
    </div>
  );
};

export default SettingsPanel;
