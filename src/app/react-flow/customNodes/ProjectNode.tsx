import React from "react";
import { Handle, Position } from "reactflow";
import { IoIosCloseCircle } from "react-icons/io";

const ProjectNode = ({ id, data }: any) => {
  const { name, deleteNode } = data;
  return (
    <div className="bg-white shadow-md min-w-[230px] max-w-md rounded-md p-4 relative border border-gray-300">
      <button
        className="absolute top-1  right-1 text-2xl text-red-500 hover:ring-1 ring-red-600 ring-offset-1 duration-300 cursor-pointer rounded-full"
        onClick={() => deleteNode(id)}
      >
        <IoIosCloseCircle />
      </button>
      <strong className="block mb-3 text-lg font-semibold">Project</strong>
      <p className="text-gray-600">{name}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ProjectNode;
