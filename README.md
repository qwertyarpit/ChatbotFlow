# Chatbot Flow Builder

A simple and extensible chatbot flow builder built with React and React Flow. This application allows you to create conversational flows by connecting message nodes together.

## Features

### 1. Text Node
- Create multiple text message nodes in your flow
- Each node has a source handle (right side) and target handle (left side)
- Source handles can only have one outgoing connection
- Target handles can accept multiple incoming connections

### 2. Nodes Panel
- Drag and drop nodes from the panel to the canvas
- Currently supports Message nodes
- Designed to be easily extensible for future node types

### 3. Edge Connections
- Connect nodes by dragging from source handle to target handle
- Visual feedback for valid connections
- Curved gray lines represent the flow direction

### 4. Settings Panel
- Appears when you click on a node
- Edit the text content of selected nodes
- Back button to return to nodes panel

### 5. Save Validation
- Save button validates the flow before saving
- Shows error if more than one node has empty target handles
- Only one node (the start node) can have no incoming connections

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Adding Nodes**: Drag a "Message" node from the right panel onto the canvas
2. **Connecting Nodes**: Click and drag from the green source handle (right side) of one node to the red target handle (left side) of another node
3. **Editing Nodes**: Click on any node to open the settings panel and edit its text
4. **Saving**: Click "Save Changes" to save your flow (validation will check for proper connections)

## Architecture

The application is built with extensibility in mind:

- **TextNode.js**: Reusable text node component
- **NodesPanel.js**: Extensible panel for different node types
- **SettingsPanel.js**: Dynamic settings based on selected node type
- **FlowBuilder.js**: Main orchestrator component with React Flow integration

## Future Extensibility

To add new node types:

1. Create a new node component (e.g., `ConditionNode.js`)
2. Add the node type to the `nodeTypes` object in `FlowBuilder.js`
3. Add the node type definition to the `nodeTypes` array in `NodesPanel.js`
4. Add corresponding settings in `SettingsPanel.js`

## Technologies Used

- React 18
- React Flow 11
- CSS3 for styling
- HTML5 drag and drop API

