import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { Handle, Position } from "reactflow";

const ProjectManagerNode = ({ id, data }) => {
  const { name, deleteNode } = data;
  return (
    <div className="bg-white shadow-md   min-w-[230px] max-w-md rounded-md p-4 relative border border-gray-300">
      <button
        className="absolute top-1  right-1 text-2xl text-red-500 hover:ring-1 ring-red-600 ring-offset-1 duration-300 cursor-pointer rounded-full"
        onClick={() => deleteNode(id)}
      >
        <IoIosCloseCircle />
      </button>
      <strong className="block mb-3 text-lg font-semibold">
        Project Manager
      </strong>
      <p className="text-gray-600 ">{name}</p>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.top} />
    </div>
  );
};

export default ProjectManagerNode;
