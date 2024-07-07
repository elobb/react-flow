"use client";
import React, { useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  MarkerType,
  Connection,
  Edge,
  Node,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import ProjectNode from "./customNodes/ProjectNode";
import ProjectManagerNode from "./customNodes/ProjectManagerNode";
import DeveloperNode from "./customNodes/DeveloperNode";
import { GoProjectRoadmap } from "react-icons/go";
import { FaUserTie } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";

const nodeTypes: NodeTypes = {
  project: ProjectNode,
  projectManager: ProjectManagerNode,
  developer: DeveloperNode,
};

const ReactFlowComponent: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [text, setText] = useState<string>("");

  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  const initialNodes: Node[] = [
    {
      id: "1",
      data: { name: "Atropin", deleteNode: deleteNode },
      position: { x: 500, y: 50 },
      type: "project",
    },
    {
      id: "2",
      data: { name: "Ri Rajin", deleteNode: deleteNode },
      position: { x: 500, y: 200 },
      type: "projectManager",
    },
    {
      id: "3",
      data: { name: "Anis", deleteNode: deleteNode },
      position: { x: 200, y: 400 },
      type: "developer",
    },
    {
      id: "4",
      data: { name: "Emon", deleteNode: deleteNode },
      position: { x: 800, y: 400 },
      type: "developer",
    },
  ];

  const initialEdges: Edge[] = [
    { id: "1-2", source: "1", target: "2", animated: true },
    { id: "1-3", source: "2", target: "3", animated: true },
    { id: "1-4", source: "2", target: "4", animated: true },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (connection: Connection) => {
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          type: "custom",
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
        },
        eds
      )
    );
  };

  const addNode = () => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      data: { name: text, deleteNode: deleteNode },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      type,
    };
    setNodes((nds) => [...nds, newNode]);
    setText("");
    setIsModal(false);
    setType("");
  };

  const deleteEdge = (edgeId: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
  };

  const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();
    deleteEdge(edge.id);
  };

  useEffect(() => {
    if (isModal) {
      document.body.style.overflowY = "hidden";
      document.body.style.paddingRight = "10px";
    } else {
      document.body.style.overflowY = "scroll";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflowY = "scroll";
      document.body.style.paddingRight = "0px";
    };
  }, [isModal]);

  const handleOpenModal = (type: string) => {
    setIsModal(true);
    setType(type);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap gap-4">
        <button
          onClick={() => handleOpenModal("project")}
          className="px-4 py-2 flex gap-2 items-center justify-center bg-blue-500 text-white rounded-md shadow-md"
        >
          <GoProjectRoadmap size={20} />
          Add Project
        </button>
        <button
          onClick={() => handleOpenModal("projectManager")}
          className="px-4 py-2 flex gap-2 items-center justify-center bg-indigo-500 text-white rounded-md shadow-md"
        >
          <FaUserTie size={20} />
          Add Manager
        </button>
        <button
          onClick={() => handleOpenModal("developer")}
          className="px-4 py-2 flex gap-2 items-center justify-center bg-teal-500 text-white rounded-md shadow-md"
        >
          <FaUserLarge size={20} />
          Add Developer
        </button>
      </div>
      <div className="w-full h-[600px] border bg-gray-100 rounded-md shadow-md">
        <ReactFlow
          edges={edges.map((edge) => ({ ...edge, deleteEdge }))}
          nodes={nodes.map((node) => ({
            ...node,
            data: { ...node.data, deleteNode: deleteNode },
          }))}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onEdgeClick={onEdgeClick}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      {/* <===================| Add Node Modal |====================> */}
      {isModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-zinc-950 bg-opacity-40 flex items-center justify-center">
          <div
            onClick={() => setIsModal(false)}
            className="absolute z-0 w-full h-full left-0 top-0"
          />
          <div className="relative animated_modal z-10 w-4/12 bg-white p-5 rounded-md flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-zinc-700">
              Add new {type}
            </h1>
            <input
              value={text}
              type="text"
              className="border outline-none px-2 py-3 rounded-md"
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={addNode}
              className="text-white bg-blue-500 w-fit px-6 text-lg font-semibold py-1 rounded-md mt-auto"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactFlowComponent;
